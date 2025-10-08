import ApplicationLogger from '../../application/ApplicationLogger.ts';

import DataController from '../../data/DataController.ts';

import DotManager from './dot/DotManager.ts';
import ShapeManager from './shape/ShapeManager.ts';
import ComponentManager from './component/ComponentManager.ts';

import ViewHeader from './view/header/ViewHeader.ts';
import ViewIntro from './view/intro/ViewIntro.ts';
import ViewProjectMenu from './view/menu/ViewProjectMenu.ts';
import ViewProject from './view/project/ViewProject.ts';

import DirectableDotMatrixConstants from './DirectableDotMatrixConstants.ts';

import type DotMatrixView from './view/DotMatrixView.ts';

export default class DirectableDotMatrix {
  #DOT_MANAGER: DotManager;
  #SHAPE_MANAGER: ShapeManager;
  #COMPONENT_MANAGER: ComponentManager;

  #VIEW_HEADER: ViewHeader;
  #VIEWS: DotMatrixView[] = [];

  #viewIdCurrent: string = 'intro';
  #hasDrawCompleted: boolean = false;

  #LOG_LEVEL: number = 3;

  // Views create Components, which create Shapes, which create Dots

  // _________________________________________________________________________

  constructor(displayWidthPx: number, displayHeightPx: number) {
    ApplicationLogger.log(
      'DirectableDotMatrix ' + displayHeightPx + ' ' + displayHeightPx,
      this.#LOG_LEVEL,
    );

    // Get Project Data
    const PROJECT_DATA = DataController.getProjects();

    // Create Dot Manager
    this.#DOT_MANAGER = new DotManager(displayWidthPx, displayHeightPx);

    // Create Shape Manager
    this.#SHAPE_MANAGER = new ShapeManager(this.#DOT_MANAGER);

    // Create Component Manager
    this.#COMPONENT_MANAGER = new ComponentManager();

    // Create View Header
    this.#VIEW_HEADER = new ViewHeader(
      this.#SHAPE_MANAGER,
      this.#COMPONENT_MANAGER,
      'header',
    );

    // Create View Intro
    this.#VIEWS.push(
      new ViewIntro(this.#SHAPE_MANAGER, this.#COMPONENT_MANAGER, 'intro'),
    );

    // Create View Project Menu
    this.#VIEWS.push(
      new ViewProjectMenu(
        this.#SHAPE_MANAGER,
        this.#COMPONENT_MANAGER,
        'project-menu',
      ),
    );

    // Create Project Views
    PROJECT_DATA.forEach((project) => {
      this.#VIEWS.push(
        new ViewProject(
          this.#SHAPE_MANAGER,
          this.#COMPONENT_MANAGER,
          project.id,
        ),
      );
    });

    // Start Header
    this.#VIEW_HEADER.start(0);

    // Start Current View
    const VIEW_CURRENT = this.#getViewById(this.#viewIdCurrent);

    if (VIEW_CURRENT) {
      VIEW_CURRENT.start(0);
    }
  }

  // ____________________________________________________________________ Tick

  tick(frameDeltaMS: number) {
    // Tick Views
    for (let i = 0; i < this.#VIEWS.length; i += 1) {
      this.#VIEWS[i].tick(frameDeltaMS);
    }

    // Tick Component Manager
    this.#COMPONENT_MANAGER.tick();

    // Get Active Component Total
    const ACTIVE_COMPONENT_TOTAL =
      this.#COMPONENT_MANAGER.getActiveComponentTotal();

    // Components Complete ?
    if (ACTIVE_COMPONENT_TOTAL === 0 && this.#hasDrawCompleted === false) {
      // View Draw Complete
      const VIEW_CURRENT = this.#getViewById(this.#viewIdCurrent);

      if (VIEW_CURRENT) {
        VIEW_CURRENT.onDrawComplete();
      }

      // Set Dot Manager Draw Complete
      this.#hasDrawCompleted = true;
    }

    if (ACTIVE_COMPONENT_TOTAL > 0 && this.#hasDrawCompleted === true) {
      // Draw Not Complete
      this.#hasDrawCompleted = false;
    }
  }

  // ____________________________________________________________________ View

  #stopCurrentView() {
    ApplicationLogger.log(
      `DirectableDotMatrix stopCurrentView '${this.#viewIdCurrent}'`,
      this.#LOG_LEVEL,
    );

    // Order Important

    // Stop Any Active Components
    this.#COMPONENT_MANAGER.reset();

    // Stop any Active Shapes
    this.#SHAPE_MANAGER.reset();

    // Stop Current View
    const VIEW_CURRENT = this.#getViewById(this.#viewIdCurrent);

    if (VIEW_CURRENT) {
      VIEW_CURRENT.stop();
    }
  }

  projectShow(projectId: string) {
    ApplicationLogger.log(
      'DirectableDotMatrix projectShow ' + projectId,
      this.#LOG_LEVEL,
    );

    const DELAY_PAGE_TRANSITION =
      DirectableDotMatrixConstants.getDelayPageTransition();

    // Stop Current View
    this.#stopCurrentView();

    // Set Is Menu Open
    this.#VIEW_HEADER.setIsMenuOpen(false);

    // Show Project View
    const PROJECT_VIEW = this.#getViewById(projectId);

    if (PROJECT_VIEW) {
      PROJECT_VIEW.start(DELAY_PAGE_TRANSITION);
    } else {
      ApplicationLogger.log(
        'DirectableDotMatrix: No view found for project ' + projectId,
        this.#LOG_LEVEL,
      );
    }

    // Store
    this.#viewIdCurrent = projectId;
  }

  projectMenuOpen() {
    ApplicationLogger.log(
      'DirectableDotMatrix projectMenuOpen',
      this.#LOG_LEVEL,
    );

    const DELAY_PAGE_TRANSITION =
      DirectableDotMatrixConstants.getDelayPageTransition();

    // Stop Current View
    this.#stopCurrentView();

    // Set Is Menu Open
    this.#VIEW_HEADER.setIsMenuOpen(true);

    // Show Project Menu View
    const VIEW_PROJECT_MENU = this.#getViewById('project-menu');

    if (VIEW_PROJECT_MENU) {
      VIEW_PROJECT_MENU.start(DELAY_PAGE_TRANSITION);
    }

    // Store
    this.#viewIdCurrent = 'project-menu';
  }

  projectMenuClose() {
    ApplicationLogger.log(
      'DirectableDotMatrix projectMenuShow',
      this.#LOG_LEVEL,
    );

    const DELAY_PAGE_TRANSITION =
      DirectableDotMatrixConstants.getDelayPageTransition();

    // Stop Current View
    this.#stopCurrentView();

    // Set Is Menu Open
    this.#VIEW_HEADER.setIsMenuOpen(false);

    // Show Intro View
    const VIEW_INTRO = this.#getViewById('intro');

    if (VIEW_INTRO) {
      VIEW_INTRO.start(DELAY_PAGE_TRANSITION);
    }

    // Store
    this.#viewIdCurrent = 'intro';
  }

  // ___________________________________________________________________ Reset

  // Set Size Requires a Reset - Redraw Current View

  setSize(width: number, height: number) {
    // Stop
    this.#VIEW_HEADER.stop();

    // Stop Current View
    const VIEW_CURRENT = this.#getViewById(this.#viewIdCurrent);

    if (VIEW_CURRENT) {
      VIEW_CURRENT.stop();
    }

    // Reset Component Manager
    this.#COMPONENT_MANAGER.reset();

    // Reset Shape Manager
    this.#SHAPE_MANAGER.reset();

    // Reset Dot Manager
    this.#DOT_MANAGER.reset();
    this.#DOT_MANAGER.setSize(width, height);

    // Start Header
    this.#VIEW_HEADER.start(0);

    // Restart Current View
    if (VIEW_CURRENT) {
      VIEW_CURRENT.start(0);
    }
  }

  // ____________________________________________________________________ Util

  #getViewById(viewId: string): DotMatrixView | null {
    for (let i = 0; i < this.#VIEWS.length; i += 1) {
      if (this.#VIEWS[i].getViewId() === viewId) {
        return this.#VIEWS[i];
      }
    }

    return null;
  }
}

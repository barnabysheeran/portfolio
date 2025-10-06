import ApplicationLogger from '../application/ApplicationLogger.ts';
import ApplicationDispatcher from '../application/ApplicationDispatcher.ts';

import Glass from '../Glass.ts';

import DataController from '../../data/DataController.ts';
import Display from '../display/Display.ts';
import GridData from '../grid/GridData.ts';
import RenderSurface from '../render/RenderSurface.ts';
import InteractiveSurface, {
  IdData,
} from '../interactive/InteractiveSurface.ts';
import Director from '../director/Director.ts';

// TODO Remove MediaSurface

export default class Controller {
  #GLASS;

  #FRAMERATE_FPS = 60;
  #FRAMERATE_MS = 1000 / this.#FRAMERATE_FPS;

  #frameRateDelayMS = 0;

  #LOG_LEVEL = 1;

  // ___________________________________________________________________________

  constructor(glass: Glass) {
    ApplicationLogger.log(
      `Controller Initialising with Frame Rate ${this.#FRAMERATE_FPS} FPS`,
      this.#LOG_LEVEL,
    );

    // Store
    this.#GLASS = glass;

    // Order Important
    DataController.initialise();
    Display.initialise();

    const DISPLAY_WIDTH = Display.getWidthPx();
    const DISPLAY_HEIGHT = Display.getHeightPx();

    GridData.initialize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    RenderSurface.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    InteractiveSurface.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);

    Director.initialise(DISPLAY_WIDTH, DISPLAY_HEIGHT);

    // Application Dispatcher Events
    ApplicationDispatcher.on(
      'project-menu-open',
      this.#onProjectMenuOpen.bind(this),
    );

    ApplicationDispatcher.on(
      'project-menu-close',
      this.#onProjectMenuClose.bind(this),
    );

    ApplicationDispatcher.on(
      'view-project-menu-select',
      this.#onViewProjectMenuSelect.bind(this),
    );
  }

  // ______________________________________________________________________ Tick

  tick(frameDeltaMS: number) {
    // Frame Rate Delay
    this.#frameRateDelayMS += frameDeltaMS;

    // Next Frame Rate Frame ?
    if (this.#frameRateDelayMS > this.#FRAMERATE_MS) {
      // Reset
      this.#frameRateDelayMS -= this.#FRAMERATE_MS;

      // Tick at Frame Rate FPS

      // Display
      const IS_DISPLAY_UPDATED = Display.tick();

      if (IS_DISPLAY_UPDATED) {
        this.#onDisplayUpdated();
      }

      // Tick Director
      Director.tick(frameDeltaMS);
    }

    // Tick at Max Frame Rate

    // Tick Render Surface
    RenderSurface.tick();
  }

  // _________________________________________________________________ On Events

  #onProjectMenuOpen() {
    ApplicationLogger.log(`Controller onProjectMenuOpen`, this.#LOG_LEVEL);

    // Director
    Director.onProjectMenuOpen();

    // Media
    this.#GLASS.onMediaClear();
  }

  #onProjectMenuClose() {
    ApplicationLogger.log(`Controller onProjectMenuClose`, this.#LOG_LEVEL);

    // Director
    Director.onProjectMenuClose();

    // Media
    this.#GLASS.onMediaClear();
  }

  #onViewProjectMenuSelect(data: unknown) {
    ApplicationLogger.log(
      `Controller onViewProjectMenuSelect`,
      this.#LOG_LEVEL,
    );

    // Handle IdData or plain object
    if (data instanceof Object) {
      // Get Project Id
      const PROJECT_INDEX = (data as IdData).id;

      // Director
      Director.onViewProjectMenuSelect(PROJECT_INDEX);

      // Media
      this.#GLASS.onMediaShowProject(PROJECT_INDEX);
    }
  }

  // ___________________________________________________________________ Display

  #onDisplayUpdated() {
    const DISPLAY_WIDTH = Display.getWidthPx();
    const DISPLAY_HEIGHT = Display.getHeightPx();

    ApplicationLogger.log(
      `Controller onDisplayUpdated ${DISPLAY_WIDTH} ${DISPLAY_HEIGHT}`,
      this.#LOG_LEVEL,
    );

    // Set Sizes
    GridData.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    RenderSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
    InteractiveSurface.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);

    Director.setSize(DISPLAY_WIDTH, DISPLAY_HEIGHT);
  }
}

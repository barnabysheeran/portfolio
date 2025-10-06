import ApplicationLogger from '../application/ApplicationLogger.ts';
import DataController from '../../data/DataController.ts';

import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.ts';

export default class Director {
  static #DIRECTABLE_DOT_MATRIX: DirectableDotMatrix | null = null;

  static #LOG_LEVEL = 2;

  // _________________________________________________________________________

  static initialise(displayWidthPx: number, displayHeightPx: number) {
    ApplicationLogger.log(`Director`, this.#LOG_LEVEL);

    // Create Directable Dot Matrix
    this.#DIRECTABLE_DOT_MATRIX = new DirectableDotMatrix(
      displayWidthPx,
      displayHeightPx,
    );
  }

  // ____________________________________________________________________ Tick

  static tick(frameDeltaMS: number) {
    // Tick Directable Title
    // this.#DIRECTABLE_TITLE.tick(frameDeltaMS);

    // Dot Matrix
    if (this.#DIRECTABLE_DOT_MATRIX) {
      this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);
    }
  }

  // _______________________________________________________________ On Events

  static onProjectMenuOpen() {
    ApplicationLogger.log(`Director onProjectMenuOpen`, this.#LOG_LEVEL);

    // Dot Matrix
    if (this.#DIRECTABLE_DOT_MATRIX) {
      this.#DIRECTABLE_DOT_MATRIX.projectMenuOpen();
    }
  }

  static onProjectMenuClose() {
    ApplicationLogger.log(`Director onProjectMenuClose`, this.#LOG_LEVEL);

    // Dot Matrix
    if (this.#DIRECTABLE_DOT_MATRIX) {
      this.#DIRECTABLE_DOT_MATRIX.projectMenuClose();
    }
  }

  static onViewProjectMenuSelect(projectIndex: number) {
    ApplicationLogger.log(`Director onViewProjectMenuSelect`, this.#LOG_LEVEL);

    // Get Project Id
    const PROJECT_DATA = DataController.getProjectByIndex(projectIndex);

    if (!PROJECT_DATA) {
      return;
    }

    // Dot Matrix
    if (this.#DIRECTABLE_DOT_MATRIX) {
      this.#DIRECTABLE_DOT_MATRIX.projectShow(PROJECT_DATA.id);
    }
  }

  // ____________________________________________________________________ Size

  static setSize(width: number, height: number) {
    // Dot Matrix
    if (this.#DIRECTABLE_DOT_MATRIX) {
      this.#DIRECTABLE_DOT_MATRIX.setSize(width, height);
    }

    // Vimeo
    // this.#DIRECTABLE_VIMEO.setSize(width, height);

    // Youtube
    // this.#DIRECTABLE_YOUTUBE.setSize(width, height);
  }
}

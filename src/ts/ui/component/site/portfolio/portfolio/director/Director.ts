import ApplicationLogger from '../application/ApplicationLogger.ts';

import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.ts';

export default class Director {
	static #DIRECTABLE_DOT_MATRIX;

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
		this.#DIRECTABLE_DOT_MATRIX.tick(frameDeltaMS);
	}

	// _______________________________________________________________ On Events

	static onProjectMenuOpen() {
		ApplicationLogger.log(`Director onProjectMenuOpen`, this.#LOG_LEVEL);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.projectMenuOpen();
	}

	static onProjectMenuClose() {
		ApplicationLogger.log(`Director onProjectMenuClose`, this.#LOG_LEVEL);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.projectMenuClose();
	}

	static onViewProjectMenuSelect(data) {
		ApplicationLogger.log(`Director onViewProjectMenuSelect`, this.#LOG_LEVEL);

		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.projectShow(data.projectId);
	}

	// ____________________________________________________________________ Size

	static setSize(width: number, height: number) {
		// Dot Matrix
		this.#DIRECTABLE_DOT_MATRIX.setSize(width, height);

		// Vimeo
		// this.#DIRECTABLE_VIMEO.setSize(width, height);

		// Youtube
		// this.#DIRECTABLE_YOUTUBE.setSize(width, height);
	}
}

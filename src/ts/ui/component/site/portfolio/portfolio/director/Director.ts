import ApplicationLogger from '../application/ApplicationLogger.ts';

import DirectableDotMatrix from '../directable/dotmatrix/DirectableDotMatrix.ts';
import type { IdData } from '../interactive/InteractiveSurface.ts';

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

	static onViewProjectMenuSelect(idData: IdData) {
		ApplicationLogger.log(`Director onViewProjectMenuSelect`, this.#LOG_LEVEL);

		console.log('Director onViewProjectMenuSelect', idData);

		// Dot Matrix
		// if (this.#DIRECTABLE_DOT_MATRIX) {
		// 	this.#DIRECTABLE_DOT_MATRIX.projectShow(idData.id);
		// }
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

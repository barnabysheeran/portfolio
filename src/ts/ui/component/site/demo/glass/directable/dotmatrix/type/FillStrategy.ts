import type { PositionGrid } from '../../../types/types.ts';
import FillStrategyType from './FillStrategyType.ts';
import type { FillStrategyTypeValue } from './FillStrategyType.ts';

// Re-orders the position grids based on the FillStrategyType

export default class FillStrategy {
	static apply(fillStrategyType: FillStrategyTypeValue, positionGrids: PositionGrid[]) {
		switch (fillStrategyType) {
			case FillStrategyType.PassThrough:
				// Do Nothing
				break;
			case FillStrategyType.Reverse:
				// Reverse
				positionGrids.reverse();
				break;
			case FillStrategyType.Random:
				// Randomize
				this.#applyRandom(positionGrids);
				break;
		}
	}

	// __________________________________________________________________ Random

	static #applyRandom(positionGrids: PositionGrid[]) {
		this.#randomSort(positionGrids);
	}

	/**
	 * Randomly sorts an array using Fisher-Yates shuffle algorithm.
	 * This is more efficient than the basic random swapping approach.
	 * @param {Array} array - The array to be shuffled
	 */
	static #randomSort(array: PositionGrid[]) {
		// Fisher-Yates shuffle algorithm
		for (let i = array.length - 1; i > 0; i--) {
			// Generate random index from 0 to i
			const j = Math.floor(Math.random() * (i + 1));
			// Swap elements at i and j
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
}

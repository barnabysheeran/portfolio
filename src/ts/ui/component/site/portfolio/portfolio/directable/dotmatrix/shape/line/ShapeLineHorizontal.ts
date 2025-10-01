import ApplicationLogger from '../../../../application/ApplicationLogger.ts';

import Shape from '../Shape.ts';

import Fill from '../../type/Fill.ts';
import FillType from '../../type/FillType.ts';
import FillStrategy from '../../type/FillStrategy.ts';
import FillStrategyType from '../../type/FillStrategyType.ts';
import DrawType from '../../type/DrawType.ts';

export default class ShapeLineHorizontal extends Shape {
	#LOG_LEVEL = -1; // 6;

	// _________________________________________________________________________

	constructor(
		dotManager,
		gridX: number,
		gridY: number,
		gridLength: number,
		delay = 0,
		fillType = FillType.PassThrough,
		fillStrategyType = FillStrategyType.PassThrough,
		drawType = DrawType.Fill,
	) {
		super(dotManager, delay, drawType);

		ApplicationLogger.log(`ShapeLineHorizontal`, this.#LOG_LEVEL);

		// Store Initial Position Grids
		for (let i = 0; i < gridLength; i += 1) {
			this.positionGrids.push([gridX + i, gridY]);
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids, gridLength, 1);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}
}

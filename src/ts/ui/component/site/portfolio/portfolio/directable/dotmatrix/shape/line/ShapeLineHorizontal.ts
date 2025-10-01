import ApplicationLogger from '../../../../application/ApplicationLogger.ts';

import Shape from '../Shape.ts';

import Fill from '../../enum/Fill.ts';
import FillType from '../../enum/FillType.ts';
import FillStrategy from '../../enum/FillStrategy.ts';
import FillStrategyType from '../../enum/FillStrategyType.ts';
import DrawType from '../../enum/DrawType.ts';

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

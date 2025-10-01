import ApplicationLogger from '../../../application/ApplicationLogger.ts';

import FillType from '../type/FillType.ts';
import FillStrategyType from '../type/FillStrategyType.ts';
import DrawType from '../type/DrawType.ts';

import type Shape from '../shape/Shape.ts';
import type ShapeManager from '../shape/ShapeManager.ts';
import type { FillTypeValue } from '../type/FillType.ts';
import type { FillStrategyTypeValue } from '../type/FillStrategyType.ts';
import type { DrawTypeValue } from '../type/DrawType.ts';

export default class Component {
	SHAPE_MANAGER;
	SHAPES: Shape[] = [];

	GRID_X = 0;
	GRID_Y = 0;

	FILL_TYPE: FillTypeValue;
	FILL_STRATEGY_TYPE: FillStrategyTypeValue;
	DRAW_TYPE: DrawTypeValue;

	DELAY: number;
	DELAY_GLYPH: number;

	#LOG_LEVEL: number = 1;

	// _________________________________________________________________________

	constructor(
		shapeManager: ShapeManager,
		gridX: number,
		gridY: number,
		delay = 0,
		delayGlyph = 0,
		fillType: FillTypeValue = FillType.PassThrough,
		fillStrategyType: FillStrategyTypeValue = FillStrategyType.PassThrough,
		drawType: DrawTypeValue = DrawType.Fill,
	) {
		ApplicationLogger.log(
			`Component gridX ${gridX} gridY ${gridY}` +
				` delay ${delay}` +
				` fillType ${fillType} fillStrategyType ${fillStrategyType}` +
				` drawType ${drawType}`,
			this.#LOG_LEVEL,
		);

		// Store
		this.SHAPE_MANAGER = shapeManager;
		this.GRID_X = gridX;
		this.GRID_Y = gridY;
		this.DELAY = delay;
		this.DELAY_GLYPH = delayGlyph;
		this.FILL_TYPE = fillType;
		this.FILL_STRATEGY_TYPE = fillStrategyType;
		this.DRAW_TYPE = drawType;
	}

	// ____________________________________________________________________ Tick

	tick() {
		let isComplete = true;

		// Tick Shapes
		for (let i = 0; i < this.SHAPES.length; i += 1) {
			const IS_SHAPE_COMPLETE = this.SHAPES[i].tick();

			if (IS_SHAPE_COMPLETE === false) {
				isComplete = false;
			}
		}

		return isComplete;
	}

	// __________________________________________________________________ Stop

	stopUnstartedShapes() {
		for (let i = 0; i < this.SHAPES.length; i += 1) {
			// Stop Shapes with > 0 Delay
			if (this.SHAPES[i].getDelay() > 0) {
				this.SHAPES[i].stop();
			}
		}
	}

	// _________________________________________________________________ Destroy

	destroy() {
		// Clear Shapes
		this.SHAPES = [];
	}
}

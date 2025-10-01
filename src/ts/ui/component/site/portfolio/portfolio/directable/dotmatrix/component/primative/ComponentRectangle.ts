
import Component from '../Component.ts';
import type ShapeManager from '../../shape/ShapeManager.ts';
import type { FillTypeValue } from '../../type/FillType.ts';
import type { FillStrategyTypeValue } from '../../type/FillStrategyType.ts';
import type { DrawTypeValue } from '../../type/DrawType.ts';

export default class ComponentRectangle extends Component {
	// Unique Parameters
	GRID_WIDTH;
	GRID_HEIGHT;

	// _________________________________________________________________________

	constructor(
		shapeManager: ShapeManager,
		gridX: number,
		gridY: number,
		gridWidth: number,
		gridHeight: number,
		delay: number,
		fillType: FillTypeValue,
		fillStrategyType: FillStrategyTypeValue,
		drawType: DrawTypeValue,
	) {
		super(
			shapeManager,
			gridX,
			gridY,
			delay,
			0,
			fillType,
			fillStrategyType,
			drawType,
		);

		// Store Unique Parameters
		this.GRID_WIDTH = gridWidth;
		this.GRID_HEIGHT = gridHeight;

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Create Shape
		const SHAPE = this.SHAPE_MANAGER.addShapeRectangle(
			this.GRID_X,
			this.GRID_Y,
			this.GRID_WIDTH,
			this.GRID_HEIGHT,
			this.DELAY,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
			this.DRAW_TYPE,
		);

		// Store
		this.SHAPES.push(SHAPE);
	}
}

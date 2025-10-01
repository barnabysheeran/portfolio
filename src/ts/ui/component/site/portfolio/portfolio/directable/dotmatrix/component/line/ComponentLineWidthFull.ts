import GridData from '../../../../grid/GridData.ts';

import Component from '../Component.ts';

export default class ComponentLineWidthFull extends Component {
	// _________________________________________________________________________

	constructor(
		shapeManager,
		gridY: number,
		delay: number,
		fillType: number,
		fillStrategyType: number,
		drawType: number,
	) {
		super(
			shapeManager,
			0,
			gridY,
			delay,
			0,
			fillType,
			fillStrategyType,
			drawType,
		);

		// Create Shape
		this.#createShape();
	}

	// ____________________________________________________________ Create Shape

	#createShape() {
		// Get Grid Data
		const GRID_WIDTH_IN_CELLS = GridData.getGridWidthInCells();

		// Create Shape
		const SHAPE = this.SHAPE_MANAGER.addShapeLineHorizontal(
			this.GRID_X,
			this.GRID_Y,
			GRID_WIDTH_IN_CELLS,
			this.DELAY,
			this.FILL_TYPE,
			this.FILL_STRATEGY_TYPE,
			this.DRAW_TYPE,
		);

		// Store
		this.SHAPES.push(SHAPE);
	}
}

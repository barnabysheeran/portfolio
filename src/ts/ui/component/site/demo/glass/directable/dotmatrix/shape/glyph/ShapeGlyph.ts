import ApplicationLogger from '../../../../application/ApplicationLogger.ts';

import Shape from '../Shape.ts';

import Fill from '../../type/Fill.ts';
import FillType from '../../type/FillType.ts';
import FillStrategy from '../../type/FillStrategy.ts';
import FillStrategyType from '../../type/FillStrategyType.ts';
import DrawType from '../../type/DrawType.ts';

import type DotManager from '../../dot/DotManager.ts';
import type { FillTypeValue } from '../../type/FillType.ts';
import type { FillStrategyTypeValue } from '../../type/FillStrategyType.ts';
import type { DrawTypeValue } from '../../type/DrawType.ts';
import type { GlyphData } from './ShapeGlyphData.ts';
import { PositionGrid } from '../../../../types/types.ts';

export default class ShapeGlyph extends Shape {
	#positionGridGlyphs: number[][] | null = null;
	#glyphWidth = 0;
	#glyphHeight = 0;

	#LOG_LEVEL = -1; // 6;

	// _________________________________________________________________________

	constructor(
		dotManager: DotManager,
		gridX: number,
		gridY: number,
		glyphData: GlyphData,
		delay = 0,
		fillType: FillTypeValue = FillType.PassThrough,
		fillStrategyType: FillStrategyTypeValue = FillStrategyType.PassThrough,
		drawType: DrawTypeValue = DrawType.Fill,
	) {
		super(dotManager, delay, drawType);

		ApplicationLogger.log(`ShapeGlyph`, this.#LOG_LEVEL);

		// Get Glyph Data
		this.#positionGridGlyphs = glyphData.points;

		if(!this.#positionGridGlyphs) {
			return;
		}

		this.#glyphWidth = this.#positionGridGlyphs[0].length;
		this.#glyphHeight = this.#positionGridGlyphs.length;

		// Store Initial Position Grids
		for (let y = 0; y < this.#glyphHeight; y += 1) {
			for (let x = 0; x < this.#glyphWidth; x += 1) {
				if (this.getIsFilled(x, y)) {
					this.positionGrids.push(new PositionGrid(gridX + x, gridY + y));
				}
			}
		}

		// Fill Type
		Fill.apply(fillType, this.positionGrids);

		// Fill Strategy Type
		FillStrategy.apply(fillStrategyType, this.positionGrids);
	}

	getIsFilled(x: number, y: number) {
		// Check bounds
		if (y < 0 || y >= this.#glyphHeight || x < 0 || x >= this.#glyphWidth) {
			return false;
		}

		if (!this.#positionGridGlyphs) {
			return false;
		}

		// Return
		return this.#positionGridGlyphs[y][x] === 1;
	}

	getGlyphWidth() {
		return this.#glyphWidth;
	}

	getGlyphHeight() {
		return this.#glyphHeight;
	}
}

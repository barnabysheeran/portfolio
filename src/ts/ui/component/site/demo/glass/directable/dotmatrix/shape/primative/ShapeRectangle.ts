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
import { PositionGrid } from '../../../../types/types.ts';

export default class ShapeRectangle extends Shape {
  #LOG_LEVEL = -1; // 6;

  // _________________________________________________________________________

  constructor(
    dotManager: DotManager,
    gridX: number,
    gridY: number,
    gridWidth: number,
    gridHeight: number,
    delay = 0,
    fillType: FillTypeValue = FillType.PassThrough,
    fillStrategyType: FillStrategyTypeValue = FillStrategyType.PassThrough,
    drawType: DrawTypeValue = DrawType.Fill,
  ) {
    super(dotManager, delay, drawType);

    ApplicationLogger.log(`ShapeRectangle`, this.#LOG_LEVEL);

    // Store Initial Position Grids
    for (let w = 0; w < gridWidth; w++) {
      for (let h = 0; h < gridHeight; h++) {
        this.positionGrids.push(new PositionGrid(gridX + w, gridY + h));
      }
    }

    // Fill Type
    Fill.apply(fillType, this.positionGrids);

    // Fill Strategy Type
    FillStrategy.apply(fillStrategyType, this.positionGrids);
  }
}

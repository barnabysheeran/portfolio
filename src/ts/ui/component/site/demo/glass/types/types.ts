export interface CreationParameters {
  isDebug: boolean;
  assetPath: string;
  applicationContainer: HTMLElement;
}

export class PositionGrid {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

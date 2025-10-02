// filepath: c:\Users\B\Desktop\Work\B\portfolio\src\ts\ui\component\site\portfolio\portfolio\types\types.ts
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

export class IdData {
  public id: number | string;

  constructor(id: number | string) {
    this.id = id;
  }
}

import { Position } from "../interfaces/position";
import { Size } from "../interfaces/size";
import { BaseShape } from "./BaseShape";

export class Square extends BaseShape {
  private size: Size;

  public get width() {
    return this.size.width;
  }

  public get height() {
    return this.size.height;
  }

  protected initialize() {
    const randomSize = Math.max(Math.random() * 50, 10);
    this.size = { width: randomSize, height: randomSize };
  }

  public override checkIfClicked(position: Position, clickPosition: Position) {
    const { x, y } = position;
    const { x: clickX, y: clickY } = clickPosition;

    return (
      clickX >= x &&
      clickX <= x + this.size.width &&
      clickY >= y &&
      clickY <= y + this.size.height
    );
  }

  protected override drawShape(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(0, 0, this.size.width, this.size.height);
    ctx.fill();
  }
}

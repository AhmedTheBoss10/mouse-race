import { Position } from "../interfaces/position";
import { Radius } from "../interfaces/size";
import { BaseShape } from "./BaseShape";

export class Circle extends BaseShape {
  private radius: Radius;

  public get width() {
    return this.radius * 2;
  }

  public get height() {
    return this.radius * 2;
  }

  protected initialize() {
    const randomRadius = Math.max(Math.random() * 50, 10);
    this.radius = randomRadius;
  }

  public override checkIfClicked(position: Position, clickPosition: Position) {
    const { x, y } = position;
    const { x: clickX, y: clickY } = clickPosition;
    return Math.sqrt((clickX - x) ** 2 + (clickY - y) ** 2) <= this.radius;
  }

  protected override drawShape(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

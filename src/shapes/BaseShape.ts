import { Colors } from "../enums/colors";
import { Position } from "../interfaces/position";

export class BaseShape {
  public get width() {
    return 0;
  }

  public get height() {
    return 0;
  }

  constructor(public color = Colors.Black) {
    this.initialize();
  }

  protected initialize() {}

  protected drawShape(ctx: CanvasRenderingContext2D) {}

  public checkIfClicked(position: Position, clickPosition: Position) {
    return false;
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    position: Position,
    angle: number
  ) {
    ctx.fillStyle = this.color;
    ctx.save();
    ctx.translate(position.x, position.y);
    ctx.translate(this.width / 2, this.height / 2);
    ctx.rotate(angle);
    ctx.translate(-this.width / 2, -this.height / 2);
    this.drawShape(ctx);
    ctx.restore();
  }
}

import { Position } from '../interfaces/position'
import { BaseShape } from '../shapes/BaseShape'

export class BaseElement {
  public angle: number
  public initialPosition: Position
  public currentPosition: Position

  constructor(public shape: BaseShape) {
    this.initialize()
  }

  protected initialize() {
    const initialPosition = {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }

    this.initialPosition = initialPosition
    this.currentPosition = { ...initialPosition }
    this.angle = 0
  }

  protected animate() {}

  public checkIfClicked(clickPosition: Position) {
    return this.shape.checkIfClicked(this.currentPosition, clickPosition)
  }

  public onClicked() {}

  public draw(ctx: CanvasRenderingContext2D) {
    this.animate()
    this.shape.draw(ctx, this.currentPosition, this.angle)
  }
}

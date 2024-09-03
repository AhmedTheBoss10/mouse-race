import { Square } from '../shapes/Square'
import { GameManager } from '../GameManager'
import { BaseElement } from './BaseElement'

export class Change extends BaseElement {
  private readonly changeBehaviorTime = 1000
  private readonly rotationSpeed = 0.1

  constructor(
    private gameManager: GameManager,
    private mimicClasses: (new (gameManager: GameManager) => BaseElement)[]
  ) {
    super(new Square())

    this.changeBehavior()
    this.initializeBehaviorChangeTimer()
  }

  private initializeBehaviorChangeTimer() {
    setInterval(this.changeBehavior.bind(this), this.changeBehaviorTime)
  }

  private changeBehavior() {
    const randomClass = Math.floor(Math.random() * this.mimicClasses.length)
    const newElement = new this.mimicClasses[randomClass](this.gameManager)

    this.shape.color = newElement.shape.color
    this.onClicked = newElement.onClicked.bind(this)
  }

  protected override animate() {
    this.angle += this.rotationSpeed
  }
}

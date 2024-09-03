import { Circle } from "../shapes/Circle";
import { Colors } from "../enums/colors";
import { GameManager } from "../GameManager";
import { BaseElement } from "./BaseElement";

export class Avoid extends BaseElement {
  private readonly movementDistance = 50;
  private readonly movementSpeed = 1;
  private movingUp = true;

  constructor(private gameManager: GameManager) {
    super(new Circle(Colors.Red));
  }

  protected override animate() {
    if (this.movingUp) {
      this.currentPosition.y -= this.movementSpeed;
    } else {
      this.currentPosition.y += this.movementSpeed;
    }

    if (
      this.currentPosition.y <=
      this.initialPosition.y - this.movementDistance
    ) {
      this.movingUp = false;
    } else if (
      this.currentPosition.y >=
      this.initialPosition.y + this.movementDistance
    ) {
      this.movingUp = true;
    }
  }

  public override onClicked() {
    this.gameManager.loseGame();
  }
}

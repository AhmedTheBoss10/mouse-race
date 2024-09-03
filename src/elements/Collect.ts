import { Rectangle } from "../shapes/Rectangle";
import { Colors } from "../enums/colors";
import { GameManager } from "../GameManager";
import { BaseElement } from "./BaseElement";

export class Collect extends BaseElement {
  private readonly movementDistance = 50;
  private readonly movementSpeed = 1;
  private movingLeft = true;

  constructor(private gameManager: GameManager) {
    super(new Rectangle(Colors.Green));
  }

  protected override animate() {
    if (this.movingLeft) {
      this.currentPosition.x -= this.movementSpeed;
    } else {
      this.currentPosition.x += this.movementSpeed;
    }

    if (
      this.currentPosition.x <=
      this.initialPosition.x - this.movementDistance
    ) {
      this.movingLeft = false;
    } else if (
      this.currentPosition.x >=
      this.initialPosition.x + this.movementDistance
    ) {
      this.movingLeft = true;
    }
  }

  public override onClicked() {
    this.gameManager.collectElement(this);
  }
}

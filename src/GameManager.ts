import { gameConfig } from "./configurations/gameConfig";
import { BaseElement } from "./elements/BaseElement";
import { Avoid } from "./elements/Avoid";
import EventEmitter from "events";

export class GameManager extends EventEmitter {
  private elements: BaseElement[] = [];
  private clickAbortController = new AbortController();
  private isGameOver = false;
  private startTime: number;

  constructor(private ctx: CanvasRenderingContext2D) {
    super();
  }

  public startGame() {
    this.initializeElements();
    this.setupClickListener();
    this.startTime = Date.now();
    this.handleGameTick();
  }

  public collectElement(element: BaseElement) {
    this.elements = this.elements.filter((el) => el !== element);

    if (this.hasGameEnded()) {
      this.winGame();
    }
  }

  public loseGame() {
    this.emit("gameLost");
    this.clearGame();
  }

  private initializeElements() {
    gameConfig.elementsOnStart.forEach(({ count, element }) => {
      const newElements = Array.from({ length: count }, () => element(this));
      this.elements.push(...newElements);
    });
  }

  private setupClickListener() {
    window.addEventListener("click", this.handleClick.bind(this), {
      signal: this.clickAbortController.signal,
    });
  }

  private clearGame() {
    this.elements = [];
    this.clickAbortController.abort();
    this.isGameOver = true;
  }

  private winGame() {
    const elapsedTime = Date.now() - this.startTime;
    this.emit("gameWon", elapsedTime);
    this.clearGame();
  }

  private hasGameEnded(): boolean {
    return this.elements.every((element) => element instanceof Avoid);
  }

  private handleClick(event: MouseEvent) {
    const clickPosition = { x: event.clientX, y: event.clientY };

    this.elements.forEach((element) => {
      if (element.checkIfClicked(clickPosition)) {
        element.onClicked();
      }
    });
  }

  private handleGameTick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (this.isGameOver) {
      return;
    }

    this.elements.forEach((element) => element.draw(this.ctx));

    const elapsedTime = Date.now() - this.startTime;
    this.emit("gameTick", elapsedTime);

    window.requestAnimationFrame(this.handleGameTick.bind(this));
  }
}

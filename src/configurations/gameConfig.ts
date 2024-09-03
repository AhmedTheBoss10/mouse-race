import { Change } from "../elements/Change";
import { Avoid } from "../elements/Avoid";
import { Collect } from "../elements/Collect";

export const gameConfig = {
  elementsOnStart: [
    {
      element: (gameManager) => new Collect(gameManager),
      count: 5,
    },
    {
      element: (gameManager) => new Avoid(gameManager),
      count: 3,
    },
    {
      element: (gameManager) => new Change(gameManager, [Collect, Avoid]),
      count: 3,
    },
  ],
};

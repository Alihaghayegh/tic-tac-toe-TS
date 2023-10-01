import Store from "./store.js";
import View from "./view.js";
import type { Player } from "./types";

const players:Player[] = [
  {
    id: 1,
    name: "Player 1",
    iconClass: "fa-x",
    colorClass: "turquoise",
  },
  {
    id: 2,
    name: "Player 2",
    iconClass: "fa-o",
    colorClass: "yellow",
  },
];

function init() {
  const view = new View();
  const store = new Store("live-t3-storage-key", players);

  console.log(store.game);

  window.addEventListener("storage", () => {
    console.log("State changed from another tab");
    view.render(store.game, store.stats);
  });

  // initView();
  view.render(store.game, store.stats);

  view.bindGameResetEvent((event) => {
    store.reset();
    view.render(store.game, store.stats);
  });

  view.bindNewRoundEvent((event) => {
    store.newRound();
    view.render(store.game, store.stats);
  });

  view.bindPlayerMoveEvent((square) => {
    const existingMove = store.game.moves.find(
      (move) => move.squareId === +square.id
    );

    if (existingMove) {
      return;
    }

    store.playeMove(+square.id);

    view.render(store.game, store.stats);
  });
}

window.addEventListener("load", init);

import { bus } from "./bus.js";
import { ObjectPlacementConfirmed, ObjectPlacementRequested } from "./components/ncje-board.js";

const game = Symbol("game");
const send = bus(game, receive);

function receive({ type, payload }) {

    if(type === ObjectPlacementRequested) {

        const { object, existingObject } = payload;
        const isEmpty = !existingObject;
        const isBarrier = existingObject?.endsWith("-barrier");
        const bombRequested = object === "dynamite";
        const sameFamilyRequested = existingObject?.startsWith(object)
        if(isEmpty || (isBarrier && (bombRequested || sameFamilyRequested)))
            send({ type: ObjectPlacementConfirmed, payload });
        
    }

}


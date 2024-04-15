import { bus } from "./bus.js";
import { ObjectPlacementConfirmed, ObjectPlacementRequested } from "./components/ncje-board.js";

const game = Symbol("game");
const send = bus(game, receive);
export const BOMB = "dynamite";

function receive({ type, payload }) {

    if (type === ObjectPlacementRequested) {

        const { object, existingObject } = payload;
        const isEmpty = !existingObject;
        const isBarrier = existingObject?.endsWith("-barrier");
        const bombRequested = object === "dynamite";
        const sameFamilyRequested = existingObject?.startsWith(object)
        if (!(isEmpty || (isBarrier && (bombRequested || sameFamilyRequested)))) return;

        if (bombRequested) {

            payload = addExplosion(payload);

        }
        send({ type: ObjectPlacementConfirmed, payload });


    }

}

function addExplosion(payload) {

    const clone = structuredClone(payload);
    clone.additional = [];
    const col = clone.position % 3;
    const row = (clone.position - col) / 3;
    for (let r = Math.max(row - 1, 0); r <= Math.min(row + 1, 2); r++) {
        for (let c = Math.max(col - 1, 0); c <= Math.min(col + 1, 2); c++) {
            clone.additional.push({ position: r * 3 + c });
        }
    }
    return clone;

}

import { bus } from "./bus.js";
import { ObjectPlacementConfirmed, ObjectPlacementRequested } from "./components/ncje-board.js";
import { OBJECT_CROSS, OBJECT_NOUGHT } from "./components/ncje-object-picker.js";
import { CROSSES, NOUGHTS } from "./components/ncje-player.js";
import { PlayerWins } from "./components/ncje-winner.js";

const game = Symbol("game");
const send = bus(game, receive);
export const BOMB = "dynamite";

const state = { pieces: [] };

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
            payload.additional.forEach(bombed => {

                delete state.pieces[bombed.position];

            });

        } else {
            
            state.pieces[payload.position] = payload.object;
        
        }
        send({ type: ObjectPlacementConfirmed, payload });
        if(isWin(state)) {

            send({ type: PlayerWins, payload: state.winner });
            
        }

    }

}

function isWin(state) {

    // horizontal lines
    for (let i = 0; i < 7; i+= 3) {
        const line = state.pieces.slice(i, i + 3).join("");
        checkLine(line, state);
    }
    
    const diagonal1 = [state.pieces[0], state.pieces[4], state.pieces[8]].join("");
    checkLine(diagonal1, state);
    const diagonal2 = [state.pieces[2], state.pieces[4], state.pieces[6]].join("");
    checkLine(diagonal2, state);
    for(let i = 0; i < 3; i++) {
        const line = [state.pieces[i],state.pieces[i+3], state.pieces[i+6]].join("");
        checkLine(line, state);
    }
    return !!state.winner;

}

function checkLine(line, state) {
    if (line === OBJECT_NOUGHT.repeat(3)) {
        state.winner = NOUGHTS;
    }
    if (line === OBJECT_CROSS.repeat(3)) {
        state.winner = CROSSES;
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

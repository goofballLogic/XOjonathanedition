export const Subscribe = Symbol("Subscribe")

const subscribers = [];
let isSending = false;
const backlog = [];

export function bus(participant, receiver) {

    if(!receiver) receiver = participant.receive?.bind(participant);
    subscribers.push([participant, receiver]);
    return ({ type, payload }) => dispatch(type, payload, participant);

}


function dispatch(type, payload, sender) {

    backlog.push([
        type,
        structuredClone(payload),
        sender,
        subscribers.filter(([p]) => p !== sender)
    ]);
    ensureSending();

}

function ensureSending() {

    if (isSending) return;
    try {
        
        isSending = true;
        while(backlog.length) {

            const [type, payload, sender, recipients] = backlog.shift();
            recipients.forEach(([recipient, receive]) => receive({ type, payload }));
        
        }

    } finally {

        isSending = false;

    }

}
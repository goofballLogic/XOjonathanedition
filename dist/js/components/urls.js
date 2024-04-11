export const imgUrlBase = new URL(import.meta.url);

const pathBits = imgUrlBase.pathname.split("/");
pathBits.pop();
pathBits.pop();
pathBits.pop();
pathBits.push("img");
imgUrlBase.pathname = pathBits.join("/");


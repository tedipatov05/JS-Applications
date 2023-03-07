import { product, sum, data as externalData, inspect } from './util.js'

console.log(sum(5, 3));
console.log(product(5, 3));

console.log("Data from App Js")
console.log(externalData);

externalData.push(50);

inspect();


async function start() {
    const external = await import('./lazyEvaluation.js');
    console.log(external);
}

window.start = start;
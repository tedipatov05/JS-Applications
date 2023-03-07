export function sum(a, b) {
    verifyNumber(a);
    verifyNumber(b);
    return a + b;
}

export function product(a, b){
    verifyNumber(a);
    verifyNumber(b);
    return a * b;
}

function verifyNumber(arg){
    if(typeof arg != 'number'){
        throw new TypeError("Argument must be a number");
    }
}

function printData(){
    console.log(data);
}
const data = [10,20,30,40];

export {
    data,
    printData as inspect
};
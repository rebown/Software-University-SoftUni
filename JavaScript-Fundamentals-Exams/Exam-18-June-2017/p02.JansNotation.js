function solution(arr) {
    let operands = [];
    let currentResult;
    for (let i = 0; i < arr.length; i++) {
        if(arr[i] === '+') {
            if(operands.length < 2) {
                console.log('Error: not enough operands!');
                return;
            }
                currentResult = operands[operands.length - 2] + operands[operands.length - 1];
                operands.splice(operands.length - 2, 2);
                operands.push(currentResult);
        }else if(arr[i] === '-') {
            if(operands.length < 2){
                console.log('Error: not enough operands!');
                return;
            }
            currentResult = operands[operands.length - 2] - operands[operands.length - 1];
            operands.splice(operands.length - 2, 2);
            operands.push(currentResult);
        } else if(arr[i] === '*') {
            if(operands.length < 2){
                console.log('Error: not enough operands!');
                return;
            }
            currentResult = operands[operands.length - 2] * operands[operands.length - 1];
            operands.splice(operands.length - 2, 2);
            operands.push(currentResult);
        }else if(arr[i] === '/') {
            if(operands.length < 2){
                console.log('Error: not enough operands!');
                return;
            }
            currentResult = operands[operands.length - 2] / operands[operands.length - 1];
            operands.splice(operands.length - 2, 2);
            operands.push(currentResult);
        }else {
            operands.push(arr[i]);
        }
        currentResult = 0;
    }
    if(operands.length > 1) {
        console.log('Error: too many operands!')
    }else {
        console.log(operands.join());
    }
}

solution([-1,
    1,
    '+',
    101,
    '*',
    18,
    '+',
    3,
    '/']
);
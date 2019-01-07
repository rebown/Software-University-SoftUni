// 1
// let obj = {
//   text: "15",
//   func: function() {
//     console.log(typeof this.text)
//     (function() {
//       console.log(this.text)
//     })()
//     console.log(this.text / 6)
//   }
// };
//
// obj.func();

//2
// function func() {
//     console.log(1);
//     setTimeout(() => console.log(2),1000)
//     setTimeout(() => console.log(3),0)
//     console.log(4);
// }
//func()

//3
// var i = 1, j = 10;
// do {
//     //if(i < j) break;
//     j--
// } while(++i < 5)
// console.log('i = ' + i + 'j = ' + j)

//4

// function add(x, y) {
//     x += y;
//     return x;
// }
// var i = 5;
// console.log(add(i, 3))
// console.log(i * 2 + 48)

//5
let currCount = 0;
let bestCount = 0;
let num = '';

    let input = "f6k2s9j42l7!l!5dk5!6";
  //let input = "!2!23d!2";
function solve(input) {
    let arr = input.split('')
    for (let i = 1; i < arr.length + 1; i++) {
        if(arr[i - 1] !== "!") {
            console.log(arr[i]);
            for (let k = 0; k < arr.length; k++) {
                if (!Number.isNaN(Number(arr[i])) && !Number.isNaN(Number(arr[i]))) {
                    if (Number(arr[i]) === Number(arr[k])) {
                        currCount++
                    }
                }
            }
        }

        if (currCount > bestCount) {
            bestCount = currCount;
            num = arr[i];
        }
        currCount = 0;
    }
    return num;
}
console.log(solve(input));


function solve(str) {
    let numberRegex = /^[0-9]+/g;

    let count = str.match(numberRegex);

    let arrOfChars = str.split('').slice(count.length - 1, count.length + 1 + +count);

    count = +count;

    let wholeStr = arrOfChars.join('')
    let splitter = wholeStr[wholeStr.length - 1];


    let splittedArray = wholeStr.split(splitter).filter(s => s !== '');


    let groupPattern = '[' + splittedArray[0] + ']';
    let pattern = new RegExp(groupPattern, 'g');

    let newStr = splittedArray[1].replace(pattern, '');
    let finalStr = newStr.replace(/#/g, ' ');

    console.log(finalStr);
}

solve(
    '67%!3-7=@+Ja45v=aS67cri!pt#Co%@@re#-#Fun4%!d=am6e@5n7t%!als#-#2018+'
)

solve(
    '47*0-9%&+I0\'m0#a#stu99%d%e&nt#a9t#So00ft%Uni*!+'
)
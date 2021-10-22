console.log("NodeJS: home work 1");

let primeNumbers = [];
const colors = require('colors');
const [from, to] = process.argv.slice(2);
let minNumber = parseInt(from, 10);
let maxNumber = parseInt(to, 10);

function isNotPrimeNumber(i) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) return true;
    }
}

if (( isNaN(minNumber) == false )&(isNaN(maxNumber) == false))  {
	console.log(colors.green('Поиск простых чисел в диапазоне от'), minNumber, colors.green(' до '), maxNumber);   
    let i = minNumber;
    while (i <= maxNumber) {
        if (!isNotPrimeNumber(i)) primeNumbers.push(i);
        i++;
    }
    if (primeNumbers.length == 0) console.log(colors.red('В данном диапазоне нет простых чисел'));
    
    while ( primeNumbers.length != 0) {
        console.log(colors.green(primeNumbers.shift()));
        //если уже закончился массив простых чисел
        if (primeNumbers.length != 0) console.log(colors.yellow(primeNumbers.shift())); 
        if (primeNumbers.length != 0) console.log(colors.red(primeNumbers.shift()));	
    }    
} else {
    console.log(colors.red('Ошибка: переданные параметры должны быть числами'));
}

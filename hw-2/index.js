//Задание №1 Вывод в консоль:
/*
console.log('Record 1');
setTimeout(() => {
    console.log('Record 2');
    Promise.resolve().then(() => {
        setTimeout(() => {
            console.log('Record 3');
            Promise.resolve().then(() => {
                console.log('Record 4');
            });
        });
    });
});
console.log('Record 5');
Promise.resolve().then(() => Promise.resolve().then(() => console.log('Record 6')));
*/
// Ответ: 156234 (Сначала синхронные (console.log), затем промисы, затем таймеры)
// ----------------------------------
// Задание №2
// Напишите программу, которая будет принимать на вход несколько аргументов: дату и время в формате «сек-мин-час-день-месяц-год».
// Задача программы — создавать для каждого аргумента таймер с обратным отсчётом: посекундный вывод в терминал состояния таймеров (сколько осталось).
// По истечении какого-либо таймера, вместо сообщения о том, сколько осталось, требуется показать сообщение о завершении его работы.
// Важно, чтобы работа программы основывалась на событиях.

const EventEmitter = require('events');
const emitter = new EventEmitter();
const dayjs = require("dayjs");
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

const setDateTimeForTimer = () => {
    let arrayDateTime = process.argv[2].split("-");
    let second = Number(arrayDateTime[0]);
    let minute = Number(arrayDateTime[1]);
    let hour = Number(arrayDateTime[2]);
    let day = Number(arrayDateTime[3]);
    let month = Number(arrayDateTime[4] - 1);
    let year = Number(arrayDateTime[5]);
    return new Date(year, month, day, hour, minute, second, 0);
};

const showLeftTime = (targetTime) => {
    const currentDate = new Date();
    const x = dayjs(targetTime);
    const y = dayjs(currentDate);
    const timeDuration = dayjs.duration(x.diff(y)) //из Результирующей даты вычитаем Текущую дату

    let second = Number(timeDuration.format('ss'));
    let minute = Number(timeDuration.format('mm'));
    let hour = Number(timeDuration.format('HH'));
    let day = Number(timeDuration.format('DD'));
    let month = Number(timeDuration.format('MM'));
    let year = Number(timeDuration.format('YYYY'));
    let msg = 'Left time is: years: ' + year + ', months: ' + month + ', days: ' + day + ', hours: ' + hour + ', minutes: ' + minute + ', seconds: ' + second;
    if (currentDate < targetTime) {
        return msg;
    } else {
        msg = 'Time is over!';
        return msg;
    }
};

class Handlers {
    //обрабатываем событие teak
    static teakTimer(timerDateTime) {
        console.clear();
        console.log(showLeftTime(timerDateTime));
    }
}

const run = () => {
    const timerDateTime = setDateTimeForTimer();
    //отправляем события каждую секунду
    setInterval( () => {
            emitter.emit(`teak`, timerDateTime);
        },1000
    );
    emitter.on('teak', Handlers.teakTimer);
};

run();

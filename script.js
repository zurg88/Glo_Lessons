'use strict';

let money = 10000;
let	income = 'Профессионально садится на катусы';
let	addExpenses = 'коммуналка, ТО автомобиля, кофе, уксус';
let	deposit = true;
let	mission = 1000000;
let	period = 8;


console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );

console.log(addExpenses.length);

console.log( 'Период равен ' + period + ' месяцев' );

console.log( addExpenses.toLocaleLowerCase().split(', ') );

// Lesson - 3

 money =  +prompt('Каков, Андрей, Ваш месячный доход?');

 addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' + '');

 deposit = confirm('Есть ли у вас депозит в банке?');

 let expenses1 = prompt('Обязательная статья расходов' + '');

 let amount1 = +prompt('Во сколько это обойдётся?');

 let expenses2 = prompt('Вторая не менее важная статья расходов?' + '');

 let amount2 = +prompt('Во сколько это обойдётся?');

 let budgetMonth = +money - amount1 - amount2;

 console.log('Бюджет на месяц равен ' + budgetMonth);

 let target = Math.round(mission / budgetMonth);

 if (target < 0) {
	console.log('Ой ёёёё....');
 }

 console.log('Цель будет достигнута за ' + target + ' месяцев');

 let budgetDay = Math.floor(budgetMonth / 30);

 console.log('Бюджет на день ' + budgetDay);

if (budgetDay >= 1200) {
	console.log('У вас высокий уровень дохода');
} else if ( budgetDay < 1200 && budgetDay >= 600 ) {
	console.log('У вас средний уровень дохода');
} else if (budgetDay < 0) {
	console.log('Беги, братан... Беги...');
} else if (budgetDay <= 600) {
	console.log('К сожалению у вас уровень дохода ниже среднего');
}
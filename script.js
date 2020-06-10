'use strict';

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let	income = 'Профессионально садится на катусы';
let	mission = 1000000;
let	period = 8;
let money;

 let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' + '');

 let deposit = confirm('Есть ли у вас депозит в банке?');


 let expenses = [];

 let start = function() {
	do  {
		money = prompt('Каков, Андрей, Ваш месячный доход?');
	}
	while( !isNumber(money) ); 
 };

 start();

function showTypeOf(data) {
	console.log( data, typeof(data) );
}

showTypeOf(money);

function getExpensesMonth() {
	let sum = 0;
	let amount = 0;
	for (let i = 0; i < 2; i++) {
		expenses[i] = prompt('Обязательная статья расходов', 'купить зебру');
		
		amount = prompt('Во сколько это обойдётся?');
		
		if(isNumber(amount)) {
			sum +=+ amount;
		} else {
			do  {
				amount = prompt('Во сколько это обойдётся?');
			}
			while( !isNumber(amount) ); 
		}
		
	}
	console.log(expenses);
	return sum;
}

 let expensesAmount = getExpensesMonth();


function getAccumulatedMonth(money, expenses) {
	let sumExpenses = expenses;

	return +money - sumExpenses;
}

let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

function getTargetMonth(mission, accumulation) {
	let target = Math.floor(mission / accumulation);
	
	if(target > 0) {
		return 'Цель будет достигнута через ' + target + ' месяцев';
	} else {
		return 'Цель не будет достигнута!';
	}
}
console.log(getTargetMonth(mission, accumulatedMonth));


let budgetDay = Math.floor(accumulatedMonth / 30);
console.log('Бюджет на день ' + budgetDay);

function getStatusIncome(budgetDay) {
	if (budgetDay >= 1200) {
		return ('У вас высокий уровень дохода');
	 } else if ( budgetDay < 1200 && budgetDay >= 600 ) {
		return 'У вас средний уровень дохода';
	 } else if (budgetDay < 0) {
		return 'Беги, братан... Беги...';
	 } else if (budgetDay <= 600) {
		return 'К сожалению у вас уровень дохода ниже среднего';
	 } else {
		 return 'Что-то пошло не так';
	 }
}
console.log(getStatusIncome(budgetDay));


let arrExpenses = addExpenses.split(',');
console.log(arrExpenses);

'use strict';

let	income = 'Профессионально садится на катусы';
let	mission = 1000000;
let	period = 8;


 let money =  +prompt('Каков, Андрей, Ваш месячный доход?');

 let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' + '');

 let deposit = confirm('Есть ли у вас депозит в банке?');

 let expenses1 = prompt('Обязательная статья расходов' + '');

 let amount1 = +prompt('Во сколько это обойдётся?');

 let expenses2 = prompt('Вторая не менее важная статья расходов?' + '');

 let amount2 = +prompt('Во сколько это обойдётся?');


function showTypeOf(data) {
	console.log( data, typeof(data) );
}

showTypeOf(money);

function getExpensesMonth(exp1, exp2) {
	return exp1 + exp2;
}
console.log(getExpensesMonth(amount1, amount2));


function getAccumulatedMonth(money, expenses) {
	let sumExpenses = expenses;

	return +money - sumExpenses;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

function getTargetMonth(mission, accumulation) {
	return mission / accumulation;
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

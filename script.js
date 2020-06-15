'use strict';

let money;

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

let start = function() {
	do  {
		money = prompt('Каков, Андрей, Ваш месячный доход?');
	}
	while( !isNumber(money) ); 
 };

 start();

let appData = {

	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	budget: money,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	mission: 1000000,
	deposit: false,
	period: 13,


	getExpensesMonth: function(obj) {
		 for(let key in obj) {
			appData.expensesMonth +=+ obj[key];
		 }
		 return appData.expensesMonth;
	},
	
	asking: function() {
		appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' + '');
		appData.deposit = confirm('Есть ли у вас депозит в банке?');
		let sum = 0;
		let amount = 0;
		let expenses;
		for (let i = 0; i < 2; i++) {
			expenses = prompt('Обязательная статья расходов', ' купить зебру ');
			amount = +prompt(' Во сколько это обойдётся? ');
			appData.expenses[expenses] = amount;
			
			do  {
				amount = prompt('Во сколько это обойдётся?');
			}
			while( !isNumber(amount) ); 
			
			
		}
		console.log(appData.expenses);
		return appData.expenses;
	},



	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth; 
		appData.budgetDay = appData.budgetMonth / 30;
		console.log(appData.budget);
		console.log(appData.expensesMonth);
	},

	getTargetMonth: function () {
		
		let target = Math.floor(appData.mission / appData.budgetMonth);
		
		if(target > 0) {
			return 'Цель будет достигнута через ' + target + ' месяцев';
		} else {
			return 'Цель не будет достигнута!';
		}
	}, 

	getStatusIncome: function (budgetDay) {
		if (appData.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		 } else if ( appData.budgetDay < 1200 && appData.budgetDay >= 600 ) {
			return 'У вас средний уровень дохода';
		 } else if (appData.budgetDay < 0) {
			return 'Беги, братан... Беги...';
		 } else if (appData.budgetDay <= 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		 } else {
			 return 'Что-то пошло не так';
		 }
	}
};

 appData.asking();
 appData.getExpensesMonth(appData.expenses);
 appData.getBudget();


console.log(appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

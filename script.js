'use strict';

let money;

let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

function isString(data) {
	if(typeof(data === 'string' || typeof(data) !== '' || typeof(data) !== null)) {
	   return true;
	} else {
		return false;
	}
}

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
	deposit: true,
	percentDeposit: 0,
	moneyDeposit: 0,
	period: 13,


	getExpensesMonth: function(obj) {
		 for(let key in obj) {
			appData.expensesMonth +=+ obj[key];
		 }
		 return appData.expensesMonth;
	},
	
	asking: function() {

		if(confirm('Есть ли у вас дополнительный заработок?')) {
			let itemIncome = '';
			let cachIncome = '';

			do {
				 itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
			} while (!isString(itemIncome));

			do {
				cachIncome = +prompt('Сколько в месяц вы на этом зарабатываете?', '1000');
		   } while (isNumber(itemIncome));

			appData.income[itemIncome] = cachIncome;
			}

			
			appData.addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую' + '');
			
			appData.deposit = confirm('Есть ли у вас депозит в банке?');

		let sum = 0;
		let amount = 0;
		let expenses;
		for (let i = 0; i < 2; i++) {

			do  {
				expenses = prompt('Обязательная статья расходов', ' купить зебру ');
			}
			while( !isString(expenses) ); 
			
			do  {
				amount = prompt('Во сколько это обойдётся?');
			}
			while( !isNumber(amount) ); 

			appData.expenses[expenses] = amount;
		}
		return appData.expenses;
	},



	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth; 
		appData.budgetDay = appData.budgetMonth / 30;
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
	},

	getInfoDeposit: function() {
		if(appData.deposit) {
			

			do  {
				appData.percentDeposit = prompt('какой годовой процент', '6');
			}
			while( !isNumber(appData.percentDeposit) ); 

			do  {
				appData.moneyDeposit = prompt('какая сумма заложена', '10000');
			}
			while( !isNumber(appData.moneyDeposit) ); 

			
		}
	},

	calcSavedMoney: function() {
		return appData.budgetMonth * appData.period;
	}
};

 appData.asking();
 appData.getExpensesMonth(appData.expenses);
 appData.getBudget();
 appData.getInfoDeposit();


console.log('Расходы за месяц - ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log(appData.calcSavedMoney());

let arrAddExpenses = appData.addExpenses.split(',');
let newArr = [];

for (let i = 0; i < arrAddExpenses.length; i++) {
	 arrAddExpenses[i] = arrAddExpenses[i].trim();

	let str = arrAddExpenses[i].charAt(0).toUpperCase() + arrAddExpenses[i].slice(1);
	newArr.push(str);
}

console.log(newArr.join(', '));
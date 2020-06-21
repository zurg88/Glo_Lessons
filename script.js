'use strict';


let startButton = document.getElementById('start');
let dataSection = document.querySelector('.data') ;
let plussBattons = dataSection.getElementsByTagName('button');
let expensesPlus = plussBattons[1];
let incomePlus = plussBattons[0];
let checkBox = document.getElementById('deposit-check');
let additionalIncomeItems = document.querySelectorAll('.additional_income-item');
let budgetMonthValue = document.querySelector('.budget_month-value');
let budgetDayValue = document.querySelector('.budget_day-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let additionalIncomeItem = document.querySelector('.additional_income-item');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let targetAmount = document.querySelector('.target-amount');
let periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');


let isNumber = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};

function isString(data) {
	if(typeof(data === 'string' || data !== '' || typeof(data) !== null)) {
	   return true;
	} else {
		return false;
	}
}


let appData = {

	income: {},
	incomeMonth: 0,
	addIncome: [],
	expenses: {},
	addExpenses: [],
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	deposit: true,
	percentDeposit: 0,
	moneyDeposit: 0,

	start: function() {

		appData.budget = +salaryAmount.value;


		appData.getExpenses();
		appData.getAddExpenses();
		appData.getExpensesMonth(appData.expenses);
		appData.getAddIncome();
		appData.getIncome();
		appData.getBudget();
		appData.showResult();
		// appData.getInfoDeposit();
	 },

	 showResult: function() {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = appData.getTargetMonth();
		incomePeriodValue.value = appData.calcPeriod();

		periodSelect.addEventListener('change', function() {
			incomePeriodValue.value = appData.calcPeriod();
		});
	 },

	 addExpensesBlock: function() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	 },

	 addIncomeBlock: function() {
		let cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');

		if(incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	 },

	 getExpenses: function() {
		expensesItems.forEach(function(item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cachExpenses = item.querySelector('.expenses-amount').value;

			if(itemExpenses !== '' && cachExpenses !== '') {
				appData.expenses[itemExpenses] = cachExpenses;
			}
		});
	 },

	 getIncome: function() {
		incomeItems.forEach(function(item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cachIncome = item.querySelector('.income-amount').value;

			if(itemIncome !== '' && cachIncome !== '') {
						appData.income[itemIncome] = cachIncome;
					}
		});

		for(let key in appData.income) {
			appData.incomeMonth +=+ appData.income[key];
		}
	 },

	 getAddExpenses: function() {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach(function(item) {
			item = item.trim();
			if(item !== '') {
				appData.addExpenses.push(item);
			}
		});
	 },

	 getAddIncome: function() {{
		additionalIncomeItems.forEach(function(item) {
			let itemValue = item.value.trim();
			if(itemValue !== '') {
				appData.addIncome.push(itemValue);
			}
		});
	 }},

	getExpensesMonth: function(obj) {
		 for(let key in obj) {
			appData.expensesMonth +=+ obj[key];
		 }
		 return appData.expensesMonth;
	},

	getBudget: function () {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth; 
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},

	getTargetMonth: function () {
		
		let target = Math.ceil(targetAmount.value / appData.budgetMonth);
		
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

	calcPeriod: function() {
		return appData.budgetMonth * periodSelect.value;
	},

	changePeriodTitle: function() {
		periodAmount.innerHTML = periodSelect.value;
	}
};


// console.log('Расходы за месяц - ' + appData.expensesMonth);
// console.log(appData.getTargetMonth());
// console.log(appData.getStatusIncome());
// console.log(appData.calcPeriod());

// let arrAddExpenses = appData.addExpenses.split(',');
// let newArr = [];

// for (let i = 0; i < arrAddExpenses.length; i++) {
// 	 arrAddExpenses[i] = arrAddExpenses[i].trim();

// 	let str = arrAddExpenses[i].charAt(0).toUpperCase() + arrAddExpenses[i].slice(1);
// 	newArr.push(str);
// }

// console.log(newArr.join(', '));


setInterval(function() {
	if(salaryAmount.value === '') {
		startButton.disabled = true;
		startButton.style.opacity = '0.5';
	} else {
		startButton.disabled = false;
		startButton.style.opacity = '1';
	}
}, 100);


startButton.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodTitle);
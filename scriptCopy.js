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
let dataBlock = document.querySelector('.data');
let btnCancel = document.querySelector('#cancel');


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

		this.budget = +salaryAmount.value;


		this.getExpenses();
		this.getAddExpenses();
		this.getExpensesMonth(appData.expenses);
		this.getAddIncome();
		this.getIncome();
		this.getBudget();
		this.showResult();

		let inputCollection = dataBlock.querySelectorAll('input[type=text]');
		let btnCollection = dataBlock.querySelectorAll('.btn_plus');
	
		toggleDisabled(btnCollection);
		toggleDisabled(inputCollection);
	
		startButton.style.display = 'none';
		btnCancel.style.display = 'inline-block';

		// appData.getInfoDeposit();
	 },

	 showResult: function() {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
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
		
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
		this.budgetDay = Math.floor(this.budgetMonth / 30);
	},

	getTargetMonth: function () {
		let target = Math.ceil(targetAmount.value / this.budgetMonth);
		
		if(target > 0) {
			return 'Цель будет достигнута через ' + target + ' месяцев';
		} else {
			return 'Цель не будет достигнута!';
		}
	}, 

	getStatusIncome: function (budgetDay) {

		if (this.budgetDay >= 1200) {
			return ('У вас высокий уровень дохода');
		 } else if ( this.budgetDay < 1200 && this.budgetDay >= 600 ) {
			return 'У вас средний уровень дохода';
		 } else if (this.budgetDay < 0) {
			return 'Беги, братан... Беги...';
		 } else if (this.budgetDay <= 600) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		 } else {
			 return 'Что-то пошло не так';
		 }
	},

	getInfoDeposit: function() {
		if(this.deposit) {
			
			do  {
				this.percentDeposit = prompt('какой годовой процент', '6');
			}
			while( !isNumber(this.percentDeposit) ); 

			do  {
				this.moneyDeposit = prompt('какая сумма заложена', '10000');
			}
			while( !isNumber(this.moneyDeposit) ); 

			
		}
	},

	calcPeriod: function() {
		return this.budgetMonth * periodSelect.value;
	},

	changePeriodTitle: function() {
		periodAmount.innerHTML = periodSelect.value;
	},

	reset: function() {
		let inputCollection = document.querySelectorAll('input[type=text]');
		let btnCollection = document.querySelectorAll('.btn_plus');

		inputCollection.forEach(function(item) {
			item.value = '';
		});

		toggleDisabled(btnCollection);
		toggleDisabled(inputCollection);

		for (let i = 0; i < incomeItems.length; i++) {
			if(i !== 0) incomeItems[i].remove();
			
		}
		
		for (let i = 0; i < incomeItems.length; i++) {
			if(i !== 0) expensesItems[i].remove();
			
		}

		startButton.style.display = 'inline-block';
		this.style.display = 'none';

		expensesPlus.style.display = 'inline-block';
		incomePlus.style.display = 'inline-block';
		
	}

};


setInterval(function() {
	if(salaryAmount.value === '') {
		startButton.disabled = true;
		startButton.style.opacity = '0.5';
	} else {
		startButton.disabled = false;
		startButton.style.opacity = '1';
	}
}, 100);


startButton.addEventListener('click', appData.start.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodTitle);
btnCancel.addEventListener('click', appData.reset);


function toggleDisabled(items) {
	items.forEach(function(item) {
		item.disabled = !item.disabled;
	});
}

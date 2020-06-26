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


const AppData = function() {
	this.income = {};
	this.incomeMonth = 0;
	this.addIncome = [];
	this.expenses = {};
	this.addExpenses = [];
	this.budget = 0;
	this.budgetDay = 0;
	this.budgetMonth = 0;
	this.expensesMonth = 0;
	this.deposit = true;
	this.percentDeposit = 0;
	this.moneyDeposit = 0;
};


const appData = new AppData();

AppData.prototype.start = function() {

	this.budget = +salaryAmount.value;


	this.getExpenses();
	this.getAddExpenses();
	this.getExpensesMonth(this.expenses);
	this.getAddIncome();
	this.getIncome();
	this.getBudget();
	this.showResult();

	let inputCollection = dataBlock.querySelectorAll('input[type=text]');
	let btnCollection = dataBlock.querySelectorAll('.btn_plus');

	this.toggleDisabled(btnCollection);
	this.toggleDisabled(inputCollection);

	startButton.style.display = 'none';
	btnCancel.style.display = 'inline-block';

 };

 AppData.prototype.showResult = function() {
	const _this = this;
	budgetMonthValue.value = this.budgetMonth;
	budgetDayValue.value = this.budgetDay;
	expensesMonthValue.value = this.expensesMonth;
	additionalExpensesValue.value = this.addExpenses.join(', ');
	additionalIncomeValue.value = this.addIncome.join(', ');
	targetMonthValue.value = this.getTargetMonth();
	incomePeriodValue.value = this.calcPeriod();
	periodSelect.addEventListener('change', function() {
		incomePeriodValue.value = _this.calcPeriod();

	});
 };

 AppData.prototype.addExpensesBlock = function() {
	let cloneExpensesItem = expensesItems[0].cloneNode(true);
	expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
	expensesItems = document.querySelectorAll('.expenses-items');
	if(expensesItems.length === 3) {
		expensesPlus.style.display = 'none';
	}
 };

 AppData.prototype.addIncomeBlock = function() {
	let cloneIncomeItems = incomeItems[0].cloneNode(true);
	incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
	incomeItems = document.querySelectorAll('.income-items');

	if(incomeItems.length === 3) {
		incomePlus.style.display = 'none';
	}
 };

 AppData.prototype.getExpenses = function() {
	const _this = this;
	expensesItems.forEach(function(item) {
		let itemExpenses = item.querySelector('.expenses-title').value;
		let cachExpenses = item.querySelector('.expenses-amount').value;
		if(itemExpenses !== '' && cachExpenses !== '') {
			_this.expenses[itemExpenses] = +cachExpenses;
		}
	});
 };

 AppData.prototype.getIncome = function() {
	const _this = this;
	incomeItems.forEach(function(item) {
		let itemIncome = item.querySelector('.income-title').value;
		let cachIncome = +item.querySelector('.income-amount').value;
		if(itemIncome !== '' && cachIncome !== '') {
					_this.income[itemIncome] = +cachIncome;
				}
	});

	for(let key in _this.income) {
		_this.incomeMonth +=+ _this.income[key];
	}
 };

 AppData.prototype.getAddExpenses = function() {
	const _this = this;
	let addExpenses = additionalExpensesItem.value.split(',');
	addExpenses.forEach(function(item) {
		item = item.trim();
		if(item !== '') {
			_this.addExpenses.push(item);
		}
	});
 };

 AppData.prototype.getAddIncome = function() {{
	const _this = this;
	additionalIncomeItems.forEach(function(item) {
		let itemValue = item.value.trim();
		if(itemValue !== '') {
			_this.addIncome.push(itemValue);
		}
	});
 }};

 AppData.prototype.getExpensesMonth = function(obj) {
	const _this = this;
	for(let key in obj) {
	   _this.expensesMonth +=+ obj[key];
	}
	return _this.expensesMonth;
};

AppData.prototype.getBudget = function () {
		
	this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth; 
	this.budgetDay = Math.floor(this.budgetMonth / 30);
	console.log(this.expensesMonth);
};

AppData.prototype.getTargetMonth = function () {
	let target = Math.ceil(targetAmount.value / +this.budgetMonth);
	
	if(target > 0) {
		return 'Цель будет достигнута через ' + target + ' месяцев';
	} else if(target === '' || target === 0) {
		return 'Цель не задана!';
	} else {
		return 'Цель не будет достигнута!';
	}
};


AppData.prototype.calcPeriod = function() {
	return +this.budgetMonth * +periodSelect.value;
};

AppData.prototype.changePeriodTitle = function() {
	periodAmount.innerHTML = periodSelect.value;
};

AppData.prototype.reset = function() {
	let inputCollection = document.querySelectorAll('input[type=text]');
	let btnCollection = document.querySelectorAll('.btn_plus');

	inputCollection.forEach(function(item) {
		item.value = '';
	});

	this.toggleDisabled(btnCollection);
	this.toggleDisabled(inputCollection);

	for (let i = 0; i < incomeItems.length; i++) {
		if(i !== 0) incomeItems[i].remove();
		
	}
	
	for (let i = 0; i < expensesItems.length; i++) {
		if(i !== 0) expensesItems[i].remove();
		
	}

	startButton.style.display = 'inline-block';
	btnCancel.style.display = 'none';

	expensesPlus.style.display = 'inline-block';
	incomePlus.style.display = 'inline-block';

	 this.income = {};
	 this.incomeMonth = 0;
	 this.addIncome = [];
	 this.expenses = {};
	 this.addExpenses = [];
	 this.budget = 0;
	 this.budgetDay = 0;
	 this.budgetMonth = 0;
	 this.expensesMonth = 0;
	 this.deposit = true;
	 this.percentDeposit = 0;
	 this.moneyDeposit = 0;
	
};

AppData.prototype.toggleDisabled = function(items) {
	items.forEach(function(item) {
		item.disabled = !item.disabled;
	});
};

AppData.prototype.toggleBlockButton = function() {
	setInterval(function() {
		if(salaryAmount.value === '') {
			startButton.disabled = true;
			startButton.style.opacity = '0.5';
		} else {
			startButton.disabled = false;
			startButton.style.opacity = '1';
		}
	}, 100);
};

AppData.prototype.eventsListeners = function() {
	startButton.addEventListener('click', this.start.bind(this));
	expensesPlus.addEventListener('click', this.addExpensesBlock);
	incomePlus.addEventListener('click', this.addIncomeBlock);
	periodSelect.addEventListener('input', this.changePeriodTitle);
	btnCancel.addEventListener('click', this.reset.bind(this));
};


appData.toggleBlockButton();
appData.eventsListeners();



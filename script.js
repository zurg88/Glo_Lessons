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
let depositBank = document.querySelector('.deposit-bank');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let depositCheck = document.getElementById('deposit-check');

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


const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

function isString(data) {
	if(typeof(data === 'string' || data !== '' || typeof(data) !== null)) {
	   return true;
	} else {
		return false;
	}
}


class AppData {
	constructor() {
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
	}

	start () {

		this.budget = +salaryAmount.value;
		this.getExpenses();
		this.getAddExpenses();
		this.getExpensesMonth(this.expenses);
		this.getAddIncome();
		this.getIncome();
		this.getInfoDeposit();
		this.getBudget();
		this.showResult();
	
		let inputCollection = dataBlock.querySelectorAll('input[type=text]');
		let btnCollection = dataBlock.querySelectorAll('.btn_plus');
	
		this.toggleDisabled(btnCollection);
		this.toggleDisabled(inputCollection);
	
		startButton.style.display = 'none';
		btnCancel.style.display = 'inline-block';
	 }

	 showResult () {
		
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = this.getTargetMonth();
		incomePeriodValue.value = this.calcPeriod();
		periodSelect.addEventListener('change', () => {
			incomePeriodValue.value = this.calcPeriod();
	
		});
	 }

	 addExpensesBlock () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if(expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	 }

	 addIncomeBlock () {
		let cloneIncomeItems = incomeItems[0].cloneNode(true);
		incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
		incomeItems = document.querySelectorAll('.income-items');
	
		if(incomeItems.length === 3) {
			incomePlus.style.display = 'none';
		}
	 }

	 getExpenses () {
		expensesItems.forEach((item) => {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cachExpenses = item.querySelector('.expenses-amount').value;
			if(itemExpenses !== '' && cachExpenses !== '') {
				this.expenses[itemExpenses] = +cachExpenses;
			}
		});
	 }

	 getIncome () {
		incomeItems.forEach((item) => {
			let itemIncome = item.querySelector('.income-title').value;
			let cachIncome = +item.querySelector('.income-amount').value;
			if(itemIncome !== '' && cachIncome !== '') {
						this.income[itemIncome] = +cachIncome;
					}
		});
	
		for(let key in this.income) {
			this.incomeMonth +=+ this.income[key];
		}
	 }

	 getAddExpenses () {
		let addExpenses = additionalExpensesItem.value.split(',');
		addExpenses.forEach((item) => {
			item = item.trim();
			if(item !== '') {
				this.addExpenses.push(item);
			}
		});
	 }

	 getAddIncome () {{
		additionalIncomeItems.forEach((item) => {
			let itemValue = item.value.trim();
			if(itemValue !== '') {
				this.addIncome.push(itemValue);
			}
		});
	 }}
	
	 getExpensesMonth (obj) {
		const _this = this;
		for(let key in obj) {
		   _this.expensesMonth +=+ obj[key];
		}
		return _this.expensesMonth;
	}
	
	getBudget () {
		const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
		this.budgetMonth = this.budget + this.incomeMonth + monthDeposit - this.expensesMonth; 
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		console.log(this.expensesMonth);
	}
	
	getTargetMonth  () {
		let target = Math.ceil(targetAmount.value / +this.budgetMonth);
		
		if(target > 0) {
			return 'Цель будет достигнута через ' + target + ' месяцев';
		} else if(target === '' || target === 0) {
			return 'Цель не задана!';
		} else {
			return 'Цель не будет достигнута!';
		}
	}
	
	calcPeriod () {
		return +this.budgetMonth * +periodSelect.value;
	}
	
	changePeriodTitle () {
		periodAmount.innerHTML = periodSelect.value;
	}

	getInfoDeposit () {
		if(this.deposit) {
			this.percentDeposit = depositPercent.value;
			this.moneyDeposit = depositAmount.value;			
		}
	}

	changePercent () {
		const valueSelect = this.value;
		if(valueSelect === 'other') {
			depositPercent.style.display = 'inline-block';
			
			depositPercent.addEventListener('change', () => {
				if(!isNumber(+depositPercent.value) || depositPercent.value > 100 || depositPercent < 0) {
								alert('!');
								depositPercent.value = '';

								startButton.disabled = true;
								startButton.style.opacity = '0.5';
				} else {
					startButton.disabled = false;
								startButton.style.opacity = '1';
				}
				
			});
			

		} else {
			depositPercent.value = valueSelect;
		}
	}

	depositHandler () {
		if(depositCheck.checked) {
			depositBank.style.display = 'inline-block';
			depositAmount.style.display = 'inline-block';
			this.deposit = true;
			depositBank.addEventListener('change', this.changePercent);
		} else {
			depositBank.style.display = 'none';
			depositAmount.style.display = 'none';
			depositBank.value = '';
			depositAmount.value = '';
			this.deposit = false;
			depositBank.removeEventListener('change', this.changePercent);
		}
	}
	
	reset () {
		let inputCollection = document.querySelectorAll('input[type=text]');
		let btnCollection = document.querySelectorAll('.btn_plus');
	
		inputCollection.forEach((item) => {
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

		depositAmount.style.display = 'none';
	
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
		 periodSelect.value = 0;
		 periodAmount.innerHTML = 0;
		 depositBank.value = '';
		
	}
	
	toggleDisabled (items) {
		items.forEach((item) => {
			item.disabled = !item.disabled;
		});
	}
	
	toggleBlockButton () {
		setInterval(() => {
			if(salaryAmount.value === '') {
				startButton.disabled = true;
				startButton.style.opacity = '0.5';
			} else {
				startButton.disabled = false;
				startButton.style.opacity = '1';
			}
		}, 100);
	}
	
	eventsListeners () {
		startButton.addEventListener('click', this.start.bind(this));
		expensesPlus.addEventListener('click', this.addExpensesBlock);
		incomePlus.addEventListener('click', this.addIncomeBlock);
		periodSelect.addEventListener('input', this.changePeriodTitle);
		btnCancel.addEventListener('click', this.reset.bind(this));
		depositCheck.addEventListener('change', this.depositHandler.bind(this));
	}
	
}

const appData = new AppData();

appData.toggleBlockButton();
appData.eventsListeners();



let money = 10000;
let	income = 'Профессионально садится на катусы';
let	addExpenses = 'коммуналка, ТО автомобиля, кофе, уксус';
let	deposit = true;
let	mission = 1000000;
let	period = 8;
let budgetDay = money / 30;


console.log( typeof(money) );
console.log( typeof(income) );
console.log( typeof(deposit) );

console.log(addExpenses.length);

console.log( 'Период равен ' + period + ' месяцев' );

console.log( addExpenses.toLocaleLowerCase().split(', ') );

console.log(budgetDay);
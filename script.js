'use strict';


class First {
	constructor(str) {
		this.str = 'Привет я метод родителя!';
	}

	hello() {
		console.log(this.str);
	}
}

class Second extends First {
	constructor (str) { 
		super(str);
		this.newStr = 'А я наследуемый метод!';
	}

	hello() {
		super.hello();
		this.secondHello();
	}

	secondHello () {
		console.log(this.newStr);
	}
}

let consoleStr = new Second();

consoleStr.hello();


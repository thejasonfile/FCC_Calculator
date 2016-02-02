var numberArr = [];
var operatorArr = [];
var num = '';

var getValue = function() {
	if ($("#display").val() % 1 === 0) {
			return parseInt($("#display").val());
		} else {
			return parseFloat($("#display").val());
		}
}

var add = function(a,b) {
	return a+b;
}

var subtract = function(a,b) {
	return a-b;
}

var multiply = function(a,b) {
	return a*b;
}

var divide = function(a,b) {
	return a/b;
}

var percent = function(a,b) {
	var decimal = b / 100;
	result = a * decimal;
	$("#display").val(result);
}

var allClear = function() {
	numberArr = [];
	operatorArr = [];
	displayClear();
}

var displayClear = function() {
	$("#display").val('');
	num = '';
}

//when number is pressed
	$(".number").click(function() {
		//update display
		num += $(this).attr('id')
		$("#display").val(num);
	})
	
//when operator is pressed
	$(".operator").click(function() {
		//get the display value
		var displayVal = getValue();
		//add value to numberArr unless it was the % button
		if ($(this).attr('id') !== 'percent') {
		numberArr.push(displayVal);			
		}
		//clear display value and number
		displayClear();
		//add operator to operatorArr
		switch ($(this).attr('id')) {
			case 'add':
				operatorArr.push(add);
				break;
			case 'subtract':
				operatorArr.push(subtract);
				break;
			case 'multiply':
				operatorArr.push(multiply);
				break;
			case 'divide':
				operatorArr.push(divide);
				break;
			case 'percent':
				percent(displayVal, numberArr[numberArr.length-1]);		
		}
	})

//when equal is pressed
	$("#equal").click(function() {
		//get the display value
		var displayVal = getValue();
		//add value to numberArr
		numberArr.push(displayVal);
		//clear display value and number
		displayClear();
		//repeat performing first operation on first two numbers until only one number left
		while (numberArr.length > 1) {
			//perform first operator in operatorArr on first two numbers in numberArr
			var result = operatorArr[0](numberArr[0],numberArr[1]);
			//remove first two numbers from numberArr
			numberArr.splice(0,2);
			//add result of operation as first number in numberArr
			numberArr.splice(0,0,result);
			//remove first operator from operatorArr
			operatorArr.splice(0,1);
		} 			
		//display this final number as result of all operations
		$("#display").val(result);
		//clear the arrays
		operatorArr = [];
		numberArr = [];
	})

//when AC is pressed
	$("#allClear").click(allClear);

//when CE is pressed
	$("#clearEntry").click(displayClear);
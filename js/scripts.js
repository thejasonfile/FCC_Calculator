var numberArr = [];
var operatorArr = [];
var num = '';

var add = function(a,b) {
	return a+b;
}

//when number is pressed
	$(".number").click(function() {
		//update display
		num += $(this).attr('id')
		$("#display").val(num);
	})
	
//when operator is pressed
	$(".operator").click(function() {
		//get display value and convert to interger
		var displayVal = parseInt($("#display").val());
		//add value to numberArr
		numberArr.push(displayVal);
		//clear display value and number
		$("#display").val('');
		num = '';
		//add operator to operatorArr
		switch ($(this).attr('id')) {
			case 'add':
				operatorArr.push(add);
				break;
		}
	})

//when equal is pressed
	$("#equal").click(function() {
		//get display value
		var displayVal = $("#display").val();
		//add value to numberArr
		numberArr.push(displayVal);
		//clear display value and number
		$("#display").val('');
		num = '';
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
	})
	


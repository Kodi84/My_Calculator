$(document).ready(apply_click_handlers);
var storage_array = [];
var old_operator=[];
var second_number = [];
function apply_click_handlers (){
    $('.number').click(button_click);
    $('.operator').click(operator_click);
    $('.equal_button').click(equal_button);
    $('.button_decimal').click(decimal);
    $('.ce_button').click(clear_everything_button);
}
//when button is clicked
function button_click (){
    var numbers_value = $(this).val(); //get value of button click(numbers)
     //append number value into display
    var last_index = storage_array.length-1;
        if (!isNaN(storage_array[last_index])){//if last index of array IS A NUMBER
            if(storage_array[last_index] === 0){
                storage_array[last_index] = numbers_value;
            }else {
                storage_array[last_index] += numbers_value; // YES: ADD INTO ARRAY
            }
        }else {
            storage_array.push(numbers_value);// IF NO: PUSH INTO ARRAY
        }
    // }
    display();
}
//set up flag
var already_have_decimal = false;

function decimal (){
    var decimal = $(this).val();
    var last_index = storage_array.length-1;
    if (already_have_decimal){
        return;
    }else {
        storage_array[last_index]+=decimal; // put decimal into storage_array at last index
        already_have_decimal = true;
        display();
    }
}
var operator_value;
var last_index = storage_array.length-1;
function operator_click( ) {
    operator_value = $(this).val();
    if (storage_array.length >= 3){ //successive operator
        if(operator_value === "+" || operator_value === "-") {
            equal_button();
        }else{
            old_operator = storage_array[1];
            second_number = storage_array[0];
            storage_array.splice(0,2);
        }
    }

    last_index = storage_array.length-1;
    if (!isNaN(storage_array[last_index])){ // check if there is number in the last array
        storage_array.push(operator_value);//push value into array
    }
    else {
        storage_array[last_index] = operator_value;
    }
    display();
    already_have_decimal = false;
}
function equal_button() {
    if (storage_array.length === 2){ //operation repeat
        storage_array[2] = storage_array[0];
    }
    if(storage_array.length<3){
        if(old_operator!== null && second_number!== null){
            storage_array[1]=old_operator;
            storage_array[2]=second_number;
        }else{
            var zero = do_math();
            storage_array[0] = zero;
            display();
        }
    }
    if(storage_array.length===3) {
        var result = do_math();
        storage_array[0] = result; //assign result at index 0 helps whenever you click = button again it will automatically do math with WHATEVER NUMBER AT INDEX 2 !!
        old_operator = storage_array[1];
        second_number = storage_array[2];
        var last_index = storage_array.length-1;

        storage_array.splice(last_index - 1, 2);
        display();
    }
}
function display(){
    var new_display = storage_array.join("");
    $('.display').text(new_display);
}

function do_math(num1,operator,num2) {
    num1 = parseFloat(storage_array[0]);
    num2 = parseFloat(storage_array[2]);
    operator = storage_array[1];
    if (isNaN(num1) && isNaN(num2)) {
        return 0;
    }
    else if(!isNaN(num1) && isNaN(num2)){
        return num1;
    }else {
        if (operator === "+") {
            return num1 + num2;
        } else if (operator === "-") {
            return num1 - num2;
        } else if (operator === "*") {
            return num1 * num2;
        } else if (operator === "/") {
            if (num2 === 0) {
                return "Error";
            } else
                return num1 / num2;
        }
    }
}
//when C button clicked
function clear_everything_button() {
    storage_array=[];
    old_operator=null;
    second_number=null;
    display();
    already_have_decimal = false;
}

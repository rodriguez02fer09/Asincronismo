// callback es cuando creamos una funcion y le pasamos como parametro otra funcion.

function sum ( num1, num2){
    return num1 + num2;
}

function cal (num1 , num2 , callback){ //al callback se le puede poner cualquier nombre 
    return callback (num1 , num2);
}
console.log (cal(2 ,2 , sum))


function date (callback){
    console.log (new Date);
    setTimeout(function (){
        let  date = new Date;
        callback(date)
    },3000)
}

function printDate (dateNow){
    console.log(dateNow)
}
date (printDate)
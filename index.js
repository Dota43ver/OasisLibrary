function laCajaDePandora(numero){
    if(numero%2){
    var dec = numero.toString(2)
    return dec
    } 
    else{
    let sum = 0;
    
    for (let i = 0; i < num.length; i++) {
        sum += +num[i] * 2 ** (num.length - 1 - i);
     }
      return sum;
    }
}

  
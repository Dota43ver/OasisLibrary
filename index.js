function laCajaDePandora(numero){
    if(numero%2 === 0) {
        let binario = [];
        do {
            binario.unshift(numero%2);
            numero = Math.floor(numero/2);
        } while (numero > 0)
        return binario.join("");
    } else {
        return numero.toString(16).toUpperCase();
    }
    }
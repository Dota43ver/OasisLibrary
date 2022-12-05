function laCajaDePandora(numero){
    // proximamente escribiremos codigo aqui
        let resultado;
        if (numero % 2 === 0) {
            resultado = numero.toString(2);
        } else {
            resultado = numero.toString(16);
        }
        return resultado;
    }
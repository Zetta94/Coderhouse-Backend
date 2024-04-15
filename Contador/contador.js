class Contador {
    static contadorGlobal = 0

    constructor(responsable){
        this.responsable = responsable
        this.contadorIndividual = 0
    }

    getResponsable(){
        return this.responsable
    }

    contar(){
        this.contadorIndividual++
        Contador.contadorGlobal++
    }

    getCuentaIndividual(){
        return this.contadorIndividual
    }

    getCuentaGlobal(){
        return Contador.contadorGlobal
    }

}

const counter = new Contador("Manuel");
console.log(counter)
console.log("contador individual: " + counter.getCuentaIndividual())
console.log("contador global: " + counter.getCuentaGlobal())
counter.contar()
console.log("contador individual: " + counter.getCuentaIndividual())
console.log("contador global: " + counter.getCuentaGlobal())
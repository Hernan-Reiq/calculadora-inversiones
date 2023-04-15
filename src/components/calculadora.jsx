function Calculadora(inversion, interes, meses, cantidad, reinversion, capitalizable) {
    var arrayResults = [];
    var interesMensual = (interes / 100) / 12;
    var resultado = 0;

    var acuCapital = 0;
    var acuInteresGenerado = 0;
    var acuInteresRecibido = 0;

    for (var i = 0; i < meses; i++) {
        if (i === 0) {//En el primer mes se define la inversion
            resultado = inversion;
        }

        if ((i % (cantidad)) === 0 && i > 0) {//Determinar si hay que hacer reinversion
            resultado += reinversion;
        }

        var calcularInteresGanadoEsteMes = resultado * interesMensual; //Ganancias obtenidas este mes

        if (capitalizable) {
            resultado = resultado + (calcularInteresGanadoEsteMes * 0.9);
        }

        acuInteresGenerado += calcularInteresGanadoEsteMes;
        acuInteresRecibido += (calcularInteresGanadoEsteMes * 0.9);
        if (i === (meses - 1)) {
            acuCapital = resultado;
        }

        arrayResults.push({
            mes: i + 1,
            capital: FormatNumber(resultado),
            interesesGenerado: FormatNumber(calcularInteresGanadoEsteMes),
            interesesRecibido: FormatNumber(calcularInteresGanadoEsteMes * 0.9),
            acuInteresGenerado: FormatNumber(acuInteresGenerado),
            acuInteresRecibido: FormatNumber(acuInteresRecibido),
            acuCapital: FormatNumber(acuCapital)
        })
    }
    return arrayResults;
}

function FormatNumber(number) {
    number = number.toFixed(2)
    number += '';
    var x = number.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1,$2');
    }
    return (x1 + x2);
}

export default Calculadora;
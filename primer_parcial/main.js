// Arreglo para llevar el "Id" de cada timer y no parar el timer erroneo.
let timeId = new Array(6);

const turn = (n) =>{
    
    let img = document.getElementById(`mesa${n}`);
    let hora_incio = document.getElementById(`mesa${n}_hora_inicio`);

    if(img.src.match("mesaOff")){
        img.src = "resources/mesaOn.jpg"
        let fecha_inicio = reloj();
        hora_incio.innerHTML = "Hora de Inicio: "+fecha_inicio;
        document.getElementById(`mesa${n}_total`).innerHTML = "Total: 0";
        realReloj(n,fecha_inicio);
    }else{
        img.src = "resources/mesaOff.jpg";
        // Para detener el timer correcto.
        clearTimeout(timeId[n-1]);
    }
}

//Función que retorna un String con la hora
const reloj = () => {

    momentoActual = new Date();
    hora = momentoActual.getHours();
    minuto = momentoActual.getMinutes();
    segundo = momentoActual.getSeconds();

    str_segundo = new String (segundo);
    if (str_segundo.length == 1) segundo = "0" + segundo;

    str_minuto = new String (minuto)
    if (str_minuto.length == 1) minuto = "0" + minuto;

    str_hora = new String (hora)
    if (str_hora.length == 1) hora = "0" + hora;

    horaImprimible = hora + " : " + minuto + " : " + segundo;
    return horaImprimible;
}

//Para actualizar el reloj y el total a pagar
const realReloj = (n,hora_incio) => {
    
    let hora_final = document.getElementById(`mesa${n}_hora_final`);
    hora_final.innerHTML = "Hora de Final: "+reloj();

    let total = document.getElementById(`mesa${n}_total`);

    timeId[n-1] = setTimeout(realReloj,100,n,hora_incio);
    total.innerHTML = `Total: $${aPagar(hora_incio,reloj())}`;
    //console.log(timeId);
}

//Esta función transforma la hora a segundos y retorna el total a pagar.
const aPagar = (fecha_inicio,fecha_final) =>{
    let horaFinal = fecha_final.split(":");
    let horaInicio = fecha_inicio.split(":");

    let delta = 0;

    delta += (parseInt(horaFinal[0]) - parseInt(horaInicio[0]))*3600;
    delta += (parseInt(horaFinal[1]) - parseInt(horaInicio[1]))*60;
    delta += (parseInt(horaFinal[2]) - parseInt(horaInicio[2]));

    delta /= 3600;
    delta *= 50; //Se cobra $50.00 por hora.
    delta = delta.toFixed(4);

    return delta;
}

function obtenerval(id){
    return document.getElementById(id).value;
}
function obtenerelm(id){
    return document.getElementById(id);
}
function ponerval(id,val){
    document.getElementById(id).value = val;
    return console.log("agregado");
}
function pre(){
    var f = new Date();
    var fecha = obtenerelm("fecha");
    ponerval("fecha",f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
    console.log("fecha leida");
}
function cambio(){
    var fecha = obtenerelm("fecha");
    return fecha.readOnly=!fecha.readOnly;
}
function agregarD(){
    var x = document.getElementById("cuenta").value;
    console.log(document.getElementById("cuenta"));
    console.log(x);
    var valor = document.getElementById("valor").value;
    var tipo;
    if(document.getElementById("pos1").checked){
        tipo = document.getElementById("pos1").value;
    }else{
        tipo = document.getElementById("pos2").value;
    }

    fecha=document.getElementById("fecha").value;
    var cont = document.getElementById("contenido");

    //se toman los valores descritos dentro de la etiqueta con los id: debet, y habert que corresponden a las celdas donde estan estos totales
    var t1 = document.getElementById("debet").innerHTML;
    var t2 = document.getElementById("habert").innerHTML;
    //pero como estos tienen el signo $ hay que separar los numeros del signo $ para poder sumarlos o restarlos
    var nt1 = parseFloat(t1.substring(1));//t1.substring() toma una parte de una cadena esta vez empezando del caracter 1 ya que el caracter 0 es el signo "$"
    var nt2 = parseFloat(t2.substring(1));//y ademas se debe convertir lo que queda en un numero, por eso usamos parseFloat() para convertirlo en numero con decimales

    var resp  = cont.innerHTML ;
    if(tipo=="debe"){
        resp+= "<tr> <td>"+ x + "</td>";
        resp+= "<td>$" + valor + " </td> <td></td> ";
        nt1 += parseFloat(valor);//cuando es el debe el que se agrego se suma al total numerico del debe
        
    }else{
        resp += "<tr> <td style='text-align: center;' > "+ x + "</td>";
        resp+= "<td></td> <td>$" + valor + " </td> ";
        nt2+=parseFloat(valor);//si no es el debe entonces se suma en el total del haber
    }
//se inserta el resultado junto con el signo $ dentro de la etiqueta con el id debet, y habert (igual que arriba pero esta vez escribimos dentro en lugar de tomarlo)
    document.getElementById("debet").innerHTML = "$"+ nt1;
    document.getElementById("habert").innerHTML = "$"+ nt2;

    cont.innerHTML = resp;
}
function guardarD(){
    document.getElementById("contenido").innerHTML="";
    document.getElementById("debet").innerHTML = "$0.00";
    document.getElementById("habert").innerHTML = "$0.00";
}

function agregarM(){
    var x = document.getElementById("cuenta").value;
    var valor = document.getElementById("valor").value;
    var partida = document.getElementById("partida").value;
    var descripcion = document.getElementById("Descripcion").value;
    var tipo;
    if(document.getElementById("debe").checked){
        tipo = document.getElementById("debe").value;
    }else{
        tipo = document.getElementById("haber").value;
    }

    var total;
    var aux = document.getElementById("mayor").rows.length;
    if(aux >1){
        total = parseFloat(document.getElementById("mayor").rows[aux-1].cells[4].innerHTML);
    }else{
        total = 0;
    }
    if(document.getElementById("cuenta").options[0].text == x || document.getElementById("cuenta").options[2].text == x ){
        if(tipo=="debe"){
            total+=parseFloat(valor);
        }else{
            total -=parseFloat(valor);
        }
    }else{
        if(tipo=="debe"){
            total-=parseFloat(valor);
        }else{
            total += parseFloat(valor) ;
        } 
    }
    var contenido = document.getElementById("contenido").innerHTML;
    contenido += "<tr> <td>"+partida+"</td> <td>"+descripcion+"</td>";
    if(tipo=="debe"){
        contenido += "<td>"+valor+"</td><td></td><td>"+total+"</td>";
    }else{
        contenido += "<td></td><td>"+valor+"</td><td>"+total+"</td>";
    }
    document.getElementById("contenido").innerHTML=contenido;

}

function guardarM(){
    document.getElementById("contenido").innerHTML=" ";

}
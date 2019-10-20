
function agregar(){
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
    
    var resp  = cont.innerHTML ;
    if(tipo=="debe"){
        resp+= "<tr> <td>"+ x + "</td>";
        resp+= "<td>$" + valor + " </td> <td></td> ";
    }else{
        resp += "<tr> <td style='text-align: center;' > "+ x + "</td>";
        resp+= "<td></td> <td>$" + valor + " </td> ";
    }
    cont.innerHTML = resp;
}
function guardar(){
    document.getElementById("contenido").innerHTML="";
}
//#######################################################################base de datos###############################
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyCdc_iMRBuXbopWPGmLkw4yQgkRved2OuE",
    authDomain: "contables-4627e.firebaseapp.com",
    databaseURL: "https://contables-4627e.firebaseio.com",
    projectId: "contables-4627e",
    storageBucket: "contables-4627e.appspot.com",
    messagingSenderId: "705297826097",
    appId: "1:705297826097:web:ff82c27ece31613afcb010"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//######################################################################################################

//#######################################################################funciones auxiliares###############################
function obtenerval(id){
    return document.getElementById(id).value;
}
function obtenerelm(id){
    return document.getElementById(id);
}
function obtenerdentro(id){
    return document.getElementById(id).innerHTML;
}
function ponerval(id,val){
    document.getElementById(id).value = val;
    return console.log("agregado");
}
function ponerdentro(id,val){
    document.getElementById(id).innerHTML = val;
    return console.log("agregado");
}
//######################################################################################################

function pre(){
    var f = new Date();
    var fecha = obtenerelm("fecha");
    ponerval("fecha",f.getFullYear() + "-" + (f.getMonth() +1) + "-" + f.getDate());
    console.log("fecha leida");
    var cuenta = obtenerelm("cuenta");
    var x;
    var bd = firebase.database().ref("Cuentas");
    console.log("esta es la cuenta:"+cuenta);
    var op;
    bd.once("value",function(snap){
        var aux = snap.val();
        for(var doc in aux){
            console.log(doc);
            op = document.createElement("option");  
            op.disabled= true;
            op.text=doc;
            op.value=doc;
            op.style = "color:red; font-weight: bolder;";
            cuenta.add(op);
             x = aux[doc];
            for(var data in x){         
                console.log(data);
                op = document.createElement("option");    
                op.disabled= false;            
                op.text= data;
                op.value= x[data];
                cuenta.add(op);
            }
        }
    });
}
function pre2(){
    var lista = obtenerelm("partida");
    var op;
    var bd = firebase.database().ref("LDiario");
    bd.once("value",function(snap){
        var aux = snap.val();
        var comp= 1;
        for(var doc in aux){
            if(comp!=doc.substring(0,7)){
                op=document.createElement("option");
                op.text=doc.substring(0,7);
                op.value =doc.substring(0,7);
                lista.add(op);
                comp = doc.substring(0,7);
            }
        }

    });
}
function cambio(){
    var fecha = obtenerelm("fecha");
    return fecha.readOnly=!fecha.readOnly;
}

function agregarD(){
    var detax = document.getElementById("cuenta").options.selectedIndex;
    var x = document.getElementById("cuenta").options.item(detax).text;

    console.log(document.getElementById("cuenta"));
    console.log(x);
    if(obtenerval("valor").length>0 && parseFloat(obtenerval("valor")) > 0 ){
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
    }else{
      //  showNotification('top','center',"debe agregar el valor que se esta cargando/abonando");
        alert("debe agregar el valor que se esta cargando/abonando");
    }
    
}
//##############################################################guardar en la bd
function guardarD(){
   
    if(obtenerdentro("debet")==obtenerdentro("habert") && obtenerdentro("debet")!="$0.00" && obtenerdentro("habert")!="$0.00" ){
        if(obtenerval("descripcion").length>0){
            var bd = firebase.database().ref("LDiario");
            bd.once("value", function(snap){
                console.log("consulta!");
                var aux = snap.val();
                var n= 1;
                var id=000001;
                for(var doc in aux){
                    console.log(doc.substring(0,10));
                    console.log("jaja "+obtenerval("fecha"));
                    if(doc.substring(0,10)==obtenerval("fecha")){
                       n++; 
                    }
                }
                id=obtenerval("fecha")+": px"+n;
                var Obj = new Object();
                Obj["fecha"]=obtenerval("fecha");
                Obj["descripcion"]=obtenerval("descripcion");
                var tabla = obtenerelm("detalles");
                var detalle="";
                //console.log(tabla);
                for(var i=1; i<tabla.rows.length-1;i++){
                   detalle+= tabla.rows[i].cells[0].innerHTML;
                    if(tabla.rows[i].cells[1].innerHTML.length>0){
                        detalle+=" D:"+tabla.rows[i].cells[1].innerHTML;
                    }else{
                        detalle+=" H:"+tabla.rows[i].cells[2].innerHTML;
                    }
                    detalle+=";";
                }
                detalle+="|";
                Obj["detalles"]=detalle;
                console.log(Obj);
                bd.child(id).set(Obj);
                console.log("guardado!");
                alert("agregado");
                document.getElementById("contenido").innerHTML="";
                document.getElementById("debet").innerHTML = "$0.00";
                document.getElementById("habert").innerHTML = "$0.00";
                ponerval("descripcion"," ");
                ponerval("valor"," ");
        
            } );        
        }else{
            alert("falta la descripcion de la partida");
        }
    }else{
        alert("falta alguna cuenta la suma del debe y haber debe ser igual");
    }


}
//#########################################################################################################################################
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
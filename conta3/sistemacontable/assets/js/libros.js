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
           // console.log(doc);
            if(comp!=doc.substring(0,7) && doc!= "partidas"){
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
        resp+= "<tr> <td>"+obtenerval("cuenta") + " "+ x  +"</td>";
        resp+= "<td>$" + valor + " </td> <td></td> ";
        nt1 += parseFloat(valor);//cuando es el debe el que se agrego se suma al total numerico del debe
    }else{
        resp += "<tr> <td style='text-align: center;' > "+obtenerval("cuenta") + " "+ x +"</td>";
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
                    if(doc.substring(0,7)==obtenerval("fecha").substring(0,7)){
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
                    if(tabla.rows[i].cells[0].innerHTML[0]==" "){
                        tabla.rows[i].cells[0].innerHTML=tabla.rows[i].cells[0].innerHTML.substring(1);
                    }
                   detalle+= tabla.rows[i].cells[0].innerHTML;
                    if(tabla.rows[i].cells[1].innerHTML.length>0){
                        detalle+="-D:"+tabla.rows[i].cells[1].innerHTML;
                    }else{
                        detalle+="-H:"+tabla.rows[i].cells[2].innerHTML;
                    }
                    if(detalle[detalle.length-1]==" "){
                        detalle = detalle.substring(0,detalle.length-1);
                    }
                    if(i+1!=tabla.rows.length-1){
                        detalle+=";";
                    }
                    
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
function filltabla(col,arreglo,mayor=0){
    var tabla="";
    var x;
    tabla="<tr>";
    for(var i=0;i<col;i++){
        x= arreglo[i];
        if(mayor && i==col-1){
           x= "$"+arreglo[i];
        }
        tabla+="<td>"+x+"</td>";
        
    }
    tabla+="</tr>";
    return tabla;
    
}
function cargarc(){
    //lista.innerHTML= " ";
    var id = obtenerval("partida");
    var op;
    var lista = obtenerelm("cuenta");
    lista.innerHTML= " ";
    var detax;
    var sep = ";";
    var comp = new Array();
    var compax = true;
    var bd = firebase.database().ref("LDiario");
    bd.once("value",function(snap){
        var aux = snap.val();
        for(var doc in aux){
            sep = ";";
            var x = aux[doc];
            if(doc.substring(0,7)==id){
                console.log(x["descripcion"]);
                detax=x["detalles"];
                var indices = [];
                for(var i = 0; i < detax.length; i++) {
                    if (detax[i] === ";") indices.push(i);
                }
                var de = detax.substring(0,detax.search(";"));
                console.log(de+" "+indices.length);
                for(var j =0; j<=indices.length;j++){

                    console.log(j+ " de "+indices.length);
                    if(detax.indexOf(sep)==-1){
                        console.log("fin");
                        sep="|";
                    }
                    de = detax.substring(0,detax.indexOf(sep));
                    console.log("la cuenta se llama "+ de.substring(de.indexOf(" "),de.search("-")));
                    detax = detax.substring(detax.indexOf(sep)+1);

                    op = document.createElement("option");
                    op.text = de.substring(de.indexOf(" "),de.search("-"));
                    op.value = de.substring(0,de.indexOf(" "));
                    for(var k=0;k<comp.length;k++){
                        console.log(k+" k de "+comp.length);
                        if(comp[k]==de.substring(de.indexOf(" "),de.search("-"))){
                            console.log("repetido");
                            compax=false;
                            k=comp.length;
                        }
                    }
                    if(compax){
                        lista.add(op);
                        console.log("agrega");
                        comp.push(de.substring(de.indexOf(" "),de.search("-")));
                        
                    }else{
                        console.log("recuperado");
                        compax=true;
                    }
                    
                }     
            }
        }
    });
}
function cargar(){
    var id = obtenerval("partida");
    var bd = firebase.database().ref("LDiario");
    var cuenta = obtenerval("cuenta");
    var tbl="";
    var ax;
    var arr = new Array(4);
    var detax;
    //contenido
    bd.once("value",function(snap){
        var aux = snap.val();
        var n = 1;
        var sep = ";";
        arr[4]=0;
        for(var data in aux){
            ax=aux[data];
            
            sep=";";
            if(data.substring(0,7)==id){
                console.log(ax);
                detax = ax["detalles"];

                var indices = [];
                for(var i = 0; i < detax.length; i++) {
                    if (detax[i] === ";") indices.push(i);
                }
                var de = detax.substring(0,detax.search(";"))
               
                for(var j =0; j<=indices.length;j++){
                    console.log(de.substring(0,de.indexOf(" "))+" con "+cuenta);
                    
                    if(detax.indexOf(sep)==-1){
                        console.log("fin");
                        sep="|";
                    }
                    de = detax.substring(0,detax.indexOf(sep));
                    if(de.substring(0,de.indexOf(" "))==cuenta){
                    console.log(detax);
                                     //arr[0]=n;
                                     arr[0]=data.substring(data.indexOf("x")+1);
                                     arr[1]=ax["descripcion"];                    
                    var type;
                    console.log(de);
                    if(de.substring(0,1)=="1"){
                        type=1;
                        console.log("es cuenta de activo");
                    }else if(de.substring(0,1)=="2"){
                        type=2;
                        console.log("es cuenta de pasivo");
                    }
                    console.log("la cuenta se llama "+ de.substring(de.indexOf(" "),de.search("-")));
                    var pos = de.substring(de.search("-")+1,de.search("-")+2);
                    
                    console.log(de.search(":")+1);
                    var val = de.substring(de.search(":")+1,de.length);
                    if(pos=="D"){
                        console.log(pos+" esta en el debe");
                        arr[2]=val;arr[3]="$0.00";
                        if(type==1){
                            arr[4]+= parseFloat(val.substring(1));
                        }else{
                            arr[4]-= parseFloat(val.substring(1));
                        }

                    }else{
                        console.log(pos+" esta en el haber");
                        arr[3]=val;arr[2]="$0.00";
                        if(type==2){
                            arr[4]+= parseFloat(val.substring(1));
                        }else{
                            arr[4]-= parseFloat(val.substring(1));
                        }
                    }
                    console.log("la cantidad es "+val);
                    tbl+= filltabla(5,arr,1);
                    n++
                    }
                    console.log("final");
                    detax = detax.substring(detax.indexOf(sep)+1);
                    de = detax.substring(0,detax.indexOf(sep));
                }                  
            }
        }
        ponerdentro("contenido",tbl);
    });
}


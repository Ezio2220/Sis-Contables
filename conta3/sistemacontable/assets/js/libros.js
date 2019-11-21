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

//##########################################################################################################################funciones auxiliares###############################
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
function listatexto(id){
    var ax = document.getElementById(id).options.selectedIndex;
    return document.getElementById(id).options.item(ax).text;
}
//################################################################################IMPRIMIR DATOS!!!!!!!!!!!!!!!!!!###############################################
function imprimir(id="detalles",mes,contenido="M"){
    var titulo;
    var sub;
    if(contenido=="M"){
        titulo = "<h1> EMPRESA X LIBRO MAYOR  </h1> <br>";
    }else if(contenido=="D"){
        titulo = "<h1> EMPRESA X LIBRO DIARIO  </h1> <br>";
    }
    
    sub = "<h2>"+mes+"</h2>";
    var ventana = window.open('','PRINT', 'height=400,width=600');
    ventana.document.write('<html><head>');
    ventana.document.write( "<link href='assets/css/bootstrap.min.css' rel='stylesheet'/>");
    ventana.document.write("</head><body onload='window.print();window.close();'> <div style='width: 100%' ><center>");
    ventana.document.write(titulo+sub+"<br><br>");
    if(contenido=="M" || contenido=="D"){
        ventana.document.write("<table style='width:80%;'  border='1px'>"+obtenerdentro("detalles")+"</table>");
    }
    ventana.document.write('</center></div></body></html>');
    ventana.document.close(); // necesario para IE >= 10
    ventana.focus(); // necesario para IE >= 10
}
//##########################################################################################################################################################

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
    var meses = new Array();
    meses.push("Enero");meses.push("Febrero");meses.push("Marzo");meses.push("Abril");meses.push("Mayo");meses.push("Junio");
    meses.push("Julio");meses.push("Agosto");meses.push("Septiembre");meses.push("Octubre");meses.push("Noviembre");meses.push("Diciembre");
    
    var bd = firebase.database().ref("LDiario");
    bd.once("value",function(snap){
        var aux = snap.val();
        var comp= 1;
        for(var doc in aux){
           // console.log(doc);
            if(comp!=doc.substring(0,7) && doc!= "partidas"){
                op=document.createElement("option");
                console.log("esto es "+(parseInt(doc.substring(5,7))-1) );
                op.text= meses[(parseInt(doc.substring(5,7))-1)] +" del "+ doc.substring(0,4);
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
//###################################################################################################################################guardar en la bd
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
//##############################################################################################################################################################################

function axdiario(){
    var id = obtenerval("partida");
    var bd = firebase.database().ref("LDiario");
    var cuenta = obtenerval("cuenta");
    var cax = document.getElementById("cuenta").options.selectedIndex;
    var cx = document.getElementById("cuenta").options.item(cax).text;
    var tbl="";
    var ax;
    var arr = new Array(4);
    var detax;
    var titlerep = true;
    var totD=0;
    var totH=0;
    var dax=0;
    var hax=0;
    //contenido
    bd.once("value",function(snap){
        var aux = snap.val();
            tbl="";
            titlerep = true;
            console.log(cuenta +" -"+cx);
            var n = 1;
            var sep = ";";
            arr[3]=0;
            arr[2]=0;
            for(var data in aux){
                ax=aux[data];
                sep=";";
                if(data.substring(0,7)==id){
                    dax=0;
                    hax=0;
                    console.log(ax);
                    detax = ax["detalles"];
                    tbl+="<tr> <td>"+ax["fecha"]+"</td><td style='font-weight:bolder;' class='text-center'>"+data.substring(11)+"</td> <td></td><td></td> </tr>";
                    var indices = [];
                    for(var i = 0; i < detax.length; i++) {
                        if (detax[i] === ";") indices.push(i);
                    }
                    var de = detax.substring(0,detax.search(";"))
                    console.log("SONSON: "+indices.length);
                    for(var j =0; j<=indices.length;j++){
                        //console.log(de.substring(0,de.indexOf(" "))+" con "+cuenta);
                        if(detax.indexOf(sep)==-1){
                            console.log("fin");
                            sep="|";
                        }
                        de = detax.substring(0,detax.indexOf(sep));
                        console.log(detax);
                                         arr[0]=" ";
                                         arr[1]=de.substring(de.indexOf(" "),de.search("-"));                    
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
                            arr[2]=val;arr[3]="0.00";
                            tbl+= "<tr><td> "+arr[0]+" </td><td> "+arr[1]+" </td> <td>"+arr[2]+"</td> <td>$"+arr[3]+"</td> </tr>";
                            console.log(arr[1]);
                            if(type==1){
                              //  arr[4]+= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                                dax+= parseFloat(val.substring(1));
                            }else{
                              //  arr[4]-= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                                dax+= parseFloat(val.substring(1));
                            }
    
                        }else{
                            console.log(pos+" esta en el haber");
                            arr[3]=val;arr[2]="0.00";
                            tbl+= "<tr><td> "+arr[0]+" </td><td style='text-align: center;' > "+arr[1]+" </td> <td>$"+arr[2]+"</td> <td>"+arr[3]+"</td> </tr>";
                            console.log(arr[1]);
                            if(type==2){
                                //arr[4]+= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                                hax+= parseFloat(val.substring(1));
                            }else{
                              //  arr[4]-= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                                hax+= parseFloat(val.substring(1));
                            }
                        }
                       // alert(tbl);
                        console.log("la cantidad es "+val);
                        n++
                        console.log("final");
                        detax = detax.substring(detax.indexOf(sep)+1);
                        de = detax.substring(0,detax.indexOf(sep));
                    }
                        tbl+="<tr> <td style='font-weight:bolder;' class='text-center' colspan='2' >"+ax["descripcion"]+"</td><td style='font-weight:bolder;' class='text-center'>$"+dax+"</td><td style='font-weight:bolder;' class='text-center'>$"+hax+"</td></tr>";
                      //  ponerdentro("contenido", obtenerdentro("contenido")+tbl);                 
                }
            }

        parseFloat(totD)<0?totD*=-1:'';
        parseFloat(totH)<0?totH*=-1:'';
        tbl+="<tr> <td style='font-weight:bolder;' class='text-center' colspan='2' >TOTALES:</td>"+
        "<td id='totD' style='font-weight:bolder;' class='text-center'>$"+totD+"</td>"+
        "<td id='totH' style='font-weight:bolder;' class='text-center'>$"+totH+"</td></tr>"
        ponerdentro("contenido", obtenerdentro("contenido")+tbl);
    });
}

function guardarM(){
    var id = obtenerval("partida");
    var titulo;
    var total ;
    var tipo;
    var ubicacion;
    var totax ;
   // var tipos = new Array();
  //  tipos.push("nada");tipos.push("Activo");tipos.push("Pasivo");tipos.push("Capital");
    var det="";
    var titleax;
    var Obj = new Object();
    var tabla = obtenerelm("detalles");
    for(var i=1; i<tabla.rows.length;i++){

        if(tabla.rows[i].cells.length==1){
            if(det.length>0){
                det+=";";
            }
            titleax= tabla.rows[i].cells[0].innerHTML;
            titulo = titleax.substring(titleax.indexOf(" ")+1);
            totax = titleax.substring(0,titleax.indexOf(" "));
            total = obtenerdentro(totax).substring(1);
            tipo = parseInt(totax[0]);

            if(tipo==1 || tipo== 5 || tipo== 6){
                if(total[0]=="-"){
                    ubicacion = "H";
                    total= total.substring(1);
                }else{
                    ubicacion = "D";
                }
            }else{
                if(total[0]=="-"){
                    ubicacion = "D";
                    total= total.substring(1);
                }else{
                    ubicacion = "H";
                }
            }
            det+=titulo+"-"+tipo+":"+ubicacion+"$"+total;
        }
        if(i+1==tabla.rows.length){
            det+="|";
        }
    }
    Obj["detalles"]=det;
    console.log(det);
    var db = firebase.database().ref("LMayor/"+id);
    db.set(Obj);
    
    alert("Libro mayor guardado!");
    var idax = obtenerelm("partida").options.selectedIndex;
    var idx = document.getElementById("partida").options.item(idax).text;
    imprimir("detalles",idx);
    setTimeout(location.reload(),1000);
   // document.getElementById("contenido").innerHTML=" ";

}

function filltabla(col,arreglo,mayor=0){
    var tabla="";
    var x;
    
    tabla="<tr>";
    if(mayor!=0 && mayor!=1){
        tabla+="<td style='font-weight:bolder;' class='text-center' colspan='"+col+"'>"+mayor+"</td></tr><tr>";
    }
    for(var i=0;i<col;i++){
        x= arreglo[i];
        if(mayor!=0 && i==col-1){
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
    var cax = document.getElementById("cuenta").options.selectedIndex;
    var cx = document.getElementById("cuenta").options.item(cax).text;
    var tbl="";
    var ax;
    var arr = new Array(4);
    var detax;
    var titlerep = true;
    var totD=0;
    var totH=0;
    //contenido
    bd.once("value",function(snap){
        var aux = snap.val();
      //  alert(obtenerelm("cuenta").length);
        for(var re =0; re<obtenerelm("cuenta").length;re++){
            tbl="";
            titlerep = true;
            cuenta = document.getElementById("cuenta").options.item(re).value;
            cx = document.getElementById("cuenta").options.item(re).text;
            console.log(cuenta +" -"+cx);
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
                            console.log(totD);
                            if(type==1){
                                arr[4]+= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                            }else{
                                arr[4]-= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                            }
    
                        }else{
                            console.log(pos+" esta en el haber");
                            arr[3]=val;arr[2]="$0.00";
                            if(type==2){
                                arr[4]+= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                            }else{
                                arr[4]-= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                            }
                        }
                        console.log("la cantidad es "+val);
                        if(titlerep){
                            tbl+= filltabla(5,arr,cuenta+" "+cx);
                            titlerep=false;
                        }else{
                            tbl+= filltabla(5,arr,1);
                        }
                        n++
                        }
                        console.log("final");
                        detax = detax.substring(detax.indexOf(sep)+1);
                        de = detax.substring(0,detax.indexOf(sep));
                    }                  
                }
            }
            tbl+="<tr> <td style='font-weight:bolder;' class='text-center' colspan='3' >TOTAL:</td><td id='"+cuenta+"' style='font-weight:bolder;' class='text-center' colspan='2'>$"+arr[4]+"</td></tr>"
            ponerdentro("contenido", obtenerdentro("contenido")+tbl);
        }
        parseFloat(totD)<0?totD*=-1:'';
        parseFloat(totH)<0?totH*=-1:'';
        tbl="<tr> <td style='font-weight:bolder;' class='text-center' colspan='2' >TOTALES:</td>"+
        "<td id='totD' style='font-weight:bolder;' class='text-center'>$"+totD+"</td>"+
        "<td id='totH' style='font-weight:bolder;' class='text-center'>$"+totH+"</td><td></td></tr>"
        ponerdentro("contenido", obtenerdentro("contenido")+tbl);
    });
}

function comprobacion(){
    var detalles = obtenerval("cons");
    var indices = [];
    var sep=";";
    var totD=0;
    var totH=0;
    var nombre;
    var tipo;
    var cantidad;
    var ubicacion;
    var de ;
    var contenidos = new Array(6);
    var axtodo;
    for(var i in contenidos){
        contenidos[i]="";
    }
    var totales = new Array(6);
    for(var i in totales){
        totales[i]=0;
    }
    for(var i = 0; i < detalles.length; i++) {
        if (detalles[i] === ";") indices.push(i);
    }

    for(var i in indices){

        if(detalles.indexOf(sep)==-1){
            console.log("fin");
            sep="|";
        }
        de = detalles.substring(0,detalles.search(";"));
        nombre = de.substring(0,de.indexOf("-"));

        axtodo = de.substring(de.indexOf("-")+1,de.indexOf(":"));
        switch(parseInt(axtodo)){
            case 1:{
                tipo="Activo";
                break;
            }
            case 2:{
                tipo="Pasivo";
                break;
            }
            case 3:{
                tipo="Capital";
                break;
            }
            case 41:{
                tipo="Costos";
                break;
            }
            case 42:{
                tipo="Gastos";
                break;
            }
            case 5:{
                tipo="Ingresos";
                break;
            }
        }

        axtodo = de.substring(de.indexOf(":")+1,de.indexOf(":")+2);
        if(axtodo=="D"){
            ubicacion="Debe";
        }else{
            ubicacion="Haber";
        }
        cantidad = de.substring(de.indexOf("$"));
        console.log(tipo+" "+nombre+" en el "+ubicacion+" son: "+cantidad);
        detalles = detalles.substring(detalles.indexOf(sep)+1);
        de = detalles.substring(0,detalles.indexOf(sep));
    }
//falta irlos agregando a los contenido y las sumas

}
function cargarM(id="cons"){
    var lista = obtenerelm(id);
    var db = firebase.database().ref("LMayor");
    var meses = new Array();
    meses.push("Enero");meses.push("Febrero");meses.push("Marzo");meses.push("Abril");meses.push("Mayo");meses.push("Junio");
    meses.push("Julio");meses.push("Agosto");meses.push("Septiembre");meses.push("Octubre");meses.push("Noviembre");meses.push("Diciembre");
    var op;
    db.once("value",function(snap){
        var aux = snap.val();
        for(var data in aux){
            if(data!="partidas"){
                op = document.createElement("option");
                op.text= meses[(parseInt(data.substring(5))-1)] +" del "+ data.substring(0,4);
                op.value = aux[data].detalles;
               // op.value= data;
                lista.add(op);
            }

        }
    });
}
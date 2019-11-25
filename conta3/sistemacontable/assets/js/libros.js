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
/*function algo(){
    var bd = firebase.database().ref("Cuentas/");
    var tmp;
    bd.once("value",function(snap){
        var aux = snap.val();
        console.log(aux);
        for(var doc in aux){

            if(doc=="Cuenta de resultados acreedoras"){
                console.log(doc);
                tmp=aux[doc];
            }
        }
        console.log(tmp);
        bd.child("Ingresos").set(tmp);
    });
}*/
//################################################################################IMPRIMIR DATOS!!!!!!!!!!!!!!!!!!###############################################
function imprimir(id="detalles",mes,contenido="M"){
    var titulo; //aca se guarda el titulo :v , arriba en la funcion pido 3 cosas, el id de la tabla original que pasara a imprimirse con todos sus datos
    var sub;     //esta var es para el subtititulo, mes traera el mes en letras para mostrarlo, contenido determina que se imprimira
    
    
    if(contenido=="M"){//M es para libro mayor
        titulo = "<h1> EMPRESA X LIBRO MAYOR  </h1> <br>";//´pone el titulo de libro mayor dentro de una etiqueta h1 y con un espacio despues br
    }else if(contenido=="D"){//D es para libro diario osea si yo pongo imprimir('detalles','20 de febrero','D'); estare imprimiendo un libro diario jalando la tabla con el id detalles con la fecha de 20 de frebrero
        titulo = "<h1> EMPRESA X LIBRO DIARIO  </h1> <br>";
    }else if(contenido=="C"){
        titulo = "<h1> EMPRESA X Balance de Comprobacion  </h1> <br>";
    }else if(contenido=="E"){
        titulo = "<h1> EMPRESA X Estado de Resultados  </h1> <br>";
    }else if(contenido=="G"){
        titulo = "<h1> EMPRESA X Balance General  </h1> <br>";
    }
    
    sub = "<h2>"+mes+"</h2>";//eñ sub titulo es el mes entre etiquetas h2 para que sea mas grande
    var ventana = window.open('','PRINT', 'height=400,width=600');//esto abre una nueva ventana con 400 de alto por 600 de ancho
    ventana.document.write('<html><head>');//esto hace que dentro de esa ventana se pongan estas etiquetas
    ventana.document.write( "<link href='assets/css/bootstrap.min.css' rel='stylesheet'/>");//luego van estas de bootrap para estilos
    ventana.document.write("</head><body onload='window.print();window.close();'> <div style='width: 100%' ><center>");//y luego se pone el body con el evento onload para que al nomas cargar abra la ventana de imprimir y luego se cierre
    ventana.document.write(titulo+sub+"<br><br>");//luego agrega el titulo el subtitulo y 2 espacios
    if(contenido=="M" || contenido=="D" || contenido=="E"){//luego si es libro mayor o libro diario se mandara a agregar una tabla que tambien jalara dentro de ella los datos de la tabla con el id "detalles" del documento original
        ventana.document.write("<table style='width:80%;'  border='1px'>"+obtenerdentro("detalles")+"</table>");//y cerramos la tabla
    }else if(contenido=="C" || contenido=="G"){//el balance general y el de comprobacion estan hechos de varias tablas por eso mejor hago que esten dentrod e un div
        ventana.document.write("<div class='card strpied-tabled-with-hover' style='width:80%;'  >"+obtenerdentro("detalles")+"</div>");
    }
    ventana.document.write('</center></div></body></html>');//cerramos el documento html
    //basicamente  todo lo que esta del ventana.document.write(); sera codigo html que se agregara a la ventana
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
            var axtipo = parseInt(totax.substring(0,2));//cambios
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
            if( parseFloat(total)== 0 || ((totax=="110601" || totax=="210702") && (obtenerelm("212222")!=null || obtenerelm("111111")!=null) ) ){
                det = det.substring(0,det.length-1);
            }else{
                 det+=titulo+"-"+axtipo+":"+ubicacion+"$"+total;//cambios
            }
           
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
    var CFI=0;
    var DFI=0;
    var ajuste =false;
    //contenido
    bd.once("value",function(snap){
        var aux = snap.val();
      //  alert(obtenerelm("cuenta").length);
      var iajuste=0;
      for(var axajuste=0;axajuste<obtenerelm("cuenta").length;axajuste++){
        cuenta = document.getElementById("cuenta").options.item(axajuste).value;
        if(cuenta=="110601" || cuenta=="210702"){
            iajuste++;
        }
      }
      if(iajuste==2){
          ajuste=true;
      }

        for(var re =0; re<obtenerelm("cuenta").length;re++){
            tbl="";
            titlerep = true;
            cuenta = document.getElementById("cuenta").options.item(re).value;
            cx = document.getElementById("cuenta").options.item(re).text;
          //  console.log(cuenta +" -"+cx);
            var n = 1;
            var sep = ";";
            arr[4]=0;
            for(var data in aux){
                ax=aux[data];
                sep=";";
                if(data.substring(0,7)==id){
            //        console.log(ax);
                    detax = ax["detalles"];
    
                    var indices = [];
                    for(var i = 0; i < detax.length; i++) {
                        if (detax[i] === ";") indices.push(i);
                    }
                    var de = detax.substring(0,detax.search(";"))
                    var ant="";
                    for(var j =0; j<=indices.length;j++){
                //        console.log(de.substring(0,de.indexOf(" "))+" con "+cuenta);
                           // alert(j);
                        if(detax.indexOf(sep)==-1){
                            console.log("fin");
                            sep="|";
                           // alert(j +"hasta "+indices.length);
                        }
                        de = detax.substring(0,detax.indexOf(sep));

                        if(de.substring(0,de.indexOf(" "))==cuenta){
                            var ajusteiva= de.substring(0,de.indexOf(" "));

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
                        }else if(de.substring(0,1)=="3"){
                            type=3;
                            console.log("es cuenta de capital");
                        }else if(de.substring(0,2)=="41"){
                            type=41;
                            console.log("es cuenta de costos");
                            
                        }else if(de.substring(0,2)=="42"){
                            type=42;
                            console.log("es cuenta de gastos");
                            
                        }else if(de.substring(0,1)=="5"){
                            type=5;
                            console.log("es cuenta de ingresos");
                            
                        }
                        console.log("la cuenta se llama "+ de.substring(de.indexOf(" "),de.search("-")));
                        var pos = de.substring(de.search("-")+1,de.search("-")+2);
                        
                   //     console.log(de.search(":")+1);
                        var val = de.substring(de.search(":")+1,de.length);
                        
                        if(ajusteiva=="110601"){
                            CFI+=parseFloat(val.substring(1));
                        }else if(ajusteiva=="210702"){
                            DFI+=parseFloat(val.substring(1));
                        }
                    
                        if(pos=="D"){
                     //       console.log(pos+" esta en el debe");
                            arr[2]=val;arr[3]="$0.00";
                       //     console.log(totD);
                            if(type==1 || type==41 || type==42){
                                arr[4]+= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                            }else{
                                arr[4]-= parseFloat(val.substring(1));
                                totD+= parseFloat(val.substring(1));
                            }
    
                        }else{
                         //   console.log(pos+" esta en el haber");
                            arr[3]=val;arr[2]="$0.00";
                            if(type==2 || type==3 || type==5){
                                arr[4]+= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                            }else{
                                arr[4]-= parseFloat(val.substring(1));
                                totH+= parseFloat(val.substring(1));
                            }
                        }
                        
                        //console.log("la cantidad es "+val);
                        
                        if(titlerep){
                            //alert(cx);
                           // if(filltabla(5,arr,cuenta+" "+cx)!=ant){
                                tbl+= filltabla(5,arr,cuenta+" "+cx);
                                titlerep=false;
                           // }
                            
                            
                        }else{
                            tbl+= filltabla(5,arr,1);
                        }
                        n++
                         ant=filltabla(5,arr,cuenta+" "+cx);
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
        tbl="";
      /*  console.log("debe aparecer lolito: ");
        if(obtenerelm("lolito")==null){
            console.log("lolito no esta");
        }
        //console.log(obtenerelm("lolito"));*/
        if(ajuste){
            var total;
            arr[0]=0; 
            if(CFI>DFI){
               total = parseFloat(CFI)-parseFloat(DFI);
               total=parseFloat(Math.round(total * 100) / 100).toFixed(2);
               arr[1]="Ajuste de IVA";
               arr[2]="$"+CFI;
               arr[3]="$"+DFI;
               arr[4]="$"+total;
               tbl+=filltabla(5,arr,"111111 Remanente de IVA");
               tbl+="<tr> <td style='font-weight:bolder;' class='text-center' colspan='3' >TOTAL:</td><td id='111111' style='font-weight:bolder;' class='text-center' colspan='2'>$"+total+"</td></tr>"
            }else{
                total = parseFloat(DFI)-parseFloat(CFI);
                total=parseFloat(Math.round(total * 100) / 100).toFixed(2);
                
                arr[1]="Ajuste de IVA";
                arr[2]="$"+CFI;
                arr[3]="$"+DFI;
                arr[4]="$"+total;
                tbl+=filltabla(5,arr,"212222 Impuestos por Pagar");
                tbl+="<tr> <td style='font-weight:bolder;' class='text-center' colspan='3' >TOTAL:</td><td id='212222' style='font-weight:bolder;' class='text-center' colspan='2'>$"+total+"</td></tr>"
            }
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

function comprobacion(bc="comprobacion"){
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
    var vnta=0;
    var ctvnta=0;
    var contG = new Array(5);
    var totG = new Array(5);
    for(var i=0;i<5;i++){
        contG[i]="";
        totG[i]=0;
    }
  /*  var gasto= new Array(3);
    gasto[0]=0;//
    gasto[1]=0;//
    gasto[2]=0;//*/
    var contenidos = new Array(6);//A,P,C,I,Costos,G 
    var totales = new Array(6);//TA,Tp,Tc,Ti,TC,TG
    var axtodo;
    for(var i=0;i<6;i++){
        contenidos[i]="";
        totales[i]=0;
    }
    for(var i = 0; i < detalles.length; i++) {
        if (detalles[i] === ";") indices.push(i);
    }

    for(var i=0;i<=indices.length;i++){
        console.log(detalles);
        if(detalles.indexOf(sep)==-1){
            console.log("fin");
            sep="|";
        }
        de = detalles.substring(0,detalles.indexOf(sep));

      // console.log("encontrado: "+detalles.indexOf(sep));

        nombre = de.substring(0,de.indexOf("-"));
        console.log(de);
        cantidad = de.substring(de.indexOf("$")+1);
        axtodo = de.substring(de.indexOf(":")+1,de.indexOf(":")+2);
        console.log("OJOJOJOJOOJJOJOJJJJJJJJJJJJJJJJJJJJJJJJJJJJ");
        console.log(axtodo);
        if(axtodo=="D"){
            ubicacion="Debe";
        }else{
            ubicacion="Haber";
        }
        
        
        axtodo = de.substring(de.indexOf("-")+1,de.indexOf(":"));
        
        var compaxtodo ;
        if(axtodo[0]==1 || axtodo[0]==2 || axtodo[0]==3 || axtodo[0]==5){
            compaxtodo=axtodo[0];
        }else{
            compaxtodo=axtodo;
        }
       // alert(nombre+" "+compaxtodo);
       
        switch(parseInt(compaxtodo)){
            case 1:{
                tipo="Activo";
                //alert(tipo);
               // if(ubicacion=="Debe"){
                    contenidos[0]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>" ;
                    if(parseInt(axtodo)==11){
                        contG[0]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                        totG[0]+=parseFloat(cantidad);
                    }else{
                       contG[1]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                        totG[1]+=parseFloat(cantidad);
                   }
                    totales[0]+=parseFloat(cantidad);
                    totD+=parseFloat(cantidad);
                //}
                break;
            }
            case 2:{
                tipo="Pasivo";
                //alert(tipo+" "+nombre);
               // if(ubicacion=="Debe"){
                 //   contenidos[0]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>" ;
                  //  totales[0]+=parseFloat(cantidad);
                   // totD+=parseFloat(cantidad);
               // }else{
                    if(parseInt(axtodo)==21){
                        contG[2]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                        totG[2]+=parseFloat(cantidad);
                    }else{
                        contG[3]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                        totG[3]+=parseFloat(cantidad);
                    }
                    contenidos[1]+="<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                    totales[1]+=parseFloat(cantidad);
                    totH+=parseFloat(cantidad);
                //}
                break;
            }
            case 3:{
                tipo="Capital";
                //alert(tipo+" "+nombre);
               // if(ubicacion=="Debe"){
                 //   contenidos[0]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>" ;
                   // totales[0]+=parseFloat(cantidad);
                   // totD+=parseFloat(cantidad);
               // }else{
                    contG[4]+="<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                    totG[4]+=parseFloat(cantidad);

                    contenidos[2]+="<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                    totales[2]+=parseFloat(cantidad);
                    totH+=parseFloat(cantidad);
                //}
                break;
            }
            case 41:{
                tipo="Costos";
                //alert(tipo+" "+nombre);
                if(nombre=="Costo de ventas"){
                    ctvnta+=parseFloat(cantidad);
                }
                //if(ubicacion=="Debe"){
                    contenidos[4]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>" ;
                    totales[4]+=parseFloat(cantidad);
                    totD+=parseFloat(cantidad);
                //}
                break;
            }
            case 42:{
                tipo="Gastos";
                //alert(tipo+" "+nombre);
                //if(ubicacion=="Debe"){
                    contenidos[5]+= "<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>" ;
                    totales[5]+=parseFloat(cantidad);
                    totD+=parseFloat(cantidad);
                //}
                break;
            }
            case 5:{
                tipo="Ingresos";
                //alert(tipo+" "+nombre);
                if(nombre=="Ventas"){
                    vnta+=parseFloat(cantidad);
                }
                
                    contenidos[3]+="<tr> <td colspan='3' >  "+nombre+": </td> <td colspan='2'>$"+cantidad+" </td> </tr>";
                    totales[3]+=parseFloat(cantidad);
                    totH+=parseFloat(cantidad);
                
                break;
            }
        }
        console.log("algo "+contenidos[0]);

        console.log(tipo+" "+nombre+" en el "+ubicacion+" son: $"+cantidad);
        detalles = detalles.substring(detalles.indexOf(sep)+1);
        de = detalles.substring(0,detalles.indexOf(sep));

    }
    var utilidades = new Array(4);
    utilidades[0]=0;utilidades[1]=0;utilidades[2]=0;utilidades[3]=0;
    //bruta, operacion, impuesto, neta

    if(bc=="comprobacion"){
        console.log(contenidos);
        console.log(totales);
        ponerdentro("contenidoA",contenidos[0]);
        ponerval("totA",totales[0]);

        ponerdentro("contenidoP",contenidos[1]);
        ponerval("totP",totales[1]);

        ponerdentro("contenidoCp",contenidos[2]);
        ponerval("totCp",totales[2]);

        ponerdentro("contenidoI",contenidos[3]);
        ponerval("totI",totales[3]);

        ponerdentro("contenidoC",contenidos[4]);
        ponerval("totC",totales[4]);

        ponerdentro("contenidoG",contenidos[5]);
        ponerval("totG",totales[5]);

        ponerval("totD",totD);
        ponerval("totH",totH);

        $('input').each(function(indice, elementoH2){
            var elemH2 = $(elementoH2);
            if(elemH2.attr("type")=="text"){
            console.log(elemH2);
            elemH2.replaceWith('<p>$' + elemH2.val() + '</p>');
            }
          });

        imprimir('detalles',listatexto('cons'),'C');

}else if(bc=="resultados"){
    var calculo;console.log("venta: "+vnta);
    ponerval("totVenta",vnta);console.log("costo: "+ctvnta);
    ponerval("totCosVent",totales[4]);
    calculo = parseFloat(vnta)-parseFloat(totales[4]);console.log("bruta: "+calculo);

    ponerval("totUtBruta",calculo);console.log("gastos op: "+totales[5]);
    ponerval("totGastOP",totales[5]);
    calculo -=  parseFloat(totales[5]);
    //ponerval("tot")
    calcaux = parseFloat(totales[3])-parseFloat(vnta);console.log("Otros ingresos :"+calcaux);
 /*   ponerval("totVenta",totales[3]);console.log("costo: "+ctvnta);
    ponerval("totCosVent",totales[4]);
    calculo = parseFloat(totales[3])-parseFloat(totales[4]);console.log("bruta: "+calculo);

    ponerval("totUtBruta",calculo);console.log("gastos op: "+totales[5]);
    ponerval("totGastOP",totales[5]);
    calculo -=  parseFloat(totales[5]);
    //ponerval("tot")
    calcaux = 0;console.log("Otros ingresos :"+calcaux);
*/

    ponerval("totOtroIng",calcaux);
    calculo += parseFloat(calcaux);console.log("operacion :"+calculo);
    ponerval("totUtiOP",calculo);
    calcaux = parseFloat(calculo)*0.07;//reserva para sociedad de capital variable 7%
    calcaux=parseFloat(Math.round(calcaux * 100) / 100).toFixed(2);
    console.log("reserva: "+calcaux);
    ponerval("totReserva",calcaux);
    calculo-= parseFloat(calcaux);console.log("util impuesto: "+calculo);
    ponerval("totUtilImpuesto",calculo);
    if(parseFloat(totales[3])>150000){
        calcaux = parseFloat(calculo)*0.3;
    }else{
        calcaux = parseFloat(calculo)*0.25;
    }
    calcaux=parseFloat(Math.round(calcaux * 100) / 100).toFixed(2);
    console.log("tot impuesto: "+calcaux);
    ponerval("totImpuesto",calcaux);
    calculo-= parseFloat(calcaux);console.log("neta: "+calculo);
    ponerval("totUtilNeta",calculo);

    $('input').each(function(indice, elementoH2){
        var elemH2 = $(elementoH2);
        if(elemH2.attr("type")=="text"){
        console.log(elemH2);
        elemH2.replaceWith('<p>$' + elemH2.val() + '</p>');
        }
      });


    imprimir('detalles',listatexto('cons'),'E');

}else if(bc=="general"){
    var calcaux;
    utilidades[0]=parseFloat(vnta)-parseFloat(totales[4]);//utilidad bruta
    utilidades[1]=parseFloat(utilidades[0])-parseFloat(totales[5])+(parseFloat(totales[3])-parseFloat(vnta));//utilidad operacional
    utilidades[2]=parseFloat(utilidades[1])-(parseFloat(utilidades[1])*0.07);//utilidadantes de impuestos
    if(parseFloat(totales[3])>150000){
        calcaux = parseFloat(utilidades[2])*0.3;//impuestos sobre renta
    }else{
        calcaux = parseFloat(utilidades[2])*0.25;
    }
    calcaux = parseFloat(Math.round(calcaux * 100) / 100).toFixed(2);
    var reserva =parseFloat(utilidades[1])*0.07;
    reserva=parseFloat(Math.round(reserva * 100) / 100).toFixed(2);

    utilidades[3]=parseFloat(utilidades[2])-parseFloat(calcaux);//utilidad neta
    utilidades[3]=parseFloat(Math.round(utilidades[3] * 100) / 100).toFixed(2);

    ponerdentro("contenidoAC",contG[0]);
    ponerdentro("contenidoANC",contG[1]);
    contG[2]+="<tr> <td colspan='3' >  Impuestos Renta x Pagar: </td> <td colspan='2'>$"+calcaux+" </td> </tr>" ;
    totG[2]+=parseFloat(calcaux);
    ponerdentro("contenidoPC",contG[2]);
    ponerdentro("contenidoPNC",contG[3]);
    contG[4]+="<tr> <td colspan='3' >  Reserva Legal: </td> <td colspan='2'>$"+reserva+" </td> </tr>" ;
    totG[4]+=parseFloat(reserva);
    contG[4]+="<tr> <td colspan='3' >  Utilidad Neta: </td> <td colspan='2'>$"+utilidades[3]+" </td> </tr>" ;
    totG[4]+=parseFloat(utilidades[3]);
    ponerdentro("contenidoPatri",contG[4]);
    for(var l=0;l<5;l++){
        totG[l]=parseFloat(Math.round(totG[l] * 100) / 100).toFixed(2);
    }
    ponerval("totAC",totG[0]);
    ponerval("totANC",totG[1]);
    ponerval("totPC",totG[2]);
    ponerval("totPNC",totG[3]);
    ponerval("totPatri",totG[4]);
    var auxtot= parseFloat(parseFloat(totG[0])+parseFloat(totG[1]));
    ponerval("totA",auxtot);
    auxtot= parseFloat(parseFloat(totG[2])+parseFloat(totG[3]));
    ponerval("totPasi",auxtot);
    auxtot = parseFloat(auxtot)+parseFloat(totG[4]);
    ponerval("totPatriP",auxtot);

    $('input').each(function(indice, elementoH2){
        var elemH2 = $(elementoH2);
        if(elemH2.attr("type")=="text"){
        console.log(elemH2);
        elemH2.replaceWith('<p>$' + elemH2.val() + '</p>');
        }
      });

    imprimir('detalles',listatexto('cons'),'G');

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

//################################################################################################################################
function login(){
    var user=obtenerval("usuario");
    var pass=obtenerval("contra");
    const verify = firebase.auth();
    
    verify.signInWithEmailAndPassword(user, pass).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("ERROR "+errorMessage);
       // location.reload();
        console.log(error);
        //return;
        // ...
    });
  /*  var comp = verify.currentUser;
    if(comp){
        alert(comp.email+" accediendo..");
        window.location.href = '../conta3/sistemacontable/index.html';
    }else{
        alert("datos incorrectos");
    }*/
    sesion();
   /* verify.onAuthStateChanged(firebaseUser=>{
        alert(firebaseUser);
        if(firebaseUser){
            alert("accediendo..");
            window.location.href = '../conta3/sistemacontable/index.html';
        }else{
            alert("datos incorrectos");
        }
    });*/

   // alert("lol");
   // window.location.href = '../conta3/sistemacontable/index.html';

}
function salir(){
    const verify = firebase.auth();
    verify.signOut();
    alert("Cerrando sesion..");
    if(window.location.href.search("login")!=-1){
        location.reload();
    }else{
         sesion(1);
    }
   
    
}
function sesion(rp=0){
    //var base="file:///D:/works/0/2019/Contables/Sis-Contables/conta3/sistemacontable/";
    const verify = firebase.auth();
    verify.onAuthStateChanged(firebaseUser=>{
        if(firebaseUser){
            if(window.location.href.search("login")!=-1){
                alert("correcto");
                window.location.href = '../conta3/sistemacontable/index.html';
            }
            console.log("CORRECTO!!!!!!!!!!");
        }else{
            if(window.location.href.search("login")!=-1){
              /*  alert("datos incorrectos");
                location.reload();*/
            }else{
                if(rp==0){
                    console.log("NO ESTA LOGEADO");
                  //  alert(window.location.href);
                    alert("DEBE INICIAR SESION!");
                    window.location.href = "../../conta/login.html";
                }else{
                    window.location.href = "../../conta/login.html";
                }

            }

        }
    });
}

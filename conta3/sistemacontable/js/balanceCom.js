var toool;
var toool1;


function agregarActivo(){
    var x = document.getElementById("activo").value;
    console.log(document.getElementById("activo"));
    console.log(x);
    var valor = document.getElementById("valor").value;
    var tipo = "debe";
    var cont = document.getElementById("contenido");

    var tol1 = document.getElementById("debet").innerHTML;
    
    var neto1 = parseFloat(tol1.substring(1));
    var resp = cont.innerHTML;
    if(tipo== "debe"){
        resp += "<tr> <td>"+ x + "</td>";
        resp += "<td>$" + valor + " </td> <td></td> ";
        neto1 += parseFloat(valor);
        toool = neto1;
    }
    document.getElementById("debet").innerHTML = "$"+ toool;
        cont.innerHTML = resp;
}

function agregarCostos(){
    var p = document.getElementById("costo").value;
    console.log(document.getElementById("costo"));
    console.log(p);
    var tip = "debe";
    var valo = document.getElementById("cos").value;
    
    var conttt = document.getElementById("contenido");

    var toll1 = document.getElementById("debet").innerHTML;
    

    var neto = parseFloat(toll1.substring(1));
    

    var respee = conttt.innerHTML;
    if(tip == "debe"){
        respee += "<tr> <td>"+ p + "</td>";
        respee += "<td>$" + valo + " </td> <td></td> ";
        neto += parseFloat(valo);
        toool = neto;
    }
    document.getElementById("debet").innerHTML = "$"+ toool;
        conttt.innerHTML = respee;
}


function agregarGastos(){
    var z = document.getElementById("gasto").value;
    console.log(document.getElementById("gasto"));
    console.log(z);
    var tio = "debe";
    var valr = document.getElementById("valor5").value;
    
    var contt = document.getElementById("contenido");

    var tl1 = document.getElementById("debet").innerHTML;
    
    var net1 = parseFloat(tl1.substring(1));

    var respe = contt.innerHTML;
    if(tio == "debe"){
        respe += "<tr> <td>"+ z + "</td>";
        respe += "<td>$" + valr + " </td> <td></td> ";
        net1 += parseFloat(valr);
        toool = net1;
    }
    document.getElementById("debet").innerHTML = "$"+ toool;
        contt.innerHTML = respe;
}

function agregarPasivo(){
    var q = document.getElementById("pasivo").value;
    console.log(document.getElementById("pasivo"));
    console.log(q);
    var tipoo = "haber";
    var valor1 = document.getElementById("valor1").value;
    
    var conts = document.getElementById("contenido");

    var tol2 = document.getElementById("habert").innerHTML;

    var neto2 = parseFloat(tol2.substring(1));

    var resp1 = conts.innerHTML;
    if(tipoo == "haber"){
        resp1  += "<tr> <td style='text-align: center;' > "+ q + "</td>";
        resp1  += "<td></td> <td>$" + valor1 + " </td> ";
        neto2 +=parseFloat(valor1);
        toool1 = neto2;
        
    }
    document.getElementById("habert").innerHTML = "$"+ toool1;
        conts.innerHTML = resp1;
}

function agregarCapital(){
    
    var g = document.getElementById("capital").value;
    console.log(document.getElementById("capital"));
    console.log(g);
    var tipoq = "haber";
    var valor2 = document.getElementById("valor2").value;
    
    var conta = document.getElementById("contenido");

    var tool2 = document.getElementById("habert").innerHTML;

    var netp2 = parseFloat(tool2.substring(1));

    var resp2 = conta.innerHTML;
    if(tipoq == "haber"){
        resp2  += "<tr> <td style='text-align: center;' > "+ g + "</td>";
        resp2  += "<td></td> <td>$" + valor2 + " </td> ";
        netp2 +=parseFloat(valor2);
        toool1 = netp2;
        
    }
    document.getElementById("habert").innerHTML = "$"+ toool1;
        conta.innerHTML = resp2;
}

function agregarIngreso(){
    
    var e = document.getElementById("ingreso").value;
    console.log(document.getElementById("ingreso"));
    console.log(e);
    var tipow = "haber";
    var valor3 = document.getElementById("valor3").value;
    
    var contd = document.getElementById("contenido");

    var tol22 = document.getElementById("habert").innerHTML;

    var neto22 = parseFloat(tol22.substring(1));

    var resp11 = contd.innerHTML;
    if(tipow == "haber"){
        resp11  += "<tr> <td style='text-align: center;' > "+ e + "</td>";
        resp11  += "<td></td> <td>$" + valor3 + " </td> ";
        neto22 +=parseFloat(valor3);
        toool1 = neto22;
        
    }
    document.getElementById("habert").innerHTML = "$"+ toool1;    
        contd.innerHTML = resp11;
}


    


let savedMail = "lala@gmail.com";
let savedPass = "123456";

function login (){

    let ingresar = false;

    for(let i = 2; i >= 0 ; i--){
        let userMail = prompt ("Ingresa tu email");
        if (userMail === savedMail){
            for(let j = 2; j >= 0 ; j--){
                let userPass = prompt ("Ingresa tu contraseña. Tenes " +(j+1)+ " intentos");
                //console.log(ingresar)
                if (userPass === savedPass){
                    alert ("Binevenid@");
                    ingresar = true;
                    break;
                }else{
                    alert ("Error. Te quedan " + j + " intentos")
                }
            }
            break;
        }else{
            alert ("Error. Envianos un mail a babyboom@gmail.com para crear una cuenta")
        }
    }

    return ingresar;
}

if(login()){

    let carrito = 2000;

    let opcion = prompt ("Elegi una opción: \n1 - Ver carrito \n2 - Agregrar donación a la casa cuna \n3 - Vaciar carrito \n - Presioná X para salir");
    
    while (opcion !="X" && opcion!="x"){
        switch(opcion){
            case "1":
                alert("Tu compra suma un total de $" + carrito);
                break;
            case "2":
                let donacion = parseInt (prompt("Ingresá el monto a donar"))
                if (donacion>0){
                    carrito += donacion;

                    alert ("Tu compra ahora suma un total de $" + carrito);
                }else{
                    alert ("No has donado nada");
                }
                break;
            case "3":
                carrito - carrito;
                alert ("Tu compra fue anulada");
            default:
                alert ("La opción es inválida");
                break;
        }

        opcion = prompt ("Elegi una opción: \n1 - Ver carrito \n2 - Agregrar donación a la casa cuna \n3 - Vaciar carrito \n - Presioná X para salir");
    }

}else{
    alert ("Tu cuenta fue bloqueada, te enviaremos un mail con la nueva contraseña");
}

alert("Adiós")

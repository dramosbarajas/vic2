 //errorObject
 let errorsMessage = {
     'fieldRequired': 'El campo es requerido',
     'invalidEmail': 'Introducir un email válido',
 }

 //Add error
 function addErrors(elemento, errorsMessage) {
     //Resaltar el input de rojo y mostrar error. elemento = emailLoginForm || error emailLoginFormError
     $(`#${elemento}`).addClass('is-invalid');
     //Localizar el elemento div que tenga
     $(`#${elemento}Error`).html(errorsMessage).css('color','red').show();

 };

 //Remove error
 function removeErrors(elemento) {
     $(`#${elemento}`).removeClass('is-invalid is-valid');
     $(`#${elemento}Error`).html('').hide();
 };

 function correctField(elemento) {
     $(`#${elemento}`).addClass('is-valid');
 };

 //isEmpty
 function isEmpty(elemento) {
     //Buscar el valor del elemento
     removeErrors(elemento);
     let value = $(`#${elemento}`).val();

     if (value === null || value.length === 0 || value === undefined || value === '') {
         // No tiene contenido         
         addErrors(elemento, errorsMessage.fieldRequired);
         return true;
     };
     correctField(elemento);
     return false;
 };

 //isValidEmail
 function isValidEmail(elemento) {
     removeErrors(elemento);
     let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

     if (isEmpty(elemento)) {
         addErrors(elemento, errorsMessage.fieldRequired);
         return false;
     } else {
         let valueEmail = $(`#${elemento}`).val();
         if (!emailRegex.test(String(valueEmail).toLowerCase())) {
             addErrors(elemento, errorsMessage.invalidEmail)
             return false;
         }
     }
     correctField(elemento);
     return true;
 }
$(document).ready(function (){
//Click
    $('#submitFormSignIn').on('click', (e)=>{
        e.preventDefault();
        isValidEmail('emailFieldSignIn');
        isEmpty('passwordFieldSignIn');
        if(!$('#emailFieldSignIn').hasClass('is-invalid') && !$('#passwordFieldSignIn').hasClass('is-invalid')){
           $('#formSignIn').submit();
        }
    });         
});
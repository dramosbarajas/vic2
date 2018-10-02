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
    $('#eventEditModalForm').on('click', (e) => {
        isEmpty('nombreEditUserForm');
        isEmpty('apellidoEditUserForm');
        if(!$('#nombreEditUserForm').hasClass('is-invalid') && !$('#apellidoEditUserForm').hasClass('is-invalid')){
            //Peticion Ajax para actualizar los datos.
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "/profile/editProfile",
                'withCredentials':true,
                "method": "PUT",
                "headers": {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Cache-Control": "no-cache",
                },
                "data": {
                    id : $( '#eventEditModalForm' ).data( 'userid'),
                    nombre : $('#nombreEditUserForm').val(),
                    apellido : $('#apellidoEditUserForm').val(),
                }
            };

            $.ajax(settings).done(function (response) {
                console.log(response);
            });

        }
    })

});


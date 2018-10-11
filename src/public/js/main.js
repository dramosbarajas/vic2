$(document).ready(function (){

    //Config de toastr
    toastr.options = {
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

//Click login
    $('#submitFormSignIn').on('click', (e)=>{
        e.preventDefault();
        isValidEmail('emailFieldSignIn');
        isEmpty('passwordFieldSignIn');
        if(!$('#emailFieldSignIn').hasClass('is-invalid') && !$('#passwordFieldSignIn').hasClass('is-invalid')){
           $('#formSignIn').submit();
        }
    });
    //Click editar los datos del usuario.
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
                if(response.status = 200){
                    $('#apellidoViewUserForm').val(response.usuario.apellido);
                    $('#nombreViewUserForm').val(response.usuario.nombre);
                    toastr["success"]("Modificación guardada correctamente.");
                    $('#EditUserModal').modal('hide');
                }
            });

        }
    })
    //Cambio de contraseña
    $('#passChangeButton').on('click', (e) => {
        isPasswordCorrect('passChangedForm','confirmPassChangedForm');
        if(!$('#passChangedForm').hasClass('is-invalid') && !$('#confirmPassChangedForm').hasClass('is-invalid')){
            //Peticion Ajax para actualizar los datos.
            var settings = {
                "async": true,
                "crossdomain": true,
                "url": "/changePass",
                'withcredentials':true,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                },
                "data": {
                    id : $( '#passChangeButton' ).data( 'userid'),
                    pass : $('#confirmPassChangedForm').val(),
                }
            };

            $.ajax(settings).done(function (response) {
                if(response.status = 200){
                    toastr["success"]("modificación guardada correctamente.");
                    console.log(response);
                }
            });

        }
    })

});


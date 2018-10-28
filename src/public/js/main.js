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

    function helperDate(dateTicket){
        let date = new Date(dateTicket);
        let formatDate = date.getDate() + "/";
        formatDate += (date.getMonth() + 1) + "/";
        formatDate += date.getFullYear();
        return formatDate;
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
            let settings = {
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
            let settings = {
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
                if(response.status = 200 ){
                    toastr["success"]("Contraseña actualizada correctamente.");
                    setTimeout(function () {
                        window.location.href = "/app";
                    },4000)
                }
            });
        }
    });
    //Evento para añadir nuevos tickets
    $('#addNewTicket').on('click', (e) => {
        if(!isEmpty('titleNewTicket')){
            let settings = {
                "async": true,
                "crossdomain": true,
                "url": "/ticket",
                'withcredentials':true,
                "method": "POST",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                },
                "data": {
                    descripcion : $( '#titleNewTicket' ).val()
                }
            };
        $.ajax(settings)
            .done(function (response) {
                if(response.status = 200 )
                {
                    toastr["success"]("Ticket creado correctamente.");
                    let tickets = response.tickets;
                    var html= "";
                    tickets.forEach((ticket) => {
                        html += `<div class="col-md-12 mt-2">
                                    <div class="card">
                                    <input type="hidden" name="" data-ticketid = ${ticket._id}>
                                        <h5 data-ticketid = ${ticket._id} class="card-header float-left ${(ticket.rol === "Cerrado") ? "cls":"opn"}">${ticket.descripcion}
                                         ${(ticket.rol === "Cerrado") ?
                            '<i title="Activar Ticket"  class="deactivateTicket fas fa-2x fa-toggle-off float-right" style="color:red"></i></h5>' :
                            '<i title="Ticket Activo"  class="activateTicket fas fa-2x fa-toggle-on float-right" style="color:green"></i></h5>'};
                                    <div class="card-body">
                                        <p class="card-text">Posible campo oculto con desplegable.</p>
                                        <p>${helperDate(ticket.fechaCreacion)}</p>
                                        <p>${ticket.active}</p>
                                        <p>Estado del ticket: ${ticket.rol}</p>
                                    </div>
                                    </div>
                                </div>`;
                    });
                    $('.tickets').html(html);
                    $('#titleNewTicket').val('');
                }
        })
        .fail(function () {
                toastr["error"]("Algo ha fallado!!!!");
            })
        };
    })
    //Activate ICON
    $(document).on("click", '.deactivateTicket', (e) => {

            let settings = {
                "async": true,
                "crossdomain": true,
                "url": "/ticket",
                'withcredentials':true,
                "method": "PUT",
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                    "cache-control": "no-cache",
                },
                "data": {
                    id : $(e.currentTarget).parent().data('ticketid'),
                }
            };
            $.ajax(settings)
                .done(function (response) {
                    if(response.status = 200 )
                    {
                        toastr["success"]("Ticket activado correctamente.");
                        let tickets = response.tickets;
                        var html= "";
                        tickets.forEach((ticket) => {
                            html += `<div class="col-md-12 mt-2">
                                    <div class="card">
                                    <input type="hidden" name="" data-ticketid = ${ticket._id}>
                                        <h5 data-ticketid = ${ticket._id} class="card-header float-left ${(ticket.rol === "Cerrado") ? "cls":"opn"}">${ticket.descripcion}
                                         ${(ticket.rol === "Cerrado") ?
                                            '<i title="Activar Ticket"  class="deactivateTicket fas fa-2x fa-toggle-off float-right" style="color:red"></i></h5>' :
                                            '<i title="Ticket Activo"  class="activateTicket fas fa-2x fa-toggle-on float-right" style="color:green"></i></h5>'};
                                    <div class="card-body">
                                        <p class="card-text">Posible campo oculto con desplegable.</p>
                                        <p>${helperDate(ticket.fechaCreacion)}</p>
                                        <p>${ticket.active}</p>
                                        <p>Estado del ticket: ${ticket.rol}</p>
                                    </div>
                                    </div>
                                </div>`;
                        });
                        $('.tickets').html(html);
                    }
                })
                .fail(function () {
                    toastr["error"]("Algo ha fallado!!!!");
                })
    })
    //Deactivate ICON
    $(document).on("click", '.activateTicket', (e) => {
        alert("Ticket activo, si desea activar otro pulse sobre su icono activar");
    });
});


$(() => {

    let socket = null;

    let alias = new URLSearchParams(window.location.search).get("alias");

    if (alias) {
        socket = io('http://localhost:3000');

        socket.on('connect_new_user', (data) => {
            $("#messageInfNewUser").html('Usuário ' + data.client_id + ' conectado');
            $("#modaNewUser").modal("show");
        });

        socket.on('render_message', (data) => {
            $(".Messages").append("<div class=\"boxMessage\">" +
                "<div class=\"alias\">" +
                "<span>" + data.usuario + "</span>" +
                "</div>" +
                "<div class=\"message\">" +
                "<span>" + data.message + "</span>" +
                "</div>" +
                "</div>")
        });

    } else {
        window.location.href = "index.html";
    }

    $("#btnEnviar").click(() => {
        if (socket) {
            socket.emit('new_message', { message: $("#txtMessage").val(), usuario: alias });
            $("#txtMessage").val("");
        }
    });



});
$(() => {

    $("#btnEntrarChat").click(() => {

        if ($("#txtAlias").val() != "") {
            window.location.href = "chat.html?alias=" + $("#txtAlias").val();
        } else {
            alert('Informe o alias');
        }
    });

});
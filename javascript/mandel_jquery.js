$(function () {

    if ($("body").attr("id") === "popis") {

        $('#tablica-popis').DataTable({
            //"pageLength": 3,
            //dom: 'Bfrtip',
            lengthMenu: [
                [2, 3, 5, 10, 25],
                ['2', '3', '5', '10', '25']
            ],
            buttons: [
                'pageLength'
            ]
        });
    }

    if ($("body").attr("id") === "multimedija") {

        $("#element1").hover(function () {
            $("#element1").animate({
                width: "50%"
            });
        }, function () {
            $("#element1").animate({
                width: "100%"
            });
        });
    }

});


//^(\w|(\w\.\w)|\w\.)+@(?=\w*\.)(\w|(\.\w\w)|(\w\.\w\w))+$ regex za e-mail
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

        $("#element1 img").hover(function () {
            $("#element1 img").animate({
                width: "80%",
                borderWidth: 20
            });
        }, function () {
            $("#element1 img").animate({
                width: "100%",
                borderWidth: 1
            });
        });

        $("#element3 img").hover(function () {
            $("#element3 img").animate({
                padding: 30,
                borderWidth: 2
            });
        }, function () {
            $("#element3 img").animate({
                padding: 0,
                borderWidth: 0
            });
        });
    }

});


//^(\w|(\w\.\w)|\w\.)+@(?=\w*\.)(\w|(\.\w\w)|(\w\.\w\w))+$ regex za e-mail
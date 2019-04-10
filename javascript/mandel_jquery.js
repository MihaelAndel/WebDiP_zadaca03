$(function () {
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
})


//^(\w|(\w\.\w)|\w\.)+@(?=\w*\.)(\w|(\.\w\w)|(\w\.\w\w))+$ regex za e-mail
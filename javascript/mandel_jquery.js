$(function () {

    if ($("body").attr("id") === "popis") {

        // console.log("učitano");

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

    if ($("body").attr("id") === "registracija") {
        var imeSelect = $("#ime");
        var prezimeSelect = $("#prezime");
        var korisnickoImeUnos = $("#korisničko_ime");
        var lozinkaUnos = $("#lozinka");
        var emailUnos = document.getElementById("email");
        var gumbRegistriraj = $("#gumb");
        var ponovljenaLozinka = $("#potvrda_lozinke");
        var regexUzorak = new RegExp(/^(\w|(\w\.\w)|\w\.)+@(?=\w*\.)(\w|(\.\w\w)|(\w\.\w\w))+$/);

        lozinkaUnos.prop("disabled", true);
        korisnickoImeUnos.prop("disabled", "true");

        $.ajax({
            url: "https://barka.foi.hr/WebDiP/2018/materijali/zadace/dz3/userNameSurname.php?all",
            method: "GET",
            dataType: "xml",
            success: function (podaci) {
                $(podaci).find("user").each(function () {
                    var ime = $(this).find("name").text();
                    var prezime = $(this).find("surname").text();
                    imeSelect.append("<option value='" + ime + "'>" + ime + "</option>");
                    prezimeSelect.append("<option value='" + prezime + "'>" + prezime + "</option>");
                });
            }
        });

        imeSelect.change(provjeriKorisnickoIme);
        prezimeSelect.change(provjeriKorisnickoIme);

        imeSelect.change(provjeriLozinku);
        prezimeSelect.change(provjeriLozinku);

        emailUnos.addEventListener("input", provjeriEmail);

        gumbRegistriraj.click(function () {
            if (lozinkaUnos.attr("disabled")) {

            } else {
                if (lozinkaUnos.val() === ponovljenaLozinka.val()) {

                } else {
                    alert("Lozinke nisu identične!");
                    event.preventDefault();
                }
            }
        });

        function provjeriEmail() {
            if (regexUzorak.test(emailUnos.value)) {
                $(emailUnos).addClass("dobar-unos");
            } else {
                $(emailUnos).addClass("krivi-unos");

            }
        }

        function provjeriKorisnickoIme() {
            console.log("nekaj");
            var ime = imeSelect.val();
            // console.log(ime);
            var prezime = prezimeSelect.val();
            $.ajax({
                url: "https://barka.foi.hr/WebDiP/2018/materijali/zadace/dz3/userNameSurname.php",
                method: "GET",
                data: {
                    name: ime,
                    surname: prezime
                },
                success: function (podaci) {
                    var korIme = $(podaci).find("username").text();
                    if (korIme === "0") {
                        console.log("nema tog korisnika");
                        korisnickoImeUnos.removeAttr("disabled");
                    } else {
                        korisnickoImeUnos.attr("value", korIme);
                        korisnickoImeUnos.attr("disabled", "true");
                    }
                }
            });
        }

        function provjeriLozinku() {
            var ime = imeSelect.val();
            var prezime = prezimeSelect.val();

            $.getJSON("../json/users.json", function (podaci) {
                $.each(podaci, function (redniBroj, vrijednost) {
                    if (ime === vrijednost.name && prezime === vrijednost.surname) {
                        console.log("ima");
                        lozinkaUnos.prop("disabled", true);
                        lozinkaUnos.attr("value", vrijednost.password);
                        return false;
                    } else {
                        console.log("nema");
                        lozinkaUnos.prop("disabled", false);
                        lozinkaUnos.attr("value", "");
                    }
                })
            });
        }
    }

});
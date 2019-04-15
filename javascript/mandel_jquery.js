$(function () {

    if ($("body").attr("id") === "popis") {

        $('#tablica-popis').DataTable({
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
            $(this).animate({
                width: "80%",
                borderWidth: 20
            });
        }, function () {
            $(this).animate({
                width: "100%",
                borderWidth: 1
            });
        });

        $("#element3 img").hover(function () {
            $(this).animate({
                padding: 30,
                borderWidth: 2
            });
        }, function () {
            $(this).animate({
                padding: 0,
                borderWidth: 1
            });
        });

        $("#element6 video").click(function () {
            $(this).animate({
                width: "150%"
            });
        });

        $("#element2 img").hover(function () {
            $(this).animate({
                marginTop: "70px"
            });
        }, function () {
            $(this).animate({
                marginTop: "0px"
            });
        });

        $("#element5 img").hover(function () {
            $(this).animate({
                paddingBottom: "100px"
            });
        }, function () {
            $(this).animate({
                paddingBottom: 0
            });
        });
    }

    if ($("body").attr("id") === "registracija") {
        var imeSelect = $("#ime");
        var prezimeSelect = $("#prezime");
        var korisnickoImeUnos = $("#korisničko_ime");
        var emailUnos = document.getElementById("email");
        var gumbRegistriraj = $("#gumb");
        var lozinkaUnos = $("#lozinka");
        var ponovljenaLozinka = $("#potvrda_lozinke");
        var regexUzorak = new RegExp(/^(\w|(\w\.\w)|\w\.)+@(?=\w*\.)(\w|(\.\w\w)|(\w\.\w\w))+$/);

        lozinkaUnos.prop("disabled", true);
        korisnickoImeUnos.prop("disabled", "true");

        $.ajax({
            xhrFields: {
                withCredentials: true
            },
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

        $.getJSON("../json/states.json", function (podaci) {
            var drzave = [];
            for (var i = 0; i < podaci.length; i++) {
                drzave.push(podaci[i]);
            }

            $("#drzave").autocomplete({
                source: drzave
            });
        });


        imeSelect.change(provjeriKorisnickoIme);
        prezimeSelect.change(provjeriKorisnickoIme);

        imeSelect.change(provjeriLozinku);
        prezimeSelect.change(provjeriLozinku);

        emailUnos.addEventListener("input", provjeriEmail);

        gumbRegistriraj.click(function () {
            if (ponovljenaLozinka.val() !== lozinkaUnos.val()) {
                event.preventDefault();
                alert("Lozinke nisu identicne!");
                ponovljenaLozinka.addClass("krivi-unos");
                lozinkaUnos.addClass("krivi-unos");
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
            var ime = imeSelect.val();
            var prezime = prezimeSelect.val();
            $.ajax({
                xhrFields: {
                    withCredentials: true
                },
                url: "https://barka.foi.hr/WebDiP/2018/materijali/zadace/dz3/userNameSurname.php",
                method: "GET",
                data: {
                    name: ime,
                    surname: prezime
                },
                success: function (podaci) {
                    var korIme = $(podaci).find("username").text();
                    if (korIme === "0") {
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
                        lozinkaUnos.prop("disabled", true);
                        lozinkaUnos.attr("value", vrijednost.password);
                        return false;
                    } else {
                        lozinkaUnos.prop("disabled", false);
                        lozinkaUnos.attr("value", "");
                    }
                })
            });
        }
    }

});
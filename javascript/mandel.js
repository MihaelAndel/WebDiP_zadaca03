window.onload = function () {
    //console.log("učitano");
    var brojUnos = document.getElementById("brojUnos");
    var listaJezika = document.getElementById("lista[]");
    var popisKontinenata = document.getElementsByClassName("radio");
    var velikiTekst = document.getElementById("tekst");
    var gumbSalji = document.getElementById("salji");

    var broj = false;
    var lista = false;
    var tekst = false;

    velikiTekst.disabled = true;
    valjanostGumba()

    function odrediPreglednik() {
        let imePreglednika = navigator.appName;

        if (imePreglednika === "Netscape") {
            popisKontinenata[1].checked = true;
        } else if (imePreglednika.toUpperCase === "Opera") {
            popisKontinenata[0].checked = true;
        } else {
            popisKontinenata[3].checked = true;
        }
    }

    odrediPreglednik();

    brojUnos.addEventListener("input", function () {
        //console.log("unos");
        if (this.value < 0 || this.value > 100) {
            // console.log("krivi unos");
            this.style.borderColor = "red";
            this.style.backgroundColor = "rgb(200, 10, 35)";
            listaJezika.disabled = true;
            alert("Neispravna vrijednost! (vrijednost mora biti između 0 i 100)");
        } else {
            this.style.borderColor = "#87C540";
            this.style.backgroundColor = "#FFFFFF";
            listaJezika.disabled = false;
            broj = true;
        }
        if (this.value < 0) {
            velikiTekst.disabled = true;
            tekst = false;
        } else {
            velikiTekst.maxLength = this.value;
            velikiTekst.disabled = false;
            tekst = true;
        }
        valjanostGumba()
    });

    listaJezika.addEventListener("input", function () {
        //console.log("unos");
        var brojac = 0;
        var zadnjiOznacen = null;
        var poljeOpcija = this.getElementsByTagName("option");
        for (i = 0; i < poljeOpcija.length; i++) {
            if (poljeOpcija[i].selected === true) {
                brojac++;
                if (brojac > 3) {
                    alert("Molimo odaberite najviše tri (3) vrijednosti!");
                    lista = false;
                    break;
                } else {
                    lista = true;
                }
            }
        }
        valjanostGumba()
    });

    velikiTekst.addEventListener("input", function () {
        var duljinaTekst = this.value.length;
        if (duljinaTekst == brojUnos.value) {
            alert("Tekst smije imati maksimalno " + brojUnos.value + " znakova!");
        }
        if (this.disabled == false) {
            tekst = true;
        }
        valjanostGumba();
    });

    function valjanostGumba() {
        if (tekst && lista && broj) {
            gumbSalji.disabled = false;
        } else {
            gumbSalji.disabled = true;
        }
    }
}
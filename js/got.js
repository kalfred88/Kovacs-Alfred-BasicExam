function getData(url, callbackFunc) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callbackFunc(this);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function successAjax(xhttp) {
    // itt a json content, benne a data változóban
    var userDatas = JSON.parse(xhttp.responseText);
    var data = userDatas[2].data;
    console.log(data);

    createGrid(data);

    document.getElementById('search').addEventListener('click', function () {
        searchName(data, document.getElementById('keyword').value.toLowerCase());
    });
    /*
      Pár sorral lejebb majd ezt olvashatod:
      IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ!

      Na azokat a függvényeket ITT HÍVD MEG! 

      A userDatas NEM GLOBÁLIS változó, ne is tegyétek ki globálisra. Azaz TILOS!
      Ha valemelyik függvényeteknek kell, akkor paraméterként adjátok át.
    */
}

// Írd be a json fileod nevét/útvonalát úgy, ahogy nálad van
getData('/json/characters.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */
/*
function sortBy(a, b) {
    a.localeCompare(b);
}

function sortNames(datas){
    datas.sort(sortBy);
}*/



function createGrid(datas) {
    var con = document.querySelector('#container');

    for (var i = 0; i < datas.length; i++) {
        var div = document.createElement('div');
        div.innerText = datas[i].name;
        div.className = "person";
        div.innerHTML = `<img src="${datas[i].portrait}" alt="${datas[i].name}">`;
        div.addEventListener('click', function () {
            goBig(datas, div.innerText);
        });
        con.appendChild(div);
    }
}

function goBig(datas, currName) {
    console.log(currName);
    var big = document.createElement('div');
    for (var i in datas) {
        if (datas.name == currName) {
            big.innerHTML = `<img src="${datas[i].picture}" alt="${datas[i].name}">`;
            var p = document.createElement('p');
            p.textContent = datas[i].bio;
            big.appendChild(p);
        } else {
            big.innerHTML = "Character not found!(1)";
        }
    }
    document.querySelector('footer').appendChild(big);
}

function searchName(datas, name) {
    console.log(name);
    console.log(datas);
    for (var i; i < datas.length; i++) {
        if (datas[i].name.toLowerCase() == name) {
            goBig(datas, name);
        } else {
            var big = document.createElement('div');
            big.innerHTML = "Character not found!(2)";
            document.querySelector('footer').appendChild(big);
        }
    }
}
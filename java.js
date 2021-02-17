/*************************COMEÇO DOS FILMES QUE IRÃO APARECER NA PAGINA INICIAL******************************************************* */

let bannerMovies = [
    "murder+on+the+orient+express",
    "the+hunger+games",
    "home+alone",
    "the+book+thief",
    "madagascar",
    "inside+out",
    "hidden+figures",
    "2001:+a+space+odyssey",
    "call+me+by+your+name",
    "back+to+the+future",
    "the+breakfast+club",
    "brokeback+mountain"
];

for (let i = 0; i < 12; i++) {
    let request = new XMLHttpRequest();
    request.open("GET", `https://www.omdbapi.com/?t=${bannerMovies[i]}&plot=full&apikey=ff8d5bd3`);

    request.addEventListener("load", () => {
        let article = document.createElement("article");
        article.setAttribute("class", "card borda-cor-especial card-largura p-0 m-2 col-12 col-md-4");
        article.style.backgroundColor = "#212529";
        document.getElementsByClassName("row justify-content-center")[0].appendChild(article);

        let img = document.createElement("img");
        img.setAttribute("alt", "...");
        img.src = JSON.parse(request.responseText).Poster;
        article.appendChild(img);

        let div2 = document.createElement("div");
        div2.setAttribute("class", "middle");
        article.appendChild(div2);

        let div3 = document.createElement("button");
        div3.setAttribute("class", "text");
        div3.textContent = "Detalhes";
        div2.appendChild(div3);

        div3.addEventListener("click", () => {

            div3.addEventListener("mouseover", () => {
                article.setAttribute("class", "zoom");
                div1.removeChild(img);
                div1.setAttribute("class", "container-flex");
                div1.style.padding = "150px";
                div1.style.backgroundColor = "black";

                let poster = document.createElement("img");
                poster.src = JSON.parse(request.responseText).Poster;
                div1.appendChild(poster);

                let divInfo = document.createElement("div");
                divInfo.setAttribute("id", "divInfo");
                divInfo.style.backgroundColor = "#222523";
                div1.appendChild(divInfo);

                let title = document.createElement("p");
                title.setAttribute("id", "titleStyle");
                title.textContent = JSON.parse(request.responseText).Title;
                divInfo.appendChild(title);

                let runTime = document.createElement("p");
                runTime.textContent = "Run Time: " + JSON.parse(request.responseText).Runtime;
                runTime.style.color = "white";
                divInfo.appendChild(runTime);

                let imdbRating = document.createElement("p");
                imdbRating.textContent = "IMBD: " + JSON.parse(request.responseText).imdbRating;
                imdbRating.style.color = "white";
                divInfo.appendChild(imdbRating);

                let plot = document.createElement("p");
                plot.textContent = "Plot: " + JSON.parse(request.responseText).Plot;
                plot.style.color = "white";
                divInfo.appendChild(plot);


                let buttonHide = document.createElement("button");
                buttonHide.setAttribute("id", "button-hide");
                buttonHide.textContent = "Hide";
                buttonHide.style.color = "white";
                divInfo.appendChild(buttonHide);

            });



        });

    }, false);

    request.send();
}


/*************************FIM DOS FILMES QUE IRÃO APARECER NA PAGINA INICIAL************************************************************** */

//MATHEUS AQUI!!!!!!!!!!!!!!!!!!!!!!!!
/**************************COMEÇO DA PESQUISA DE FILMES***************************************************************************** */
let input = document.getElementById("movieSearch");

input.addEventListener("keyup", () => { //eventListener que irá gerar o botão "X" apenas quando o usuário estiver digitando e para começar a pesquisar na API enquanto o usuário digita
    if (document.getElementById("buttonSearch")) { //esse if serve para não gerar vários botões "X" conforme o usuário digita
        document.getElementsByClassName("d-flex")[0].removeChild(document.getElementById("buttonSearch"));
    }
    let button = document.createElement("button"); //botão "X"
    button.setAttribute("class", "botao-cor-especial"); //TODO: MELHORAR O CSS DESSE BOTÃO, está muito grande e o "X" que eu coloquei também
    button.setAttribute("id", "buttonSearch");
    button.setAttribute("aria-label", "Close");
    button.textContent = "X";
    document.getElementsByClassName("d-flex")[0].appendChild(button);

    button.addEventListener("click", () => { //TODO: ao ser clicado, o botão deverá retornr toda a home inicial como era antes 
        document.getElementById("movieResult").innerText = "";
        input.value = "";
        if (document.getElementById("buttonSearch")) {
            document.getElementsByClassName("d-flex")[0].removeChild(document.getElementById("buttonSearch"));
        }
    });

    //LISTA DE TODO:
    //----> arrumar a estilização do botão de "X"
    //----> ao ser clicar no botão "X" o aspecto da página home deverá ser restaurado
    //----> quando o usuário digitar (eventListener de keyup) o carrossel e o painel dos 12 filmes deverá sumir para dar espaço para os resultados da pesquisa do usuário
    //----> o tamanho dos filmes deverá ser padronizado pois há posters maiores que os outros


    if (input.value.length >= 3) { //NÃO SE PREOCUPE COM ESSA PARTE pois isso só busca os filmes na API
        let div = document.getElementById("movieResult");
        let request = new XMLHttpRequest();

        request.open("GET", `https://www.omdbapi.com/?s=${input.value.toLowerCase().replace(/\s/g, "+")}&plot=short&apikey=ff8d5bd3`);

        request.addEventListener("load", () => {
            let results = JSON.parse(request.responseText).Search;
            for (let movie in results) {
                if (results[movie].Poster != "N/A") {
                    let img = document.createElement("img");
                    img.src = results[movie].Poster;
                    div.appendChild(img); //CASO PRECISE: aqui que os filmes estão sendo renderiados, é um flex-box com id="movieResult"
                }

            }
            console.log(results);
        }, false);

        request.send();
        div.textContent = ""; //isso daqui apaga a lista de filmes geradas enquanto o usuário digita, pois se ele continuou digitando ele ainda não encontrou o filme que queria. Então tudo é apagado para gerar espaço para novos resultados


    }
});

/**************************FIM DA PESQUISA DE FILMES***************************************************************************************************** */




/****************************INICIO DA FUNCAO QUE VAI GERAR TUDO DE NOVO************************************************************************* */
document.getElementById("movieSearch").addEventListener("click", () => {
    console.log(document.getElementById("movieSearch").value);
    if (document.getElementById("movieSearch") == "") {
        document.getElementById("movieResult").innerText = "";

    }

});






/*******************************FIM DA FUNCAO QUE VAI GERAR TUDO DE NOVO***********************************************************************************8 */
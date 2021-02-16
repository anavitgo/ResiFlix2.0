const $ = document.querySelector.bind(document);
const cep = document.getElementById("cep");
const nome = document.getElementById("nome")
cep.addEventListener("focusout", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", `https://viacep.com.br/ws/${cep.value}/json`, false);
    xhr.addEventListener("load", () => {
        let dadosAPI = JSON.parse(xhr.responseText);
        for(const elemento in dadosAPI) {
            if($(`#${elemento}`)) {
                $(`#${elemento}`).value = dadosAPI[elemento];
            }
        }
    }) 
    xhr.send();
})

const email = document.getElementById("email")
const cadastrar = document.getElementById("botao-enviar");
const main = document.getElementById("main-container");
const senha = document.getElementById("senha")
const confirmeSenha = document.getElementById("senhac")
cadastrar.addEventListener("click", () => {
        if(senha.value == confirmeSenha.value && email.value != "") {
            let confirmacao = document.createElement("h3");
            confirmacao.innerText = `Um e-mail de confirmação foi enviado para "${email.value}".`
            confirmacao.classList.add("confirmacao")
            confirmacao.style.color = "white";
            main.innerHTML = ""
            main.appendChild(confirmacao);
        } else {
            alert("Coloque os dados corretamente")
        }
    
})
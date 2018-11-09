var inputTamanho = document.querySelector("[name=tamanho]");
var outputTamanho = document.querySelector("[name=valortamanho");

function mostraTamanho() {
    outputTamanho.innerHTML = inputTamanho.value;
}

// atribui o ponteiro da função
//inputTamanho.oninput = mostraTamanho;
inputTamanho.addEventListener("change", mostraTamanho);

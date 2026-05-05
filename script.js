const botao = document.getElementById("botaoAdicionar");
const lista = document.getElementById("listaTarefas"); // Peguei o ul.
const input = document.getElementById("inputTarefa");

// PARA ADICIONAR UMA TAREFA USANDO POST (ENVIO DA INFORMAÇÃO).
async function adicionarTarefa() {
    const texto = input.value.trim()
    if (texto === "") {
        return;
    }
    await fetch("http://127.0.0.1:5000/tarefas", { // AWAIT > ESPERA A INFORMAÇÃO VOLTAR EM JSON.
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texto: texto })
    });

    console.log("enviando", texto);

    input.value = "";
    await carregarTarefas(); // ATUALIZA A LISTA.


}


// PARA CARREGAR AS TAREFAS USANDO GET. 
async function carregarTarefas() {


    try {
        const resposta = await fetch("http://127.0.0.1:5000/tarefas");
        const dados = await resposta.json();

        lista.innerHTML = ""; // Limpa a lista com "".

        // Crio um ForEach para percorrer cada item e carregá-lo.

        dados.forEach(function (tarefa, index) {
            // Crio 3 variáveis. 

            const item = document.createElement("li")

            const span = document.createElement("span");
            span.textContent = tarefa.texto // Crio uma <span>, assim como criei <li>.

            const botaoRemover = document.createElement("button");
            botaoRemover.textContent = "x";

            botaoRemover.addEventListener("click", async function () {
                await fetch(`http://127.0.0.1:5000/tarefas/${tarefa.id}`, {
                    method: "DELETE"
                });
                await carregarTarefas();
            })
            // "item" é o <li> criado. Q
            // ue vai ser removido neste código.
            item.appendChild(span);
            item.appendChild(botaoRemover);
            lista.appendChild(item);

        });

     

    } catch (erro) {
        console.log("erro ao carregar:", erro);
    }
}; // Fechamento do async function carregarTarefas().

// OS EVENTOS, QUE VÃO FAZER ACONTECER. 

botao.addEventListener("click", adicionarTarefa);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        adicionarTarefa();
    }
});  // Se estiver no input e apertar Enter, chama a função adicionarTarefa(), que usa o POST para enviar as informações pro Back-end, que vai retornar uma resposta em JSON, com GET.

carregarTarefas();
// Carrega logo que abrir a página.










// Aqui criei o evento de click no botão somente.

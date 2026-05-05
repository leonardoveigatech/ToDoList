from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

tarefas = []
contador_id = 1 # Gera IDs únicos.

@app.route("/")
def home():
    return "working!"

# USANDO GET. MANDANDO AS TAREFAS DE VOLTA EM JSON.
@app.route("/tarefas", methods=["GET"])
def listar_tarefas():
    return jsonify(tarefas)

# USANDO POST.
@app.route("/tarefas", methods=["POST"])
def adicionar_tarefa():
    global contador_id
    dados = request.get_json() # Pega o JSON enviado pelo Front-end.

    nova_tarefa = {
        "id": contador_id,
        "texto": dados["texto"]
    }       
    tarefas.append(nova_tarefa)
    contador_id += 1
    
    return jsonify({"mensagem":"Tarefa Adicionada!"})

# PARA O METHOD DELETE. DELETAR UMA TAREFA ESPECÍFICA.

@app.route("/tarefas/<int:id>", methods =["DELETE"])
def deletar_tarefa(id):
    global tarefas

    tarefas = [t for t in tarefas if t["id"] != id]
    # "crie uma nova lista com tarefas que NÃO TENHAM os IDs das tarefas que eu quero apagar."
    return jsonify({"mensagem":"Tarefa deletada!"})




# -----------------
app.run(debug=True)
    

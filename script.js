let listaCadastros  = []
let formulario  =  document.querySelector("#formulario")
let cadastros = document.querySelector("#Cadastros")
let modal = document.querySelector("#modalAlteracao");
let span = document.querySelector(".fecharmodal");

formulario.addEventListener('submit', (e)=>{
    e.preventDefault()
    let nome = document.querySelector("#inputNome")
    let cpf =  document.querySelector("#inputCpf")
    let idade =  document.querySelector("#inputIdade")
    verificarCampos([nome, cpf, idade])
    if(nome.className !="invalid" && cpf.className !="invalid"  && idade.className !="invalid" ){
        let cadastro = {
            "Nome" : nome.value,
            "Cpf":   cpf.value,
            "Idade" : idade.value
        }
        listaCadastros.push(cadastro)
        nome.value = ""
        cpf.value = ""
        idade.value = ""
        escreverCadastros(listaCadastros)

    }
})
function verificarCampos (campos) {
    let invalidos = false
    for (let node of campos){
        if (node.value == ""){
            node.className = "invalid"
            invalidos = true
        }
        else if ((node.id == "novoIdade" || node.id == "inputIdade") && node.value <= 5){
            node.className = "invalid"
            alert("Para cadastrar alguem no sistema é nescessário ter mais de 5 anos")
            invalidos = false
        }
        else if ((node.id == "novoIdade" || node.id == "inputIdade") && node.value >= 100){
            node.className = "invalid"
            alert("Para cadastrar alguem no sistema é nescessário ter mais de 100 anos")
            invalidos = false
        }
        else{
            node.className = "valid"
        }
    }
    
    if (invalidos){
        alert("Area de textos vazias")
    }

}
span.onclick = function() {
    modal.style.display = "none";
}
function escreverCadastros (listaCadastro){
    limparCadastro()
    let ID = 0
    for (let cadastro of listaCadastros){
        let nodeCadastro =  document.createElement("div")
        nodeCadastro.className = "CadastroNode"
        nodeCadastro.id = "node" + ID
    
    
        let nodeNome = document.createElement("p")
        nodeNome.innerText ="Nome: " + cadastro.Nome
    
    
        let nodeCpf = document.createElement("p")
        nodeCpf.innerText = "Cpf: " + cadastro.Cpf
    
    
        let nodeIdade = document.createElement("p")
        nodeIdade.innerText = "Idade: " + cadastro.Idade
    
    
        let divBotoes =  document.createElement("div")
        divBotoes.className = "divBotoes"
    
        let botaoAlterar =  document.createElement("button")
        botaoAlterar.innerText = "Alterar"
        botaoAlterar.id = ID
        botaoAlterar.className = "botaoAlterar"
        botaoAlterar.addEventListener("click", ()=>{
            let modalNome = document.querySelector("#novoNome");
            let modalCpf = document.querySelector("#novoCpf");
            let modalIdade = document.querySelector("#novoIdade");
            let botaoSalvar = document.querySelector(".modalSalvar")
            modal.style.display = "block";
            modalNome.value = listaCadastros[Number(botaoAlterar.id)].Nome 
            modalCpf.value = listaCadastros[Number(botaoAlterar.id)].Cpf            
            modalIdade.value = listaCadastros[Number(botaoAlterar.id)].Idade
            botaoSalvar.id = botaoAlterar.id
            botaoSalvar.addEventListener('click', ()=>{
                verificarCampos([modalNome,modalCpf,modalIdade])
                if(modalNome.className !="invalid" && modalCpf.className !="invalid"  && modalIdade.className !="invalid" ){
                    listaCadastro[Number(botaoSalvar.id)].Nome = modalNome.value;
                    listaCadastro[Number(botaoSalvar.id)].Cpf= modalCpf.value;
                    listaCadastro[Number(botaoSalvar.id)].Idade = modalIdade.value;
                    modal.style.display = "none";
                    escreverCadastros(listaCadastros)
                }
            })
        })
    
    
        let botaoExcluir =  document.createElement("button")
        botaoExcluir.innerText = "Excluir"
        botaoExcluir.id = (ID)
        botaoExcluir.className = "botaoAlterar"
        botaoExcluir.addEventListener("click", ()=>{
            listaCadastros.pop(botaoExcluir.id)
            let nodeExcluido =  document.querySelector("#node" + botaoExcluir.id)
            cadastros.removeChild(nodeExcluido)
        })
    
        divBotoes.append(botaoExcluir, botaoAlterar)
        nodeCadastro.append(nodeNome,nodeCpf,nodeIdade,divBotoes)
        cadastros.appendChild(nodeCadastro)
        ID++
    }



}
function limparCadastro(){
    for (child of cadastros.children){
        child.remove();
    }
}
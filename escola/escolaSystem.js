const fs = require("fs")
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let aluno = []
let alunoLogado = null

function cadastroAluno() {
    console.log("\n=== CADASTRO ===")

    const ra = "ESC" + Date.now().getFullYear() + Math.floor(Math.random() * 1000)
    const senha = "escola123"

    rl.question("Nome: ", (nome) => {
        rl.question("Data de nascimento: ", (data) => {
            rl.question("CPF: ", (cpf) => {
                rl.question("Endereço: ", (endereco) => {
                    rl.question("Nome do resposavel: ", (nomeResposavel) => {
                        rl.question("Serie: ", (serie) => {
                            rl.question("Turno: ", (turno) => {

                                const novoAluno = {
                                    nome: nome,
                                    dataNascimento: data,
                                    cpf: cpf,
                                    endereco: endereco,
                                    nomeDoResponsavel: nomeResposavel,
                                    serie: serie,
                                    turno: turno,
                                    ra: ra,
                                    senha: senha
                                }

                                aluno.push(novoAluno)


                                console.log("\nCadastro realizado com sucesso!")
                                console.log(`Bem-vindo(a), Aluno(a)${nome}!`)

                                console.log(`\nSeu RA: ${ra}`)
                                console.log(`Sua senha de login: ${senha}`)
                                console.log("Anote estas informações para fazer login!")



                                alunoLogado = novoAluno
                            })
                        })
                    })
                })
            })
        })
    })
}

function loginAluno() {
    console.log("\n=== LOGIN ===")

    rl.question("RA: ", (ra) => {
        rl.question("Senha: ", (senha) => {

            const alunos = aluno.find(u => u.ra === ra && u.senha === senha)

            if (alunos) {
                alunoLogado = alunos
                console.log(`\nLogin realizado! bem-vindo(a), ${alunos.nome}!`)
            } else {
                console.log("\nErro! RA ou senha errado")
                loginAluno()
            }
        })
    })
}

function menuInicial() {
    rl.question("\nBem vindo(a)! O Que deseja fazer? \ncadastrar(1)\nLogin(2)\nSair(3)\n> ", (escolha) => {
        const menuCadastro = Number(escolha)

        switch (menuCadastro) {
            case 1:
                cadastroAluno()
                break;

            case 2:
                loginAluno()
                break

            case 3:
                console.log("Encerrado!")
                rl.close()
                break

            default:
                console.log("Erro! Verifique se escolheu a resposta certa")
                menuInicial()
                break;
        }
    })
}
menuInicial()
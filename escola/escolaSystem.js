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

    const ra = "ESC" + new Date().getFullYear() + Math.floor(Math.random() * 1000)
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

            const alunoEncontrado = aluno.find(Conferir => Conferir.ra === Number(ra) && Conferir.senha === senha)

            if (alunoEncontrado) {
                alunoLogado = alunoEncontrado
                console.log(`\nLogin realizado! bem-vindo(a), ${alunoEncontrado.nome}!`)
                menuAluno()
            } else {
                console.log("\nErro! RA ou senha errado")
                loginAluno()
            }
        })
    })
}

function menuInicial() {
    rl.question("\nBem vindo(a)! O Que deseja fazer? \n(1) Cadastrar\n(2) Login\n(3) Sair\n> ", (escolha) => {

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

function menuAluno() {
    rl.question("Bem vindo(a)! O Que deseja fazer? \n(1) Ver meus dados\n(2) Trocar senha\n(3) Fazer Prova\n(4) Voltar\n(5) Sair\n>", (escolha) => {

        const menuAlunos = Number(escolha)

        switch (menuAlunos) {

            case 1:
                verDados()
                break;

            case 2:
                trocarSenha()
                break;

            case 3:
                FazerProva()
                break;

            case 4:
                menuInicial()
                break;

            case 5:
                console.log("Encerrado!")
                rl.close()
                break;

            default:
                console.log("Erro! Verifique se escolheu a resposta certa")
                menuAluno()
                break;
        }
    })


}

function verDados() {
    console.log("\n=== MEUS DADOS ===")
    console.log(`Nome: ${alunoLogado.nome}`)
    console.log(`RA: ${alunoLogado.ra}`)
    console.log(`Serie: ${alunoLogado.serie}`)
    console.log(`Turno: ${alunoLogado.turno}`)
    console.log(`CPF: ${alunoLogado.cpf}`)
    console.log(`Responsavel: ${alunoLogado.nomeDoResponsavel}`)

    menuAluno()
}

function trocarSenha() {
    rl.question("Digite a senha atual ", (senhaAtual) => {

        if (senhaAtual === alunoLogado.senha) {

            rl.question("Digite a nova senha: ", (novaSenha) => {

                alunoLogado.senha = novaSenha

                console.log("Senha alterada com sucesso!")
                menuAluno()
            })

        } else {
            console.log("Senha incorreta!")
            trocarSenha()
        }

    })
}



function continuar() {
    rl.question(
        "\nDeseja fazer outra coisa?\n(1) Sim\n(2) Não\n> ",
        (resposta) => {

            const verificar = Number(resposta)

            switch (verificar) {
                case 1:
                    menuInicial
                    break

                case 2:
                    console.log("\nEncerrado!")
                    rl.close()
                    break

                default:
                    console.log("\nDigite apenas (1) Sim ou (2) Não")
                    continuar()
                    break
            }
        }
    )
}

menuInicial()
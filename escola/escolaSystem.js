const fs = require("fs")
const { escape } = require("querystring")
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
                    rl.question("Nome do responsavel: ", (nomeResponsavel) => {
                        rl.question("Serie: ", (serie) => {
                            rl.question("Turno: ", (turno) => {

                                const novoAluno = {
                                    nome: nome,
                                    dataNascimento: data,
                                    cpf: cpf,
                                    endereco: endereco,
                                    nomeDoResponsavel: nomeResponsavel,
                                    serie: serie,
                                    turno: turno,
                                    ra: ra,
                                    senha: senha
                                }

                                aluno.push(novoAluno)


                                console.log("\nCadastro realizado com sucesso!")
                                console.log(`Bem-vindo(a), Aluno(a) ${nome}!`)

                                console.log(`\nSeu RA: ${ra}`)
                                console.log(`Sua senha de login: ${senha}`)
                                console.log("Anote estas informações para fazer login!")



                                alunoLogado = novoAluno
                                menuInicial
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

            const alunoEncontrado = aluno.find(Conferir => Conferir.ra === ra && Conferir.senha === senha)

            if (alunoEncontrado) {
                alunoLogado = alunoEncontrado
                console.log(`\nLogin realizado! bem-vindo(a), ${alunoEncontrado.nome}!`)
                menuAluno()
            } else {
                console.log("\nErro! RA ou senha Inválido")
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
                console.log("Erro! Verifique se escolheu a opção válidas")
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
                fazerProva()
                break;

            case 4:
                menuInicial()
                break;

            case 5:
                console.log("Encerrado!")
                rl.close()
                break;

            default:
                console.log("Erro! Verifique se escolheu a opção válidas")
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

function fazerProva() {
    rl.question("\nQual prova deseja fazer? \n(1) Prova matematica\n(2) Prova de português\n(3) Prova de História\n(4) Prova de Ciências\n(5) Prova de Geografia\n>", (provas) => {

        const escolhas = Number(provas)

        switch (escolhas) {
            case 1:

                break

            case 2:

                break

            case 3:

                break

            case 4:

                break

            case 5:

                break

            default:
                break
        }
    })

}
function menuProvaMatematica() {
    console.log("\n=== PROVA DE MATEMATICA ===")

    rl.question("\nRealizar a prova?\n(1) Sim\n(2) Volta\n>  ", (provas) => {
        const escolhas = Number(provas)

        switch (escolhas) {
            case 1:
                iniciarProvaMatematica()
                break

            case 2:
                menuAluno()
                break

            default:
                console.log("Erro! Verifique se escolheu a opção válidas")
                break
        }
    })
}
function iniciarProvaMatematica() {

    const perguntasMatematicas = [
        {
            enunciado: "Quanto é 45 + 28?",
            opcoes: ["63", "93", "73", "83"],
            correta: "C"
        },
        {
            enunciado: "Quanto 100 - 36?",
            opcoes: ["54", "64", "74", "84"],
            correta: "B"
        },
        {
            enunciado: "Quanto é 7 x 8?",
            opcoes: ["64", "54", "58", "56"],
            correta: "D"
        },
        {
            enunciado: "Quanto é 144 ÷ 12?",
            opcoes: ["10", "25", "12", "23"],
            correta: "C"
        },
        {
            enunciado: "Um produto custa R$ 120 e teve desconto de R$ 30. Qual o valor final?",
            opcoes: ["90", "85", "70", "84"],
            correta: "A"
        },
        {
            enunciado: "Um carro faz 50 km por hora. Em 1h30 horas, percorre:",
            opcoes: ["82 km", "90 km", "100 km", "75 km"],
            correta: "B"
        },
        {
            enunciado: "Um carro percorre 120 km em 2 horas. Qual a velocidade média?",
            opcoes: ["60 km/h", "50 km/h", "40 km/h", "70 km/h"],
            correta: "A"
        },
        {
            enunciado: "Um produto custa R$ 200 e teve desconto de 20%. Qual o valor final?",
            opcoes: ["160", "180", "140", "150"],
            correta: "A"
        },
    ]

    const perguntas = perguntasMatematicas
    let nota = 0
    let indice = 0

    function perguntar() {
        if (indice === perguntas.length) {
            console.log(`\nSua nota final é ${nota}`)
            menuAluno()
            return
        }

        const atual = perguntas[indice]

        rl.question(`\n${atual.enunciado}\n(A) ${atual.opcoes[0]}\n(B) ${atual.opcoes[1]}\n(C) ${atual.opcoes[2]}\n(D) ${atual.opcoes[3]}>`, (resposta) => {

            resposta = resposta.toUpperCase()

            if (!["A", "B", "C", "D"].includes(resposta)) {
                console.log("Erro! Digite apenas A, B, C ou D")
                return perguntar()
            }

            if (resposta === atual.correta) {
                console.log("Acertou!")
                nota++
            } else {
                console.log(`Errou! Resposta correta: ${atual.correta}`)
            }

            indice++
            perguntar()
        })
    }

    perguntar()
}





function continuar() {
    rl.question(
        "\nDeseja Voltar?\n(1) Sim\n(2) Não\n> ",
        (resposta) => {

            const verificar = Number(resposta)

            switch (verificar) {
                case 1:
                    menuInicial()
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
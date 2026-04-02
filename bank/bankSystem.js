const fs = require("fs")
const readline = require("readline")
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

let saldo = 0
let usuarios = []
let usuarioLogado = null

function salvarDados() {
    fs.writeFileSync("usuarios.json", JSON.stringify(usuarios, null, 2))
}

function carregarDados() {
    if (fs.existsSync("usuarios.json")) {
        usuarios = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"))
    }
}
function fazerCadastro() {
    console.log("\n=== NOVO CADASTRO ===")

    rl.question("Nome: ", (nome) => {
        rl.question("Data de nasciemnto: ", (data) => {
            rl.question("CPF: ", (cpf) => {
                rl.question("Qual senha deseja usar?: ", (senha) => {

                    const novoUsuario = {
                        nome: nome,
                        dataNascimento: data,
                        cpf: cpf,
                        senha: senha,
                        saldo: 0
                    }

                    usuarios.push(novoUsuario)
                    salvarDados()

                    console.log("\nCadastro realizado com sucesso!")
                    console.log(`Bem-vindo(a), ${nome}!`)

                    usuarioLogado = novoUsuario
                    menuBanco()


                })
            })
        })
    })
}

function fazerLogin() {
    console.log("\n=== LOGIN ===")

    rl.question("CPF: ", (cpf) => {
        rl.question("Senha: ", (senha) => {

            const usuario = usuarios.find(Conferir => Conferir.cpf === Number(cpf) && Conferir.senha === Number(senha))

            if (usuario) {
                usuarioLogado = usuario
                saldo = usuario.saldo
                console.log(`\nLogin realizado! bem-vindo(a), ${usuario.nome}!`)
                menuBanco()
            } else {
                console.log("\nCPF ou senha incorretos!")
                fazerLogin()
            }
        })
    })
}


function telaInicial() {
    rl.question("\nO que voce quer fazer?\n(1) Cadastrar\n(2) Login\n(3) Sair\n> ",
        (escolha) => {

            const opcoes = Number(escolha)

            switch (opcoes) {
                case 1:
                    fazerCadastro()
                    break

                case 2:
                    fazerLogin()
                    break

                case 3:
                    if (usuarioLogado) {
                        usuarioLogado.saldo = saldo
                        salvarDados()
                    }
                    console.log("\nEncerrado!")
                    rl.close()
                    break

                default:
                    console.log("\nErro! Verifique se escolheu as opções certas")
                    telaInicial()
                    break
            }
        }
    )
}
function menuBanco() {
    rl.question("\nO que voce quer fazer?\n(1) Ver saldo\n(2) Depositar\n(3) Sacar\n(4) voltar\n(5) Sair\n>",
        (escolha) => {

            const opcoes = Number(escolha)

            switch (opcoes) {
                case 1:
                    Versaldo()
                    break

                case 2:
                    depositarValor()
                    break

                case 3:
                    sacarValor()
                    break

                case 4:
                    telaInicial()
                    break

                case 4:
                    usuarioLogado.saldo = saldo
                    salvarDados()
                    console.log("\nEncerrado!")
                    rl.close()
                    break

                default:
                    console.log("\nErro! Verifique se escolheu as opções certas")
                    menuBanco()
                    break
            }
        }
    )
}

function Versaldo() {
    console.log(`\nSeu saldo atual é: ${saldo} reais`)
    continuar()
}

function depositarValor() {
    rl.question("\nQual valor voce deseja depositar: ", (valorDigitado) => {

        const valor = Number(valorDigitado)

        if (isNaN(valor)) {
            console.log("\nErro! Digite apenas numeros")
            depositarValor()

        } else if (valor <= 0) {
            console.log("\nValor invalido!")
            depositarValor()

        } else {
            saldo += valor
            console.log(`\nVoce depositou ${valor} reais`)
            console.log(`Saldo atual: ${saldo} reais`)
            continuar()
        }
    })
}

function sacarValor() {
    rl.question("\nQual valor voce deseja sacar?: ", (valorDigitado) => {

        const valor = Number(valorDigitado)

        if (isNaN(valor)) {
            console.log("\nErro! Digite apenas numeros")
            sacarValor()

        } else if (valor <= 0) {
            console.log("\nValor invalido!")
            sacarValor()

        } else if (valor > saldo) {
            console.log("\nSaldo insuficiente!")
            sacarValor()

        } else {
            saldo -= valor
            console.log(`\nSucesso! Voce sacou ${valor} reais`)
            console.log(`Saldo atual: ${saldo} reais`)
            continuar()
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
                    menuBanco()
                    break

                case 2:
                    usuarioLogado.saldo = saldo
                    salvarDados()
                    console.log("\nEncerrado!")
                    rl.close()
                    break

                default:
                    console.log("\nDigite apenas (1)Sim ou (2)Não ")
                    continuar()
                    break
            }
        }
    )
}
carregarDados()
telaInicial()

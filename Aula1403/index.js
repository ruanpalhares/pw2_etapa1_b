//#region Módulos Externos
const chalk = require('chalk')
const inquirer = require('inquirer')
//#endregion

//#region Módulos Internos
const fs = require('fs')
const { type } = require('os')
//#endregion

operation()

//#region Ações Iniciais
function operation(){
    inquirer.prompt([
        {
            type: 'list',
            name:'action',
            message:'O que deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) =>{
        const action = answer['action']
        if(action === 'Criar conta'){
            console.log('Criando a conta...')
            createAccount()
        }else if(action === 'Consultar saldo'){
            console.log('Consulatndo seu saldo...')
        }else if(action === 'Depositar'){
            console.log('Depositando em sua conta...')
        }else if(action === 'Sacar'){
            console.log('Sacando de sua conta...')
        }else if(action === 'Sair'){
            console.log(chalk.bgBlue.black('SAINDO DA APLICAÇÃO CONTAS ETEC'))
            setTimeout(() => {
                process.exit()
            }, 1500);
        }
    })
}
//#endregion

//#region Criar Contas
function createAccount(){
    console.log(chalk.bgGreen.black('Bem Vindo ao Contas ETEC Bank!'))
    console.log(chalk.green('Siga as orientações a seguir:'))

    buildAccount()
}
function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Entre com o nome da conta:'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(chalk.bgRed.black('Esta conta já existe!'))
            buildAccount(accountName)
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance":0}',
            function (err){
                console.error(err)
            }
        )
        console.info(chalk.green('Parabéns! Sua conta no ETEC Bank foi criada.'))
        operation()
    })
}
//#endregion


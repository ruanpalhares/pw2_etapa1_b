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


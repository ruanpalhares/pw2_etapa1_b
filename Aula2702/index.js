const chalk = require('chalk')
const inquirer = require('inquirer')
const calculadora = require('calculadora')

inquirer.prompt([
    {
        name:'t1',
        message:'Qual a nota do Trabalho 1: '
    },
    {
        name:'t2',
        message:'Qual a nota do Trabalho 2: '
    },
    {
        name:'p3',
        message:'Qual a nota da Prova 3: '
    },
    {
        name:'p4',
        message:'Qual a nota da Prova 4: '
    }
]).then()
.catch()
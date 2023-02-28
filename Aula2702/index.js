const inquirer = require('inquirer')
const calculadora = require('./calculadora')
const avalia = require('./avalia')

inquirer.prompt([
    {
        name:'nomeAluno',
        message:'Informe o nome do aluno: '
    },
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
]).then((answers) => {
    console.log(`Trabalho 1: ${answers.t1}, Trabalho 2: ${answers.t2}`)
    console.log(`Prova 3: ${answers.p3}, Prova 4: ${answers.p4}`)
    let media =calculadora.media(answers.t1, answers.t2, answers.p3, answers.p4)
    console.log(`Sua média é: ${media}`)
    avalia.publica(media)
})
.catch((error) => {console.log(error.isTtyError)})
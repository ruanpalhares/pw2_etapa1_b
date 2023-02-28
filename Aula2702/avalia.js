const chalk = require("chalk")
module.exports = {
    publica(media) {
        if(media>=6){
            console.log(chalk.bgGreen.black('O aluno está aprovado!'))
        }else if(media>=5){
            console.log(chalk.bgYellow.black('O aluno está de recuperação.'))
        }else{
            console.log(chalk.bgRed.black('O aluno está reprovado.'))
        }
    }
}
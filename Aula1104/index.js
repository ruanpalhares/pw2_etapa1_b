const contas = require('./serviceContas/contas')

contas.operation()

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
            return
        }

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            '{"balance":0, "limit": 1000}',
            function (err){
                console.error(err)
            }
        )
        console.info(chalk.green('Parabéns! Sua conta no ETEC Bank foi criada.'))
        operation()
    })
}
//#endregion

//#region Depositar na Conta
function deposit(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Para qual conta irá o depósito?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']
        if(!checkAccount(accountName)){
            return deposit()
        }

        inquirer.prompt([
            {
                name:'amount',
                message: 'Quanto você deseja depositar?'
            }
        ]).then((answer) =>{
            const amount = answer['amount']
            addAmount(accountName, amount)
            console.log(chalk.bgYellow.green('Sucesso! Seu montante foi depositado.'))
            setTimeout(() => {
                operation()
            }, 1000);
        })
    })
}
function checkAccount(accountName){
    if(!fs.existsSync(`accounts/${accountName}.json`)){
        console.log(chalk.bgRed.black('Esta conta não existe.'))
        return false
    }
    return true
}
function getAccount(accountName){
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`,{
        encoding:'utf8',
        flag:'r'
    })
    return JSON.parse(accountJSON)
}
function addAmount(accountName, amount){
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('O montante não é válido.'))
        return deposit()
    }

    accountData.balance = parseFloat(amount)+parseFloat(accountData.balance)

    fs.writeFileSync(`accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err){
        console.log(err)
    })

    console.log(chalk.green(`Depositamos: R$ ${amount} na conta ${accountName}.`))
}
//#endregion

//#region Consultar Saldo
function accountBalance(){
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Qual conta deseja o saldo?'
        }
    ]).then((answer) =>{
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return accountBalance()
        }

        const accountData = getAccount(accountName)

        if(accountData.balance>0){
            console.log(chalk.green(`Saldo: ${accountData.balance}`))
            
        }else{
            console.log(chalk.red(`Saldo: ${accountData.balance}`))
        }
        setTimeout(() => {
            operation()  
        }, 1000);
    })
}
//#endregion

//#region Sacar do Saldo
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'De qual conta deseja sacar?'
        }
    ]).then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)){
            return withdraw()
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?'
            }
        ]).then((answear) => {
            const amount = answear['amount']
            if(removeAmount(accountName, amount)){
                setTimeout(() => {
                    operation()
                }, 3000);
            }
        })
    })
}
function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName)

    if(!amount){
        console.log(chalk.bgRed.black('Não ha valor a ser sacado'));
        return withdraw()
    }


    if(accountData.balance<amount){
        console.log(chalk.bgRed.black('Você ira entrar no cheque especial!'))
    }
    
    if((accountData.balance+accountData.limit)<amount){
        console.log(chalk.bgRed.black('Você estourou seu limite!'))
        return 
        
    }else{
        accountData.balance = parseFloat(accountData.balance)-parseFloat(amount)

        fs.writeFileSync(
            `accounts/${accountName}.json`,
            JSON.stringify(accountData),
            function (err){
                console.log(err)
            }
        )
        console.log(chalk.blue(`Você sacou: ${amount} da conta ${accountName}`))
        console.log(chalk.bgWhite.blue(`Seu saldo ficou: ${accountData.balance}`))
    }
}

//#endregion

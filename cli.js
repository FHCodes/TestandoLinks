const chalk = require('chalk')
const validaHttp = require('./validacaoUrls')
const validacaoUrl = require('./validacaoUrls')

const lendoArquivo = require('./index.js');

const caminho = process.argv

async function funcMain(caminhoDoArquivo) {
    const resp = await lendoArquivo(caminhoDoArquivo[2])
    if (caminho[3] === undefined) {
        console.log(chalk.yellow('Lista de links com hipertexto:'), resp)
    }
    else if (caminho[3].toLowerCase() === 'validar_links') {
        console.log(chalk.yellow('Lista de links validados: '), await validacaoUrl.validaHttp(resp))
    }
    else if (caminho[3].toLowerCase() === 'links') {
        console.log(chalk.yellow('Lista de links:'), await validacaoUrl.linksPuros(resp))
    }
    else {
        console.log(chalk.red('Não é uma opção valida:',caminho[3]))
    }
}

funcMain(caminho)

//Se quiser passar variaveis
//module.exports = { variavel1: 'valor_da_variavel', variavel2: 'valor_da_variavel2' }

const chalk = require('chalk');
const fs = require('fs')

function tratandoErro(erro){
   throw new Error(chalk.red(erro.code, 'Deus merda'))
}

// function capturaLinks(texto){
//     const regex = /\[([^\]]*)\]\(https?:\/\/[^$#\s].[^\s]*\)/gm     
//     const linksExtraidos = texto.match(regex)                                          // Retorna um array contendo chave + url dentro de um array
//     console.log(linksExtraidos)
// }

// function capturaLinks(texto){
//     const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
//     const respostaExec = regex.exec(texto)                                            //0 - Link completo, 1 - Chave do link, 2 - url,  Posição que foi achado e input 
//     return respostaExec
// }

function capturaLinks(texto) {
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm;
    const arrayRegex = [];
    let aux;
    while((aux = regex.exec(texto)) !== null) {
       arrayRegex.push({ [aux[1]]: aux[2] })                                            // Para trabalhar no formato chave:valor é preciso envolver as chaves por [] [chave[n]]: valor[n]
    }
    return arrayRegex.length > 0 ? arrayRegex: chalk.red("Não tem links nessa merda")
  }

//----------------------------------Exemplo1-------Lê um arquivo mas não usa forma assincrona-------------------------------------
// function LendoArquivo(caminho){
//     const encoding = 'utf-8'
//     fs.readFile(caminho, encoding, (erro, texto) =>{
//         if (erro){
//             tratandoErro(erro)
//         }
//         console.log(chalk.green(texto))
//     })
// }

//----------------------------------Exemplo2-------METODO 1 - assincrono-------------------------------------
// function LendoArquivo(caminho ){
//     const encoding = 'utf-8'
//     fs.promises
//     .readFile(caminho, encoding)
//     .then((texto) => console.log(chalk.green(texto)))
//     .catch((erro) => tratandoErro(erro))
 
// }



//----------------------------------Exemplo2-------METODO 2 - assincrono-------------------------------------
async function lendoArquivo(caminho ){
    const encoding = 'utf-8'
    try {
    const texto = await fs.promises.readFile(caminho,encoding)
    return capturaLinks(texto)
   }
   catch(erro){
    return tratandoErro(erro)
   }
}
module.exports = lendoArquivo;
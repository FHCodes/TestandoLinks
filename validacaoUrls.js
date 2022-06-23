const axios = require('axios')

async function fazRequisicao(listaUrl) {
    const listaStatus = await Promise.all(listaUrl.map(async url => {
        const data = await axios.get(url)
            .then(async function (response) {
                return { ['status']:response.status, ['url']:url }
            })
            .catch(async function (error) {
                return { ['status']:error.response.status, ['mensagem']:error.code, ['url']:url }
            })
        return (data)
    }))
    return listaStatus
}

function linksPuros(linksUrl) {
    return linksUrl.map(url => Object.values(url).join())
}

async function validaHttp(linksUrl) {
    return await fazRequisicao(linksPuros(linksUrl))
}
module.exports = { validaHttp,linksPuros }



// async function fazRequisicao(listaUrl) {
//     const listaStatus = await listaUrl.map(async url => {
//             const data = await axios.get(url)
//                 .then(async function (response) {
//                     return { [response.status]: url }                                   // Um dia tentar ver se essa gambiarra funcina
//                 })
//                 .catch(async function (error) {
//                     return { [error.response.status]: url }
//                 })
//             return data

//         })
//        console.log(listaStatus)
// }





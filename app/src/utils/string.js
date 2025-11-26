function makeInitialColaborador(nomeCompleto){
    try{
        const nomeSplited = nomeCompleto.split(" ");
        return `${nomeSplited[0][0]}${nomeSplited[1][0]}`
    }catch(e){
        return nomeCompleto
    }
}

module.exports = {
    makeInitialColaborador
}

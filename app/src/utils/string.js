function makeInitialColaborador(nomeCompleto){
    const nomeSplited = nomeCompleto.split(" ");
    return `${nomeSplited[0][0]}${nomeSplited[1][0]}`
}

module.exports = {
    makeInitialColaborador
}

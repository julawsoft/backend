const { getAll, getAllQuery } = require("../../persistencia/models/Colaborador");
const getAllByKeyValueDadosContacto = require("../dadoContacto/getAllByKeyValueDadosContacto");
const getAllByKeyValueDadosCustoFinanceiro = require("../dadocustofinanceiro/getAllByKeyValueDadosCustoFinanceiro");
const getAllByKeyValueDadosIdentificacao = require("../dadoIdentificacao/getAllByKeyValueDadosIdentificacao");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

async function getAllColaboradorService() {

        const listColaboradores = await getAll()
        return listColaboradores

}

async function getAllColaborador(tipo, categoria) {
        return await getAllQuery(tipo, categoria);
}

module.exports = getAllColaboradorService;
module.exports.getAll = getAllColaborador;
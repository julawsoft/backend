const { getAll } = require("../../persistencia/models/Colaborador");
const getAllByKeyValueDadosContacto = require("../dadoContacto/getAllByKeyValueDadosContacto");
const getAllByKeyValueDadosIdentificacao = require("../dadoIdentificacao/getAllByKeyValueDadosIdentificacao");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

async function getAllColaboradorService() {

        const listColaboradores = await getAll();
        let colaboradorDTO = []

        for (colaborador of listColaboradores) {

                if (colaborador.id) {

                        let tipoColaborador = await listTipoColaboradorById(colaborador.id)
                        let dadosIdentificacao = await getAllByKeyValueDadosIdentificacao("colaborador_id", colaborador.id)
                        let dadosContactos = await getAllByKeyValueDadosContacto("colaboradorId", colaborador.id)

                        colaboradorDTO.push({
                                ...colaborador.dataValues,
                                tipo: tipoColaborador ?? {},
                                identificacoes: dadosIdentificacao ?? [],
                                contactos: dadosContactos ?? []

                        })
                }
        }

        return colaboradorDTO

}

module.exports = getAllColaboradorService
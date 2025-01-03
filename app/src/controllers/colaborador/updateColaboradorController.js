const { StatusCodes } = require('http-status-codes');
const getAllByKeyValueColaborador = require('../../services/colaborador/getAllByKeyValueColaborador.js');
const updateColaborador = require('../../services/colaborador/updateColaborador.js');
const { validationResult } = require('express-validator');
const createDadosContacto = require('../../services/dadoContacto/createDadosContacto.js');
const createDadosIdentificacao = require('../../services/dadoIdentificacao/createDadosIdentificacao.js');
const updateDadosContacto = require('../../services/dadoContacto/updateDadosContacto.js');
const updateDadosIdentificacao = require('../../services/dadoIdentificacao/updateDadosIdentificacao.js');

async function updateColaboradorController(req, res) {

        try {

                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                let {id} = req.params;
                const dataBody = req.body

                const responseColabData =  await getAllByKeyValueColaborador("id", id)


                if(responseColabData.length === 0)
                        return res.status(404).json({ errors: "Colaborador não existe" });


                const dataReturned = await updateColaborador(
                        {
                                "nomeCompleto": dataBody.nome_completo,
                                "nomeProfissional": dataBody.nome_profissional,
                                "dataNascimento": dataBody.data_nascimento,
                                "funcao": dataBody.funcao,
                                "tipoColaboradorId": dataBody.tipo_colaborador_id,
                                "taxa_horaria": dataBody.taxa_horaria,
                                "status": dataBody.status,
                                "id": id
                        }
                )


                if(dataReturned.status === StatusCodes.OK) {


                                if (dataBody.contactos && dataBody.contactos.length) {
                                        for (let contactos of dataBody.contactos) {
                                                updateDadosContacto({
                                                        "tipo": contactos.tipo,
                                                        "valor": contactos.valor,
                                                        "colaboradorId": dataReturned.id
                                                })
                                        }
                                }

        
                                if (dataBody.identificacoes && dataBody.identificacoes.length) {
                                        for (let identificacoes of dataBody.identificacoes) {
                                                updateDadosIdentificacao({
                                                        "tipoDocumentoId": identificacoes.tipo,
                                                        "valor": identificacoes.valor,
                                                        "dataEmissao": identificacoes.data_emissao,
                                                        "dataValidade": identificacoes.data_validade,
                                                        "colaboradorId": dataReturned.id
                                                })
                                        }
                                }
        

                }else{

                        return responseHttp(res, StatusCodes.OK, dataReturned.message, dataReturned, [])
                }

        } catch (e) {

        }


}


module.exports = updateColaboradorController
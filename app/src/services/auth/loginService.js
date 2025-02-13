const getAllByKeyValueCliente = require("../cliente/getAllByKeyValueCliente");
const getAllByKeyValueColaborador = require("../colaborador/getAllByKeyValueColaborador");
const loginKeycloak = require("../keycloak/login");
const listTipoColaboradorById = require("../tipoDeColaborador/listTipoColaboradorById");

/**
* @param {string} username
* @param {string} password
*/
async function loginService({ username, password }) {
           
    const returnLogin = await loginKeycloak({
        username,
        password,
    })

    const dataColaborador = await getAllByKeyValueColaborador("uuid", returnLogin.userInfo.sub)
    if(dataColaborador.length) {
        const tipoColadorador = await listTipoColaboradorById(dataColaborador[0].tipo_colaborador_id) 
        return await {
                ...dataColaborador[0], 
                tipo: tipoColadorador,
                auth: {
                    accessToken: returnLogin.tokenSet.access_token,
                    refreshToken: returnLogin.tokenSet.refresh_token,
                    userInfo: returnLogin.userInfo,
                   // groups: returnLogin.groups,
                    roles: returnLogin.roles,
                }
        }
    }else{
        // verificar se não é cliente
        const dataCliente = await getAllByKeyValueCliente("uuid", returnLogin.userInfo.sub)

        if(!dataCliente.length) throw new Error("Cliente não enconstrado no Banco de Dados")

        return {
                id: dataCliente[0].id,
                nome_completo: dataCliente[0].denominacao,
                nome_profissional: dataCliente[0].pessoa_contacto,
                inicial: "",
                funcao: "cliente",
                tipo_colaborador_id: dataCliente[0].id,
                data_nascimento: "",
                token_reset: "",
                uuid: dataCliente[0].uuid,
                status: "active",
                created_at: dataCliente[0].created_at,
                updated_at: dataCliente[0].updated_at,
                tipo: {
                    description: 'cliente'
                },
                identificacoes: [],
                contactos: [
                    {
                        type: 'telefone',
                        value: dataCliente[0].contacto_cobranca
                    },
                    {
                        type: 'e-mail',
                        value: dataCliente[0].e_mail
                    }
                ],
                custoFinanceiro: [],
                auth: {
                    accessToken: returnLogin.tokenSet.access_token,
                    refreshToken: returnLogin.tokenSet.refresh_token,
                    userInfo: returnLogin.userInfo,
                   // groups: returnLogin.groups,
                    roles: returnLogin.roles,
                }
        }

    }

}


module.exports = loginService
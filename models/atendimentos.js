const atendimentos = require('../controllers/atendimentos')
const moment = require('moment')
const connection = require('../Infra/Connection')


class Atendimento {
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeValido = atendimento.cliente.length >= 5


        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,

                mensagem: 'Data deve ser maior que a data atual'
            },
            {
                nome: 'cliente',
                valido: nomeValido,
                mensagem: 'Cliente deve possuir nome maior que 5 caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length


        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO atendimentos SET ?'



            connection.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)

                } else {
                    res.status(201).json(resultado)
                }



            })
        }


    }
    lista(res) {
        const sql = 'select * from Atendimentos'
        connection.query(sql, (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)

            } else {
                res.status(200).json(resultado)
            }
        })
    }
    buscaPorId(id, res) {
        const sql = `select * from Atendimentos where ID=${id}`
        connection.query(sql, (erro, resultado) => {
            const atendimento = resultado[0]
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(atendimento)

            }
        })
    }
}
module.exports = new Atendimento
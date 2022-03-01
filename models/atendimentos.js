const atendimentos = require('../controllers/atendimentos')
const moment = require('moment')
const connection = require('../Infra/Connection')

//consultas do banco

class Atendimento {

    //adciona dados 
    adiciona(atendimento, res) {
        //insere a data de criação e data atual do pedido
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')

        //verifica se a data é valida e se o nome possui mais de 5 caracteres
        const dataValida = moment(data).isSameOrAfter(dataCriacao)
        const nomeValido = atendimento.cliente.length >= 5

        //query de informações para casos de erro
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

        //verifica se as variaveis acima possue erro
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        //if insere os dados ou retorna aviso em caso de erro
        if (existemErros) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data }
            const sql = 'INSERT INTO atendimentos SET ?'



            connection.query(sql, atendimentoDatado, (erro, resultado) => {
                if (erro) {
                    res.status(400).json(erro)

                } else {
                    res.status(201).json(atendimento)
                }



            })
        }


    }
    //faz uma busca de todos os itens da lista
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
    //faz uma busca especifica na lista por ID do banco
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
    //metodo de alteração do banco
    altera(id, valores, res) {

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'
        connection.query(sql, [valores, id], (erro, resultado) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores,id})
            }
        })


    }
    // metodo deleta para remorção de itens do banco
    deleta(id, res) {
        const sql = 'DELETE FROM Atendimentos WHERE id=?'
        connection.query(sql, id, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro)
            }else{
                res.status(200).json({id})
            }

        })
    }
}
module.exports = new Atendimento
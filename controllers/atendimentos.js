//requisições
const Atendimento = require('../models/atendimentos')

module.exports = app => {
    //get para puxar todos os itens
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)

    })
    //get para puxar item especifico

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id, res)
        
    })
    //post para inserir um novo item no banco

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.adiciona(atendimento, res)

    })
    //patch para realizar updates no programa
    app.patch('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)

    })
    //delete para deletar um item do banco 
    app.delete('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}
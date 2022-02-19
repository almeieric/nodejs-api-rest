//criação das tableas do banco de dados
class tables {
    init(connection) {
        console.log('tabelas foram chamadas')
        this.connection = connection
        this.criaAtendimentos()

    }
    criaAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS ATENDIMENTOS (ID int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, dataCriacao datetime NOT NULL, data datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'
        this.connection.query(sql, (erro) => {
            if (erro) {
                console.log(erro)

            } else {
                console.log('tabela criada')
            }
        })
    }
}

module.exports = new tables
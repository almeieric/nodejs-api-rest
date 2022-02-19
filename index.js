//importação de bibliotecas

const customExpress = require('./config/customExpress')
const connection = require('./Infra/Connection')
const tables = require('./Infra/tables')


//conexão com o banco de dados mysql
connection.connect(erro =>{
    if(erro){
        console.log(erro)
    } else{
        console.log('conectado ao banco com sucesso')
        tables.init(connection)
        const app = customExpress()


//conexão na porta http
app.listen(3000, () => console.log('servidor funfou'))
    }
    
} )

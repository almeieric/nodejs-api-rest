const customExpress = require('./config/customExpress')
const connection = require('./Infra/Connection')
const tables = require('./Infra/tables')



connection.connect(erro =>{
    if(erro){
        console.log(erro)
    } else{
        console.log('conectado com sucesso')
        tables.init(connection)
        const app = customExpress()


app.listen(3000, () => console.log('servidor funfou'))
    }
    
} )

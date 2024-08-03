const exp=require('express')
// const router = require('router')
const cors=require('cors')
const {Signup,Login} = require('./crudoperations.js')
const app=exp()

app.use(cors())
app.use(exp.json())

const routes =exp.Router()

app.use('/', routes)

routes.post('/signup', Signup)
routes.post('/login', Login)

app.use(exp.json())

const port=process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})
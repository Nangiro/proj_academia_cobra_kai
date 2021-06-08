const express = require('express')
const routes = express.Router()

const login = require('./controllers/login')
const menu = require('./controllers/menu')
const students = require('./controllers/students')
const teachers = require('./controllers/teachers')
const secretaries = require('./controllers/secretaries')

routes.get('/', function(req,res) {
    return res.redirect("/login")
})

routes.get('/login', login.index)

routes.get('/menu', menu.index)
routes.get('/menu/giveAdmRole', menu.giveAdmRole)
routes.get('/menu/giveSecretaryRole', menu.giveSecretaryRole)

routes.get('/students/check', students.check)
routes.get('/students/create', students.create)
routes.get('/students/update', students.update)
routes.get('/students/delete', students.delete)


routes.get('/teachers/create', teachers.create)
routes.get('/teachers/check', teachers.check)
routes.get('/teachers/update', teachers.update)
routes.get('/teachers/delete', teachers.delete)

routes.get('/secretaries/create', secretaries.create)
routes.get('/secretaries/check', secretaries.check)
routes.get('/secretaries/update', secretaries.update)
routes.get('/secretaries/delete', secretaries.delete)

module.exports = routes
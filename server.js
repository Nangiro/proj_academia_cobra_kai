const express = require('express')
const nunjucks = require('nunjucks')
const methodOverride = require ('method-override')
const routes = require("./routes")

const server = express ()
server.use(express.urlencoded({extended:true}))
server.use(express.static('public')) //Para entregar arquivos estáticos como imagens, arquivos CSS, e arquivos JavaScript
server.use(methodOverride('_method'))
server.use(routes)

server.set("view engine", "njk")

nunjucks.configure("views",{
    express: server,
    autoescape: false, //Para colocar links no meio de frases
    noCache: true, //Pega informacao do servidor e nao da cache
    watch: true
})

server.listen(5000, function() {
    console.log("Server is running")
})
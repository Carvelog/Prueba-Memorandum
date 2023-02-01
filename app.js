const express = require('express')
const axios = require('axios').default
const bodyParser = require('body-parser')

const app = express()
const PORT = 8000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.set('view engine', 'ejs');

const middleware = (baseUrl) => {
    return (req, res, next) => {
        req.timeInfo = `Request a ${req.route.path} ${Date.now()}`
        next()
    }
}

app.get('/', middleware(), (req, res) => {
    console.log(req.timeInfo)
    res.send(JSON.stringify({ status: 200, message: 'Este request/response está OK' }))
})

app.get('/data', (req, res, next) => {
    axios.get('https://www.el-tiempo.net/api/json/v2/provincias/50/municipios/50297')
    .then(response => {
        res.render('partials/index', {data: response.data})
    })
    .catch(err => {
        // Handle Error Here
        console.error(err);
    });
})


app.listen(PORT, (error) =>{
    if(!error)
        console.log("On port " + PORT)
    else 
        console.log("Error", error)
    }
);
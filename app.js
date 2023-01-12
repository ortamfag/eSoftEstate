const express = require('express')
const cookieParser = require('cookie-parser')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const PORT = process.env.PORT || 5000

require('dotenv').config()
const app = express()
app.use(cookieParser());

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// Static Files
app.use(express.static('public'));

// Templating Engine
app.engine('hbs', exphbs.engine( {extname: '.hbs'} ))
app.set('view engine', 'hbs')

// Connection Pool
const pool = mysql.createPool({
    connectionLimit : 100,
    host            : process.env.DB_HOST,
    port            : process.env.DB_PORT,
    user            : process.env.DB_USER,
    password        : process.env.DB_PASS,
    database        : process.env.DB_NAME
})

// Connect to DB
pool.getConnection((err, connection) => {
    if(err) throw err; //not connected
    console.log('Connected as ID' + connection.threadId)
})

const routes = require('./server/routes/authRouter')
app.use('/', routes);


const start = () => {
    try {
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start()

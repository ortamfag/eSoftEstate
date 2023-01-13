const mysql = require('mysql')

// Connection Pool
const pool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})

//Render the home page
exports.clientView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM client', (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('client', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

//Render the login page
exports.addClientView = (req, res) => {
    res.render('addClient')
}

// Reg User
exports.addClient = (req, res) => {
    const {firstName, lastName, patronymic, email, phone} = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        connection.query('SELECT * FROM client WHERE Email = ?', [email], (err, candidate) => {
            connection.release();

            if (!err) {
                if (candidate.length >= 1) {
                    res.render('addClient', { 
                        alertBad: "Пользователь с таким E-mail уже существует" 
                    })
                } else {
                    switch(0) {
                        case firstName.length:
                            firstName = '-'
                            break

                        case lastName.length:
                            lastName = '-'
                            break

                        case patronymic.length:
                            patronymic = '-'
                            break

                        case email.length:
                            res.render('addClient', { 
                                alertEmail: "Электронная почта не может быть пустой" 
                            })
                            break

                        case phone.length:
                            res.render('addClient', { 
                                alertPassword: "Телефон не может быть пустым" 
                            })
                            break

                        default:
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)

                                connection.query('INSERT INTO client SET firstName = ?, lastName = ?, patronymic = ?, email = ?, phone = ?', [firstName, lastName, patronymic, email, phone], (err, rows) => {
                                    connection.release();
                        
                                    if (!err) {
                                        res.render('addClient', { alertSuccess: "Пользователь зарегистрирован" })
                                    } else {
                                        console.log(err);
                                    }
                                })
                            })
                            break
                    }
                }

            } else {
                console.log(err);
            }
        })
    })
}
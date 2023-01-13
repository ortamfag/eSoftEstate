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
exports.rieltorView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM rieltor', (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('rieltor', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

//Render the login page
exports.addRieltorView = (req, res) => {
    res.render('addRieltor')
}

// Reg Rieltor
exports.addRieltor = (req, res) => {
    const {firstName, lastName, patronymic, comission} = req.body

    switch(0) {
        case firstName.length:
            res.render('addRieltor', { 
                alert: "ФИО должно быть заполнено" 
            })
            break

        case lastName.length:
            res.render('addRieltor', { 
                alert: "ФИО должно быть заполнено"  
            })
            break

        case patronymic.length:
            res.render('addRieltor', { 
                alert: "ФИО должно быть заполнено" 
            })
            break

        case comission.length:
            res.render('addRieltor', { 
                alertEmail: "Укажите комиссию" 
            })
            break

        default:
            pool.getConnection((err, connection) => {
                if (err) throw err; //not connected
                console.log('Connected as ID' + connection.threadId)

                connection.query('INSERT INTO rieltor SET firstName = ?, lastName = ?, patronymic = ?, comission = ?', [firstName, lastName, patronymic, comission], (err, rows) => {
                    connection.release();
        
                    if (!err) {
                        res.render('addRieltor', { alertSuccess: "Риелтор зарегистрирован" })
                    } else {
                        console.log(err);
                    }
                })
            })
            break
    }
}

//Delete rieltor
exports.deleteRieltor = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM rieltor WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM rieltor', (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('rieltor', { rows })
                        } else {
                            console.log(err);
                        }
                    })
                })
            } else {
                console.log(err);
            }
        })
    })
}

//Edit rieltor

exports.editRieltorView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM rieltor WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('editRieltor', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

exports.editRieltor = (req, res) => {
    const {firstName, lastName, patronymic, comission} = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('UPDATE rieltor SET firstName = ?, lastName = ?, patronymic = ?, comission = ? WHERE ID = ?', [firstName, lastName, patronymic, comission, req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM rieltor WHERE ID = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('editRieltor', { rows, alert: `${firstName} обновлен` })
                        } else {
                            console.log(err);
                        }
                    })
                })
            } else {
                console.log(err);
            }
        })
    })
}
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
                        alertBad: "Клиент с таким E-mail уже существует" 
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
                                        res.render('addClient', { alertSuccess: "Клиент зарегистрирован" })
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

//Delete client
exports.deleteClient = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, busy) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                if (busy[0].isBusy != '1') {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; //not connected
                        console.log('Connected as ID' + connection.threadId)
                
                        // User the connection
                        connection.query('DELETE FROM client WHERE id = ?', [req.params.id], (err, rows) => {
                            //when done with connection, release it
                            connection.release();
                
                            if (!err) {
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
                            } else {
                                console.log(err);
                            }
                        })
                    })
                } else {
                    pool.getConnection((err, connection) => {
                        if (err) throw err; //not connected
                        console.log('Connected as ID' + connection.threadId)
                
                        // User the connection
                        connection.query('SELECT * FROM client', (err, rows) => {
                            //when done with connection, release it
                            connection.release();
                
                            if (!err) {
                                res.render('client', { rows, AlertDelete: "Клиент участвует в сделке" })
                            } else {
                                console.log(err);
                            }
                        })
                    })
                }
            } else {
                console.log(err);
            }
        })
    })
}

//Edit client

exports.editClientView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('editClient', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

exports.editClient = (req, res) => {
    const {firstName, lastName, patronymic, email, phone} = req.body

    console.log(phone)

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('UPDATE client SET firstName = ?, lastName = ?, patronymic = ?, email = ?, phone = ? WHERE ID = ?', [firstName, lastName, patronymic, email, phone, req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM client WHERE ID = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('editClient', { rows, alert: `${firstName} обновлен` })
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

exports.clientActivityView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, client) => {
            //when done with connection, release it
            connection.release();

            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM requirement_flat WHERE client = ?', [client], (err, flat) => {
                        //when done with connection, release it
                        connection.release();
            
                        for (let i = 0; i <= flat.length - 1; i++) {
                            if (flat[i].client !== client) {
                                flat.splice(i, 1)
                            }
                        }
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM requirement_house WHERE client = ?', [client], (err, house) => {
                                    //when done with connection, release it
                                    connection.release();

                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_territory WHERE client = ?', [client], (err, territory) => {
                                                //when done with connection, release it
                                                connection.release();
                                                
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM offer WHERE client = ?', [client], (err, offer) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                res.render('clientActivity', { flat, house, territory, offer })
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
            } else {
                console.log(err);
            }
        })
    })
}
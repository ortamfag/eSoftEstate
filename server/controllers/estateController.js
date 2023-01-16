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
exports.estateView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM flat', (err, flat) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM house', (err, house) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM territory', (err, territory) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        res.render('estate', { flat, house, territory })
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

//Render the login page
exports.addEstateView = (req, res) => {
    res.render('addEstate')
}

// Reg User
exports.addEstate = (req, res) => {
    const { city, street, entranceNumber, flatNumber, latitude, longitude, EstateDropdown, flat_floor, house_floor, flat_roomNumber, house_roomNumber, flat_space, house_space, territory_space } = req.body

    switch(EstateDropdown) {
        case 'territory':
            pool.getConnection((err, connection) => {
                if (err) throw err; //not connected
                console.log('Connected as ID' + connection.threadId)
        
                connection.query('INSERT INTO territory SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, space = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, territory_space], (err, rows) => {
                    connection.release();
        
                    if (!err) {
                        res.render('addEstate', { alertSuccess: "Земля добавлена" })
                    } else {
                        console.log(err);
                    }
                })
            })
            break

        case 'flat':
            pool.getConnection((err, connection) => {
                if (err) throw err; //not connected
                console.log('Connected as ID' + connection.threadId)
        
                connection.query('INSERT INTO flat SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, floor = ?, roomNumber = ?, space = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, flat_floor, flat_roomNumber, flat_space], (err, rows) => {
                    connection.release();
        
                    if (!err) {
                        res.render('addEstate', { alertSuccess: "Квартира добавлена" })
                    } else {
                        console.log(err);
                    }
                })
            })
            break

        case 'house':
            pool.getConnection((err, connection) => {
                if (err) throw err; //not connected
                console.log('Connected as ID' + connection.threadId)
        
                connection.query('INSERT INTO house SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, floor = ?, roomNumber = ?, space = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, house_floor, house_roomNumber, house_space], (err, rows) => {
                    connection.release();
        
                    if (!err) {
                        res.render('addEstate', { alertSuccess: "Дом добавлен" })
                    } else {
                        console.log(err);
                    }
                })
            })
            break

    }
    
}

// //Delete client
// exports.deleteClient = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected
//         console.log('Connected as ID' + connection.threadId)

//         // User the connection
//         connection.query('DELETE FROM client WHERE id = ?', [req.params.id], (err, rows) => {
//             //when done with connection, release it
//             connection.release();

//             if (!err) {
//                 pool.getConnection((err, connection) => {
//                     if (err) throw err; //not connected
//                     console.log('Connected as ID' + connection.threadId)
            
//                     // User the connection
//                     connection.query('SELECT * FROM client', (err, rows) => {
//                         //when done with connection, release it
//                         connection.release();
            
//                         if (!err) {
//                             res.render('client', { rows })
//                         } else {
//                             console.log(err);
//                         }
//                     })
//                 })
//             } else {
//                 console.log(err);
//             }
//         })
//     })
// }

// //Edit client

// exports.editClientView = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected
//         console.log('Connected as ID' + connection.threadId)

//         // User the connection
//         connection.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, rows) => {
//             //when done with connection, release it
//             connection.release();

//             if (!err) {
//                 res.render('editClient', { rows })
//             } else {
//                 console.log(err);
//             }
//         })
//     })
// }

// exports.editClient = (req, res) => {
//     const {firstName, lastName, patronymic, email, phone} = req.body

//     console.log(phone)

//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected
//         console.log('Connected as ID' + connection.threadId)

//         // User the connection
//         connection.query('UPDATE client SET firstName = ?, lastName = ?, patronymic = ?, email = ?, phone = ? WHERE ID = ?', [firstName, lastName, patronymic, email, phone, req.params.id], (err, rows) => {
//             //when done with connection, release it
//             connection.release();

//             if (!err) {
//                 pool.getConnection((err, connection) => {
//                     if (err) throw err; //not connected
//                     console.log('Connected as ID' + connection.threadId)
            
//                     // User the connection
//                     connection.query('SELECT * FROM client WHERE ID = ?', [req.params.id], (err, rows) => {
//                         //when done with connection, release it
//                         connection.release();
            
//                         if (!err) {
//                             res.render('editClient', { rows, alert: `${firstName} обновлен` })
//                         } else {
//                             console.log(err);
//                         }
//                     })
//                 })
//             } else {
//                 console.log(err);
//             }
//         })
//     })
// }
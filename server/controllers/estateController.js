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

exports.addEstateView = (req, res) => {
    res.render('addEstate')
}

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

//Delete estate
exports.deleteEstateFlat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM flat WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
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
                                                    res.redirect('/estate')
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

exports.deleteEstateHouse = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM house WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
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
                                                    res.redirect('/estate')
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

exports.deleteEstateTerritory = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM territory WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
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
                                                    res.redirect('/estate')
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

//Edit Estate

exports.editEstateFlatView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM flat WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('editEstateFlat', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

exports.editEstateFlat = (req, res) => {
    const { city, street, entranceNumber, flatNumber, latitude, longitude, flat_floor, flat_roomNumber, flat_space } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('UPDATE flat SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, floor = ?, roomNumber = ?, space = ? WHERE id = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, flat_floor, flat_roomNumber, flat_space, req.params.id], (err) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM flat WHERE ID = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('editEstateFlat', { rows, alert: `Квартира обновлена` })
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

exports.editEstateHouseView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM house WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('editEstateHouse', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

exports.editEstateHouse = (req, res) => {
    const { city, street, entranceNumber, flatNumber, latitude, longitude, house_floor, house_roomNumber, house_space } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('UPDATE house SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, floor = ?, roomNumber = ?, space = ? WHERE id = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, house_floor, house_roomNumber, house_space, req.params.id], (err) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM house WHERE ID = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('editEstateHouse', { rows, alert: `Дом обновлен` })
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

exports.editEstateTerritoryView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM territory WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('editEstateTerritory', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

exports.editEstateTerritory = (req, res) => {
    const { city, street, entranceNumber, flatNumber, latitude, longitude, territory_space } = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('UPDATE territory SET city = ?, street = ?, entranceNumber = ?, flatNumber = ?, latitude = ?, longitude = ?, space = ? WHERE id = ?', [city, street, entranceNumber, flatNumber, latitude, longitude, territory_space, req.params.id], (err) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM territory WHERE ID = ?', [req.params.id], (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('editEstateTerritory', { rows, alert: `Земля обновлена` })
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
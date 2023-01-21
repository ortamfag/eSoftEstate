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
exports.offerView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM offer', (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                res.render('offer', { rows })
            } else {
                console.log(err);
            }
        })
    })
}

//Render the addOffer page
exports.addOfferView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM client', (err, client) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM rieltor', (err, rieltor) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM flat', (err, flatEstate) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM house', (err, houseEstate) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM territory', (err, territoryEstate) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                res.render('addOffer', { client, rieltor, flatEstate, houseEstate, territoryEstate })
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

// Add Offer
exports.addOffer = (req, res) => {
    const {OfferDropdownClient, OfferDropdownRieltor, OfferDropdownEstate, price} = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        connection.query('SELECT * FROM client WHERE ID = ?', [OfferDropdownClient], (err, client) => {
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    connection.query('SELECT * FROM rieltor WHERE ID = ?', [OfferDropdownRieltor], (err, rieltor) => {
                        connection.release();
            
                        if (!err) {
                            const whatType = OfferDropdownEstate.replace(/[0-9]/g, '')
                            const estateID = OfferDropdownEstate.replace(/\D+/g, "")

                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            switch(whatType) {
                                case 'flat':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM flat WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();
                                            
                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('INSERT INTO offer SET client = ?, rieltor = ?, estate = ?, price = ?', [client, rieltor, estate, price], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            res.render('addOffer', { alertSuccess: "Предложение зарегистрировано" })
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
                                    break

                                case 'house':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM house WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();

                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('INSERT INTO offer SET client = ?, rieltor = ?, estate = ?, price = ?', [client, rieltor, estate, price], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            res.render('addOffer', { alertSuccess: "Предложение зарегистрировано" })
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
                                    break

                                case 'territory':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM territory WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();

                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('INSERT INTO offer SET client = ?, rieltor = ?, estate = ?, price = ?', [client, rieltor, estate, price], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            res.render('addOffer', { alertSuccess: "Предложение зарегистрировано" })
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
                                    break
                            }
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

//Delete offer
exports.deleteOffer = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM offer WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM offer', (err, rows) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            res.render('offer', { rows })
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

//Edit offer

exports.editOfferView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM offer WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM client', (err, client) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM rieltor', (err, rieltor) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM flat', (err, flatEstate) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM house', (err, houseEstate) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    // User the connection
                                                                    connection.query('SELECT * FROM territory', (err, territoryEstate) => {
                                                                        //when done with connection, release it
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            res.render('editOffer', { rows, client, rieltor, flatEstate, houseEstate, territoryEstate })
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
            } else {
                console.log(err);
            }
        })
    })
}

exports.editOffer = (req, res) => {
    const {OfferDropdownClient, OfferDropdownRieltor, OfferDropdownEstate, price} = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        connection.query('SELECT * FROM client WHERE ID = ?', [OfferDropdownClient], (err, client) => {
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    connection.query('SELECT * FROM rieltor WHERE ID = ?', [OfferDropdownRieltor], (err, rieltor) => {
                        connection.release();
            
                        if (!err) {
                            const whatType = OfferDropdownEstate.replace(/[0-9]/g, '')
                            const estateID = OfferDropdownEstate.replace(/\D+/g, "")

                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            switch(whatType) {
                                case 'flat':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM flat WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();
                                            
                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('UPDATE offer SET client = ?, rieltor = ?, estate = ?, price = ? WHERE id = ?', [client, rieltor, estate, price, req.params.id], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            pool.getConnection((err, connection) => {
                                                                if (err) throw err; //not connected
                                                                console.log('Connected as ID' + connection.threadId)
                                                            
                                                                connection.query('SELECT * FROM offer WHERE ID = ?', [req.params.id], (err, rows) => {
                                                                    connection.release();
                                                            
                                                                    if (!err) {
                                                                        res.render('editOffer', { rows, client, rieltor, estate, price, alertSuccess: "Предложение изменено" })
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
                                    break

                                case 'house':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM house WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();

                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('UPDATE offer SET client = ?, rieltor = ?, estate = ?, price = ? WHERE id = ?', [client, rieltor, estate, price, req.params.id], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            pool.getConnection((err, connection) => {
                                                                if (err) throw err; //not connected
                                                                console.log('Connected as ID' + connection.threadId)
                                                            
                                                                connection.query('SELECT * FROM offer WHERE ID = ?', [req.params.id], (err, rows) => {
                                                                    connection.release();
                                                            
                                                                    if (!err) {
                                                                        res.render('editOffer', { rows, client, rieltor, estate, price, alertSuccess: "Предложение изменено" })
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
                                    break

                                case 'territory':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('SELECT * FROM territory WHERE ID = ?', [estateID], (err, estate) => {
                                            connection.release();

                                            estate = estate[0].city + ' ' + estate[0].street + ' ' + estate[0].entranceNumber + ' ' + estate[0].flatNumber
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                                
                                                    connection.query('UPDATE offer SET client = ?, rieltor = ?, estate = ?, price = ? WHERE id = ?', [client, rieltor, estate, price, req.params.id], (err, rows) => {
                                                        connection.release();
                                                
                                                        if (!err) {
                                                            pool.getConnection((err, connection) => {
                                                                if (err) throw err; //not connected
                                                                console.log('Connected as ID' + connection.threadId)
                                                            
                                                                connection.query('SELECT * FROM offer WHERE ID = ?', [req.params.id], (err, rows) => {
                                                                    connection.release();
                                                            
                                                                    if (!err) {
                                                                        res.render('editOffer', { rows, client, rieltor, estate, price, alertSuccess: "Предложение изменено" })
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
                                    break
                            }
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
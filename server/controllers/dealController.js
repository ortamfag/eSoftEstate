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
exports.dealView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM deal', (err, rows) => {
            //when done with connection, release it
            connection.release();
            if (!err) {
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].requirement_flat != '0') {
                        pool.getConnection((err, connection) => {
                            if (err) throw err; //not connected
                            console.log('Connected as ID' + connection.threadId)
                    
                            // User the connection
                            connection.query('SELECT * FROM requirement_flat WHERE id = ?', [rows[i].requirement_flat], (err, flat) => {
                                //when done with connection, release it
                                connection.release();
                                rows[i].requirement = flat[0].client + ' ' + flat[0].address + ' ' + flat[0].minPrice + '-' + flat[0].maxPrice + '₽ '
                                
                    
                                if (!err) {
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        // User the connection
                                        connection.query('SELECT * FROM offer WHERE id = ?', [rows[i].offer], (err, offer) => {
                                            //when done with connection, release it
                                            connection.release();
                                            
                                            rows[i].offer = offer[0].client + ' ' + offer[0].estate + ' ' + offer[0].price + '₽ '
                                            
                                            if (!err) {
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
                    } else if (rows[i].requirement_house != '0') {
                        pool.getConnection((err, connection) => {
                            if (err) throw err; //not connected
                            console.log('Connected as ID' + connection.threadId)
                    
                            // User the connection
                            connection.query('SELECT * FROM requirement_house WHERE id = ?', [rows[i].requirement_house], (err, house) => {
                                //when done with connection, release it
                                connection.release();

                                rows[i].requirement = house[0].client + ' ' + house[0].address + ' ' + house[0].minPrice + '-' + house[0].maxPrice + '₽ '
                                
                    
                                if (!err) {
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        // User the connection
                                        connection.query('SELECT * FROM offer WHERE id = ?', [rows[i].offer], (err, offer) => {
                                            //when done with connection, release it
                                            connection.release();
                                            
                                            rows[i].offer = offer[0].client + ' ' + offer[0].estate + ' ' + offer[0].price + '₽ '
                                            
                                            if (!err) {
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
                    } else if (rows[i].requirement_territory != '0') {
                        pool.getConnection((err, connection) => {
                            if (err) throw err; //not connected
                            console.log('Connected as ID' + connection.threadId)
                    
                            // User the connection
                            connection.query('SELECT * FROM requirement_territory WHERE id = ?', [rows[i].requirement_territory], (err, territory) => {
                                //when done with connection, release it
                                connection.release();

                                rows[i].requirement = territory[0].client + ' ' + territory[0].address + ' ' + territory[0].minPrice + '-' + territory[0].maxPrice + '₽ '
                                
                    
                                if (!err) {
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        // User the connection
                                        connection.query('SELECT * FROM offer WHERE id = ?', [rows[i].offer], (err, offer) => {
                                            //when done with connection, release it
                                            connection.release();
                                            
                                            rows[i].offer = offer[0].client + ' ' + offer[0].estate + ' ' + offer[0].price + '₽ '
                                            
                                            if (!err) {
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
                }

                res.render('deal', { rows })


            } else {
                console.log(err);
            }
        })
    })
}


exports.addDealView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        connection.query('SELECT * FROM offer', (err, offer) => {
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                connection.release();
                                    
                                                if (!err) {
                                                    res.render('addDeal', { offer, flat, house, territory })
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

exports.addDeal = (req, res) => {
    const {OfferDropdownDeal, OfferDropdownRequirement} = req.body

    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        connection.query('SELECT * FROM offer WHERE id = ?', [OfferDropdownDeal], (err, offerResult) => {
            connection.release();

            if (!err) {
                const whatType = OfferDropdownRequirement.replace(/[0-9]/g, '')
                const estateID = OfferDropdownRequirement.replace(/\D+/g, "")

                switch(whatType) {
                    case 'flat':
                        pool.getConnection((err, connection) => {
                            if (err) throw err; //not connected
                            console.log('Connected as ID' + connection.threadId)
                    
                            connection.query('SELECT * FROM requirement_flat WHERE id = ?', [estateID], (err, estate) => {
                                connection.release();
                    
                                if (!err) {
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('INSERT INTO deal SET offer = ?, requirement_flat = ?, requirement_house = ?, requirement_territory = ?', [OfferDropdownDeal, estateID, '-', '-'], (err, deal) => {
                                            connection.release();
                                
                                            if (!err) {
                                                pool.getConnection((err, connection) => {
                                                    if (err) throw err; //not connected
                                                    console.log('Connected as ID' + connection.threadId)
                                            
                                                    connection.query('SELECT * FROM offer', (err, offer) => {
                                                        connection.release();
                                            
                                                        if (!err) {
                                                            pool.getConnection((err, connection) => {
                                                                if (err) throw err; //not connected
                                                                console.log('Connected as ID' + connection.threadId)
                                                        
                                                                connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                                    connection.release();
                                                        
                                                                    if (!err) {
                                                                        pool.getConnection((err, connection) => {
                                                                            if (err) throw err; //not connected
                                                                            console.log('Connected as ID' + connection.threadId)
                                                                    
                                                                            connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                                                connection.release();
                                                                    
                                                                                if (!err) {
                                                                                    pool.getConnection((err, connection) => {
                                                                                        if (err) throw err; //not connected
                                                                                        console.log('Connected as ID' + connection.threadId)
                                                                                
                                                                                        connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                                            connection.release();
                                                                                
                                                                                            if (!err) {
                                                                                                res.render('addDeal', { offerResult, offer, flat, house, territory, alertSuccess: "Сделка зарегистрирована" })
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
                        break

                        case 'house':
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('SELECT * FROM requirement_house WHERE id = ?', [estateID], (err, estate) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            connection.query('INSERT INTO deal SET offer = ?, requirement_flat = ?, requirement_house = ?, requirement_territory = ?', [OfferDropdownDeal, '-', estateID, '-'], (err, deal) => {
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        connection.query('SELECT * FROM offer', (err, offer) => {
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            pool.getConnection((err, connection) => {
                                                                                if (err) throw err; //not connected
                                                                                console.log('Connected as ID' + connection.threadId)
                                                                        
                                                                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                                                    connection.release();
                                                                        
                                                                                    if (!err) {
                                                                                        pool.getConnection((err, connection) => {
                                                                                            if (err) throw err; //not connected
                                                                                            console.log('Connected as ID' + connection.threadId)
                                                                                    
                                                                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                                                connection.release();
                                                                                    
                                                                                                if (!err) {
                                                                                                    res.render('addDeal', { offerResult, offer, flat, house, territory, alertSuccess: "Сделка зарегистрирована" })
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
                            break

                            case 'territory':
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('SELECT * FROM requirement_territory WHERE id = ?', [estateID], (err, estate) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            connection.query('INSERT INTO deal SET offer = ?, requirement_flat = ?, requirement_house = ?, requirement_territory = ?', [OfferDropdownDeal, '-', '-', estateID], (err, deal) => {
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        connection.query('SELECT * FROM offer', (err, offer) => {
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            pool.getConnection((err, connection) => {
                                                                                if (err) throw err; //not connected
                                                                                console.log('Connected as ID' + connection.threadId)
                                                                        
                                                                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                                                    connection.release();
                                                                        
                                                                                    if (!err) {
                                                                                        pool.getConnection((err, connection) => {
                                                                                            if (err) throw err; //not connected
                                                                                            console.log('Connected as ID' + connection.threadId)
                                                                                    
                                                                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                                                connection.release();
                                                                                    
                                                                                                if (!err) {
                                                                                                    res.render('addDeal', { offerResult, offer, flat, house, territory, alertSuccess: "Сделка зарегистрирована" })
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
                            break
                }
            } else {
                console.log(err);
            }
        })
    })
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

// exports.clientActivityView = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if (err) throw err; //not connected
//         console.log('Connected as ID' + connection.threadId)

//         // User the connection
//         connection.query('SELECT * FROM client WHERE id = ?', [req.params.id], (err, client) => {
//             //when done with connection, release it
//             connection.release();

//             client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic

//             if (!err) {
//                 pool.getConnection((err, connection) => {
//                     if (err) throw err; //not connected
//                     console.log('Connected as ID' + connection.threadId)
            
//                     // User the connection
//                     connection.query('SELECT * FROM requirement_flat WHERE client = ?', [client], (err, flat) => {
//                         //when done with connection, release it
//                         connection.release();
            
//                         for (let i = 0; i <= flat.length - 1; i++) {
//                             if (flat[i].client !== client) {
//                                 flat.splice(i, 1)
//                             }
//                         }
            
//                         if (!err) {
//                             pool.getConnection((err, connection) => {
//                                 if (err) throw err; //not connected
//                                 console.log('Connected as ID' + connection.threadId)
                        
//                                 // User the connection
//                                 connection.query('SELECT * FROM requirement_house WHERE client = ?', [client], (err, house) => {
//                                     //when done with connection, release it
//                                     connection.release();

                        
//                                     if (!err) {
//                                         pool.getConnection((err, connection) => {
//                                             if (err) throw err; //not connected
//                                             console.log('Connected as ID' + connection.threadId)
                                    
//                                             // User the connection
//                                             connection.query('SELECT * FROM requirement_territory WHERE client = ?', [client], (err, territory) => {
//                                                 //when done with connection, release it
//                                                 connection.release();
                                                
                                    
//                                                 if (!err) {
//                                                     pool.getConnection((err, connection) => {
//                                                         if (err) throw err; //not connected
//                                                         console.log('Connected as ID' + connection.threadId)
                                                
//                                                         // User the connection
//                                                         connection.query('SELECT * FROM offer WHERE client = ?', [client], (err, offer) => {
//                                                             //when done with connection, release it
//                                                             connection.release();
                                                
//                                                             if (!err) {
//                                                                 res.render('clientActivity', { flat, house, territory, offer })
//                                                             } else {
//                                                                 console.log(err);
//                                                             }
//                                                         })
//                                                     })
//                                                 } else {
//                                                     console.log(err);
//                                                 }
//                                             })
//                                         })
//                                     } else {
//                                         console.log(err);
//                                     }
//                                 })
//                             })
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
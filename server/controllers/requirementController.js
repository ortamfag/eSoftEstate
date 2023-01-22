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

exports.requirementView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM requirement_flat', (err, flat) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM requirement_house', (err, house) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        res.render('requirement', { flat, house, territory })
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

exports.addRequirementView = (req, res) => {
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
                                                                res.render('addRequirement', { client, rieltor, flatEstate, houseEstate, territoryEstate })
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

exports.addRequirement = (req, res) => {
    const { OfferDropdownClient, OfferDropdownRieltor, EstateDropdown, minPrice, maxPrice, address, minSpace, maxSpace, flat_minRoom, flat_maxRoom, flat_minFloor, flat_maxFloor, house_minRoom, house_maxRoom, house_minFloor, house_maxFloor } = req.body
    
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
                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            switch(EstateDropdown) {
                                case 'territory':
                                    pool.getConnection((err, connection) => {
                                        if (err) throw err; //not connected
                                        console.log('Connected as ID' + connection.threadId)
                                
                                        connection.query('INSERT INTO requirement_territory SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace], (err, rows) => {
                                            connection.release();
                                
                                            if (!err) {
                                                res.render('addRequirement', { alertSuccess: "Земля добавлена" })
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
                                
                                        connection.query('INSERT INTO requirement_flat SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ?, minRoom = ?, maxRoom = ?, minFloor = ?, maxFloor = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace, flat_minRoom, flat_maxRoom, flat_minFloor, flat_maxFloor], (err, rows) => {
                                            connection.release();
                                
                                            if (!err) {
                                                res.render('addRequirement', { alertSuccess: "Квартира добавлена" })
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
                                
                                        connection.query('INSERT INTO requirement_house SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ?, minRoom = ?, maxRoom = ?, minFloor = ?, maxFloor = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace, house_minRoom, house_maxRoom, house_minFloor, house_maxFloor], (err, rows) => {
                                            connection.release();
                                
                                            if (!err) {
                                                res.render('addRequirement', { alertSuccess: "Дом добавлен" })
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

//Delete flat
exports.deleteRequirementFlat = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM requirement_flat WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    res.redirect('/requirement')
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

exports.deleteRequirementTerritory = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM requirement_territory WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    res.redirect('/requirement')
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

exports.deleteRequirementHouse = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('DELETE FROM requirement_house WHERE id = ?', [req.params.id], (err, rows) => {
            //when done with connection, release it
            connection.release();

            if (!err) {
                pool.getConnection((err, connection) => {
                    if (err) throw err; //not connected
                    console.log('Connected as ID' + connection.threadId)
            
                    // User the connection
                    connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                        //when done with connection, release it
                        connection.release();
            
                        if (!err) {
                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                // User the connection
                                connection.query('SELECT * FROM requirement_house', (err, house) => {
                                    //when done with connection, release it
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    res.redirect('/requirement')
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

//Edit Requirement

exports.editRequirementFlatView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM requirement_flat WHERE id = ?', [req.params.id], (err, rows) => {
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
                                                                            res.render('editRequirementFlat', { rows, client, rieltor, flatEstate, houseEstate, territoryEstate })
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

exports.editRequirementFlat = (req, res) => {
    const { OfferDropdownClient, OfferDropdownRieltor, minPrice, maxPrice, address, minSpace, maxSpace, flat_minRoom, flat_maxRoom, flat_minFloor, flat_maxFloor } = req.body
    
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
                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('UPDATE requirement_flat SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ?, minRoom = ?, maxRoom = ?, minFloor = ?, maxFloor = ? WHERE id = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace, flat_minRoom, flat_maxRoom, flat_minFloor, flat_maxFloor, req.params.id], (err, rows) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    // User the connection
                                                                    connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                        //when done with connection, release it
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            res.render('requirement', { flat, house, territory })
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

exports.editRequirementHouseView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM requirement_house WHERE id = ?', [req.params.id], (err, rows) => {
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
                                                                            res.render('editRequirementHouse', { rows, client, rieltor, flatEstate, houseEstate, territoryEstate })
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

exports.editRequirementHouse = (req, res) => {
    const { OfferDropdownClient, OfferDropdownRieltor, minPrice, maxPrice, address, minSpace, maxSpace, house_minRoom, house_maxRoom, house_minFloor, house_maxFloor } = req.body
    
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
                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('UPDATE requirement_house SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ?, minRoom = ?, maxRoom = ?, minFloor = ?, maxFloor = ? WHERE id = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace, house_minRoom, house_maxRoom, house_minFloor, house_maxFloor, req.params.id], (err, rows) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    // User the connection
                                                                    connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                        //when done with connection, release it
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            res.render('requirement', { flat, house, territory })
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

exports.editRequirementTerritoryView = (req, res) => {
    pool.getConnection((err, connection) => {
        if (err) throw err; //not connected
        console.log('Connected as ID' + connection.threadId)

        // User the connection
        connection.query('SELECT * FROM requirement_territory WHERE id = ?', [req.params.id], (err, rows) => {
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
                                                                            res.render('editRequirementTerritory', { rows, client, rieltor, flatEstate, houseEstate, territoryEstate })
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

exports.editRequirementTerritory = (req, res) => {
    const { OfferDropdownClient, OfferDropdownRieltor, minPrice, maxPrice, address, minSpace, maxSpace } = req.body
    
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
                            client = client[0].lastName + ' ' + client[0].firstName + ' ' + client[0].patronymic
                            rieltor = rieltor[0].lastName + ' ' + rieltor[0].firstName + ' ' + rieltor[0].patronymic

                            pool.getConnection((err, connection) => {
                                if (err) throw err; //not connected
                                console.log('Connected as ID' + connection.threadId)
                        
                                connection.query('UPDATE requirement_territory SET client = ?, rieltor = ?, minPrice = ?, maxPrice = ?, address = ?, minSpace = ?, maxSpace = ? WHERE id = ?', [client, rieltor, minPrice, maxPrice, address, minSpace, maxSpace, req.params.id], (err, rows) => {
                                    connection.release();
                        
                                    if (!err) {
                                        pool.getConnection((err, connection) => {
                                            if (err) throw err; //not connected
                                            console.log('Connected as ID' + connection.threadId)
                                    
                                            // User the connection
                                            connection.query('SELECT * FROM requirement_flat', (err, flat) => {
                                                //when done with connection, release it
                                                connection.release();
                                    
                                                if (!err) {
                                                    pool.getConnection((err, connection) => {
                                                        if (err) throw err; //not connected
                                                        console.log('Connected as ID' + connection.threadId)
                                                
                                                        // User the connection
                                                        connection.query('SELECT * FROM requirement_house', (err, house) => {
                                                            //when done with connection, release it
                                                            connection.release();
                                                
                                                            if (!err) {
                                                                pool.getConnection((err, connection) => {
                                                                    if (err) throw err; //not connected
                                                                    console.log('Connected as ID' + connection.threadId)
                                                            
                                                                    // User the connection
                                                                    connection.query('SELECT * FROM requirement_territory', (err, territory) => {
                                                                        //when done with connection, release it
                                                                        connection.release();
                                                            
                                                                        if (!err) {
                                                                            res.render('requirement', { flat, house, territory })
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
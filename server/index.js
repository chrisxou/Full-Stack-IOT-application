//----------------------    IMPORTS     ---------------------- //

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");
const session = require("express-session");
const passport = require("passport");
// const passportLocal = require("passport-local").Strategy;

//----------------------   MIDDLEWARE    ---------------------- //

// Middleware
const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: "secretiot",
    resave: false,
    saveUninitialized: false,
  })
);

const port = process.env.SERVER_PORT || 5000;

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


//---------------------- ROUTES ---------------------- //

//----------------- AUTH -------------------- //

// Routes
app.get("/", async (req, res) => {
  try {
    console.log("get");
  } catch (err) {
    console.error(err.message);
  }
});

// Get Username
app.get("/user", async (req, res) => {
  
  const userId = req.query.id;
  
  pool.query("SELECT name FROM users WHERE id=$1", [userId], (err, results) => {
    if (err) {
      console.log(err);
    }
    else {res.send(results.rows);}
  });
});

// Sign in
app.post("/login", async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) console.log(err);
    if (!user) res.send(info);
    else {
      req.logIn(user, (err) => {
        if (err) console.log(err);
        res.send({ id: user.id });
      });
    }
  })(req, res, next);
});

// Sign-up
app.post("/sign", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let hashedPassword = await bcrypt.hash(password, 10);

    pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        if (results.rows.length > 0) {
          res.send("Email already registered");
        } else {
          pool.query(
            "INSERT INTO users (name,email, password) VALUES($1,$2,$3)",
            [name, email, hashedPassword],
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                res.send("Success");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.error(err.message);
  }
});

//----------------- DEVICES ------------------//

// Get all

app.get("/devices/all", async (req, res) => {
  try {
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "SELECT * FROM iot_tables WHERE user_id=$1 ORDER BY name",
          [userId],
          (err, results) => {
            if (err) {
              console.log(err);
            }
            else {res.send(results.rows);}
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Get a device
app.get("/devices/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "SELECT * FROM iot_tables WHERE user_id=$1 AND id=$2",
          [userId, deviceId],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.send(results.rows);
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Add a device
app.post("/devices", async (req, res) => {
  try {
    const { name, type, method, port } = req.body;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "INSERT INTO iot_tables (name, type, method, port, user_id) VALUES($1,$2,$3,$4,$5)",
          [name, type, method, port, userId],
          (err, results) => {
            if (err) {
              res.send("Error with the form");
              // console.log(err);
            } else {
              res.send("Success");
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Update a device

app.put("/devices/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const userId = req.query.id;

    const { name, type, method, port } = req.body;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "UPDATE iot_tables SET name=$1,type=$2,method=$3,port=$4 WHERE user_id=$5 AND id=$6",
          [name, type, method, port, userId, deviceId],
          (err, results) => {
            if (err) {
              res.send("Error with the form");
              // console.log(err);
            } else {
              res.send("Success");
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Delete a device

app.delete("/devices/:deviceId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "DELETE FROM iot_tables WHERE user_id=$1 AND id=$2",
          [userId, deviceId],
          (err, results) => {
            if (err) {
              console.log(err);
            } else {
              res.send("Success");
            }
          }
        );
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//----------------- Iot Points ---------------------//

// Get all points

app.get("/devices/:deviceId/points/all", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const userId = req.query.id;

pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
  if (results.rows.length > 0) {
    pool.query("SELECT * FROM iot_tables WHERE id=$1",[deviceId], (err, results) => {
        if (results.rows.length > 0) {
          pool.query( "SELECT * FROM iot_points WHERE tables_id=$1 ORDER BY data_description",
          [deviceId],
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                res.send(results.rows);}
            });
        }
        else{
          console.log(err);
        }
      });
  }
 else{
  console.log(err);
 }
});
} catch (err) {
console.error(err.message);
}
});


  
//Get a point
app.get("/devices/:deviceId/points/:pointId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;

pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
  if (results.rows.length > 0) {
    pool.query("SELECT * FROM iot_tables WHERE id=$1",[deviceId], (err, results) => {
        if (results.rows.length > 0) {
          pool.query( "SELECT * FROM iot_points WHERE tables_id=$1 AND id=$2",
          [deviceId,pointId],
            (err, results) => {
              if (err) {
                console.log(err);
              } else {
                res.send(results.rows);}
            });
        }
        else{
          console.log(err);
        }
      });
  }
 else{
  console.log(err);
 }
});
} catch (err) {
console.error(err.message);
}
});


// Add a point

app.post("/devices/:deviceId/points", async (req, res) => {
  try {
    const { address, dataDescription, dataType} = req.body;
    const deviceId = req.params.deviceId;
    const userId = req.query.id;
    

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query("SELECT * FROM iot_tables WHERE id=$1",[deviceId], (err, results) => {
            if (results.rows.length > 0) {
              pool.query( "INSERT INTO iot_points ( address, data_description, data_type, tables_id ) VALUES($1,$2,$3,$4)",
              [address, dataDescription, dataType, deviceId],
                (err, results) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send("Success");}
                });
            }
            else{
              console.log(err);
            }
          });
      }
     else{
      console.log(err);
     }
    });
  } catch (err) {
    console.error(err.message);
  }
});

//Update a point

app.put("/devices/:deviceId/points/:pointId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;

    const { address, dataDescription, dataType} = req.body;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query("SELECT * FROM iot_tables WHERE id=$1",[deviceId], (err, results) => {
            if (results.rows.length > 0) {
              pool.query( "UPDATE iot_points SET address=$1,data_description=$2,data_type=$3 WHERE tables_id=$4 AND id=$5",
              [address, dataDescription, dataType, deviceId,pointId],
                (err, results) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send("Success");}
                });
            }
            else{
              console.log(err);
            }
          });
      }
     else{
      console.log(err);
     }
    });
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a point

app.delete("/devices/:deviceId/points/:pointId", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;


    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query("SELECT * FROM iot_tables WHERE id=$1",[deviceId], (err, results) => {
            if (results.rows.length > 0) {
              pool.query( "DELETE FROM iot_points WHERE tables_id=$1 AND id=$2", [deviceId,pointId],
                (err, results) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send("Success");}
                });
            }
            else{
              console.log(err);
            }
          });
      }
     else{
      console.log(err);
     }
    });
  } catch (err) {
    console.error(err.message);
  }
});


// --------------------- INSERT DATA ---------------------//

// add winter temperature data

app.post("/devices/:deviceId/points/:pointId/winterData", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "SELECT * FROM iot_tables WHERE id=$1",
          [deviceId],
          (err, results) => {
            if (results.rows.length > 0) {
              pool.query(
                "SELECT * FROM iot_points WHERE id=$1",
                [pointId],
                (err, results) => {
                  if (results.rows.length > 0) {
                    pool.query(
                      "INSERT INTO iot_values ( date, value,point_id ) SELECT date, random()*(20-17)+17 AS value, $1 AS point_id FROM generate_series(now() - interval '5 hour', now() , interval '30 seconds') AS g1(date)",
                      [pointId],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          res.send("Success");
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});


// add summer temperature data


app.post("/devices/:deviceId/points/:pointId/summerData", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "SELECT * FROM iot_tables WHERE id=$1",
          [deviceId],
          (err, results) => {
            if (results.rows.length > 0) {
              pool.query(
                "SELECT * FROM iot_points WHERE id=$1",
                [pointId],
                (err, results) => {
                  if (results.rows.length > 0) {
                    pool.query(
                      "INSERT INTO iot_values ( date, value,point_id ) SELECT date, random()*(30-25)+25 AS value, $1 AS point_id FROM generate_series(now() - interval '5 hour', now() , interval '30 seconds') AS g1(date)",
                      [pointId],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          res.send("Success");
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});


// add Random data

app.post("/devices/:deviceId/points/:pointId/allData", async (req, res) => {
  try {
    const deviceId = req.params.deviceId;
    const pointId = req.params.pointId;
    const userId = req.query.id;

    pool.query("SELECT * FROM users WHERE id=$1", [userId], (err, results) => {
      if (results.rows.length > 0) {
        pool.query(
          "SELECT * FROM iot_tables WHERE id=$1",
          [deviceId],
          (err, results) => {
            if (results.rows.length > 0) {
              pool.query(
                "SELECT * FROM iot_points WHERE id=$1",
                [pointId],
                (err, results) => {
                  if (results.rows.length > 0) {
                    pool.query(
                      "INSERT INTO iot_values ( date, value,point_id ) SELECT date, random()*100 AS value, $1 AS point_id FROM generate_series(now() - interval '30 days', now(), interval '2 hour') AS g1(date)",
                      [pointId],
                      (err, results) => {
                        if (err) {
                          console.log(err);
                        } else {
                          res.send("Success");
                        }
                      }
                    );
                  } else {
                    console.log(err);
                  }
                }
              );
            }
          }
        );
      } else {
        console.log(err);
      }
    });
  } catch (err) {
    console.error(err.message);
  }
});




//---------------------- START SERVER ---------------------- //

app.listen(port, () => {
  console.log("Server listening on port 5000");
});

import express from "express";
import cors from "cors";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
//app config
const app = express();
const port = process.env.PORT || 6000;

// config
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.SQLUSER,
  password: process.env.SQLPASSWORD,
  database: process.env.DB,
});

//middleware

app.use(express.json());
app.use(cors());

//connection to database
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else console.log("connected");
});
//apiendpoits

app.post("/login", (req, res) => {
  const re = req.body;
  const query = `SELECT * FROM users WHERE useremail='${re.email}'`;
  connection.query(query, (error, response) => {
    if (error) res.status(500).send(error);
    else {
      if (response == "") {
        var q = `INSERT INTO users (useremail,dp) values('${re.email}','${re.photoURL}') `;
        connection.query(q, (error, response) => {
          if (error) res.status(500).send(error);
          else {
            const q = `INSERT INTO userprofile (useremail) values('${re.email}')`;
            connection.query(q, (error, response));
            res.status(200).send("NEW");
          }
        });
      } else res.status(200).send(response);
    }
  });
});

app.post("/account/edit", (req, res) => {
  const re = req.body;
  const q = `SELECT * FROM userprofile WHERE username='${re.username}'`;
  var avail = "";
  if (re.name) {
    if (avail == "") avail = avail + " " + ` name="${re.name}"`;
    else avail = avail + "," + ` name="${re.name}"`;
  }
  if (re.bio) {
    if (avail == "") avail = avail + " " + ` bio="${re.bio}"`;
    else avail = avail + "," + ` bio="${re.bio}"`;
  }
  if (re.phno) {
    if (avail == "") avail = avail + " " + `phno= "${re.phno}"`;
    else avail = avail + "," + `phno= "${re.phno}"`;
  }
  const q2 = `UPDATE userprofile SET${avail} WHERE  useremail='${re.useremail}';`;

  if (avail != "") {
    connection.query(q2, (error, response) => {
      if (error) console.log(error);
    });
  }

  if (re?.username) {
    connection.query(q, (error, response) => {
      if (response == "") {
        const query = `UPDATE userprofile SET username='${re.username}' WHERE  useremail='${re.useremail}';`;
        connection.query(query, (error, response) => {
          if (error) res.status(500).send(error);
          else res.status(201).send("UPDATED");
        });
      } else res.status(200).send("USERNAME ALREADY EXIST");
    });
  } else res.status(200).send("UPDATED");
});

app.post("/account/user", (req, res) => {
  const re = req.body;
  const query = `SELECT * FROM userprofile,users WHERE users.useremail=userprofile.useremail AND users.useremail ='${re.useremail}';`;
  connection.query(query, (error, response) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(response);
  });
});

app.post("/account/info", (req, res) => {
  const re = req.body;
  const query = `SELECT * FROM users,userprofile WHERE users.useremail=userprofile.useremail AND username="${re.username}";`;
  connection.query(query, (error, response) => {
    if (error) res.status(500).send(error);
    else res.status(200).send(response[0]);
  });
});

app.post("/search", (req, res) => {
  const re = req.body;
  const query = `SELECT username,profile_id FROM userprofile WHERE username LIKE "${re.username}%";`;
  connection.query(query, (error, response) => {
    if (error) res.status(500).send(error);
    else if (response == "") res.status(200).send("");
    else res.status(201).send(response);
  });
});

app.post("/finfo", (req, res) => {
  const re = req.body;

  if (re.type === "count") {
    const q = `select count(follow.follower) AS follower ,count(follow.following) AS following from follow,userprofile where (userprofile.useremail=follow.useremail and follow.useremail='${re?.useremail}') or (userprofile.useremail=follow.useremail and username='${re?.username}') ;`;
    connection.query(q, (error, response) => {
      res.status(200).send(response[0]);
    });
  } else if (re.type === "info") {
    const q = `select follower,following from follow where useremail="${re.useremail}";`;
    connection.query(q, (error, response) => {
      res.status(200).send(response);
    });
  }
});

app.post("/follow", (req, res) => {
  const re = req.body;
  const query = `SELECT useremail,username FROM userprofile WHERE useremail='${re.useremail}'or username='${re.username}';`;

  connection.query(query, (error, response) => {
    if (error) res.status(500).send(error);
    else {
      if (response[0].useremail == re.useremail) {
        const q1 = `INSERT INTO follow (following,useremail)  VALUES('${re.username}','${re.useremail}');`;
        const q2 = `INSERT INTO follow (follower,useremail)  VALUES('${response[0].username}','${response[1].useremail}');`;
        connection.query(q1, (error, response));
        connection.query(q2, (error, response));
        res.status(200).send("success");
      } else {
        const q1 = `INSERT INTO follow (following,useremail)  VALUES('${re.username}','${re.useremail}');`;
        const q2 = `INSERT INTO follow (follower,useremail)  VALUES('${response[1].username}','${response[0].useremail}');`;
        connection.query(q1);
        connection.query(q2);
        res.status(200).send("success");
      }
    }
  });
});

app.post("/followed", (req, res) => {
  const re = req.body;
  const q = `select following from follow where useremail="${re.useremail}" and following="${re.username}"`;
  connection.query(q, (error, response) => {
    console.log(response[0]?.following);
    if (response[0]?.following == re.username) res.status(200).send("followed");
    else res.status(200).send("not followed");
  });
});

//listener
app.listen(port, () => console.log(`listening at local host ${port}`));

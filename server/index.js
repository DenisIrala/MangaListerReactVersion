const express= require("express");
const app=express();
const cors= require("cors");
const {Client}=require("pg");
/*
const client=new Client({
  host:"localhost",
  port: 5432,
  database: "web",
  user: "postgres",
  password: "1234"
})
  */

const corsOptions = {
  origin: "http://localhost:8081",
  methods: ["POST", "GET"],
  credentials: true,
}

const client=new Client({
  host:"localhost",
  database: "dbpweb",
  user: "postgres",
  password: "123"
})

app.use(cors());
app.use(express.json());

client
	.connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
/*
    client.query('SELECT * FROM "Manga";', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }
    })
    */
    app.post("/create",(req,res)=>{
      const name= req.body.name;
      const description=req.body.description;
      const author=req.body.author;
      const noe=req.body.noe;
      const demography=req.body.demography;
      const link=req.body.link;

      client.query('INSERT INTO "Manga"(nombre_manga,descripcion,link, autor, nchap, demografia) VALUES($1,$2,$3,$4,$5,$6);',[name,description,link,author,noe,demography], (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          console.log('Query result:', result.rows);
          res.send("Exito!");
        }
      });

    });

    app.get("/getList",(req,res)=>{
      client.query('SELECT * FROM "Manga";',(err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
      //   console.log('Query result:', result.rows);
        res.setHeader('Content-Type', 'application/json');
        res.json(result.rows);
        }
      })
    });

    app.put("/updateList",(req,res)=>{
      const name= req.body.name;
      const description=req.body.description;
      const author=req.body.author;
      const noe=req.body.noe;
      const demography=req.body.demography;
      const link=req.body.link;
      const updateId=req.body.id;

      client.query('UPDATE "Manga" SET "nombre_manga"=$1, "descripcion"=$2, "link"=$3, "autor"=$4, "nchap"=$5, "demografia"=$6 WHERE "id"=$7;',[name,description,link,author,noe,demography,updateId], (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          res.send("Success!");
        }
      });
    })

    app.delete("/delete/:id",(req,res)=>{
      const {id}= req.params;
      client.query('DELETE FROM "Manga" WHERE id=$1;',[id], (err, result) => {
        if (err) {
          console.error('Error executing query', err);
        } else {
          res.send("Success!");
        }
      });
    })

	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});

  


app.listen(3001,()=>{
  console.log("Server is up.");
})

app.listen(8080,()=>{
  console.log("Server is up. 8080");
})
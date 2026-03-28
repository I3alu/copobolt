const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const { check, validationResult } = require("express-validator");
const cors = require('cors');
app.use(cors());
app.use(express.json());


const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password :'',
    database : 'cipobolt'
});

connection.connect(error =>{
    if(error){
        console.error("Hiba a csatlakozáskor",error)
        return;
    }
    console.log("Sikeres csatlakozás")
});

app.get("/markak",(req,res)=>{
    const sql = "SELECT * FROM markak"
    connection.query(sql,(error,results)=>{
        if(error){
            console.error('Hiba a lekérdezésben',error);
            return res.status(500).json({error:'Adatbázis hiba'});
        }
        res.json(results);
    });
});

app.get("/termekek/:marka", (req,res)=>{
    const marka = req.params.marka;
    const sql = `SELECT cipok.cipo_id,cipok.nev,cipok.meret,cipok.ar from cipok JOIN markak on markak.marka_id = cipok.marka_id WHERE markak.nev = "${marka}"`;
    connection.query(sql,(error,results)=>{
        if(error){
            console.log('Hiba a lekérdezéskor',error);
            return res.status(500).json({error:'Adatbázis hiba'})
        }
        if(results.lenght === 0){
            return res.status(404).json({message:'Nincs találat'})
        }
        res.json(results)
    })
})

app.get("/minden",(req,res)=>{
    const sql = 'SELECT * from cipok JOIN markak on markak.marka_id = cipok.cipo_id;'
    connection.query(sql,(error,results)=>{
        if(error){
            console.log('Hiba a lekérdezéskor',error)
            return res.status(500).json({error:'Adatbázis hiba'})
        }
        res.json(results)
    })
})

app.get("/cipo/:cipo_id",(req,res)=>{
    const cipo_id = req.params.cipo_id
    const sql = `SELECT * from cipok JOIN markak on markak.marka_id = cipok.marka_id where cipok.cipo_id =${cipo_id}`
    connection.query(sql,(error,results)=>{
        if(error){
            console.log('Hiba a lekérdezéskor',error)
            return res.status(500).json({error:'Adatbázis hiba'})
        }
        if(results.lenght === 0){
            return res.status(404).json({message:'Nincs találat'})
        }
        res.json(results)
    })
})

const cipoValidator=[
    check('meret')
        .isInt({min :35, max:50}).withMessage("A méret 35-50 közötti"),
    check('ar')
        .isInt({min :15000, max:100000}).withMessage("Az ár 15000-100000"),
]
app.post("/ujCipo",cipoValidator,async (req,res)=>{
    try{
        const {nev,meret,ar,marka_id} = req.body
        if(!nev || !meret || !ar || !marka_id){
            return res.status(400).json({error:"Minden mező kitöltése kötelező"})
        }
        const sql = `INSERT INTO cipok (nev,meret,ar,marka_id) VALUES (?,?,?,?)`
        connection.query(sql,[nev,meret,ar,marka_id],(err,results)=>{
            if(err){
                console.error("Hiba a cipő hozzáadásakor",err)
                return res.status(500).json({error:"Adatbázis hiba"})
            }
            res.status(201).json({message:"Sikeres hozzáadás"})
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Hiba a kapcsolódáskor"})
    }
})

app.post("/ujMarka",async (req,res)=>{
    try{
        const {nev,szarmazasi_orszag,img} = req.body
        if(!nev || !szarmazasi_orszag || !img){
            return res.status(400).json({error:"Minden mező kitöltése kötelező"})
        }
        const sql = `INSERT INTO markak (nev,szarmazasi_orszag,img) VALUES (?,?,?)`
        connection.query(sql,[nev,szarmazasi_orszag,img],(err,results)=>{
            if(err){
                console.error("Hiba a márka hozzáadásakor",err)
                return res.status(500).json({error:"Adatbázis hiba"})
            }
            res.status(201).json({message:"Sikeres hozzáadás"})
        })
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"Hiba a kapcsolódáskor"})
    }
})

app.put("/cipoAr/:id",async (req,res) =>{
    try{
        const {id} = req.params
        const {ar} = req.body
        const sql = `UPDATE cipok SET ar = ? WHERE cipo_id = ?`
        connection.query(sql,[ar,id],(err,results)=>{
            if(err) throw err;
            if(results.affectedRows === 0){
                return res.status(404).json({message:"Ninsc találat"})
            }
            res.send({id,ar})
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({error:"Hiba a kapcsolódáskor"})
    }
})

app.put("/markaModosit/:id",async (req,res) =>{
    try{
        const {id} = req.params
        const {img,nev} = req.body
        const sql = `UPDATE marka SET nev = ?,img=? WHERE marka_id = ?`
        connection.query(sql,[img,nev],(err,results)=>{
            if(err) throw err;
            if(results.affectedRows === 0){
                return res.status(404).json({message:"Ninsc találat"})
            }
            res.send({id,img,nev})
        })
    }
    catch(err){
        console.error(err)
        res.status(500).json({error:"Hiba a kapcsolódáskor"})
    }
})

app.delete("/cipoTorles/:id", async (req,res)=>{
    const {id} = req.params
    const sql = `DELETE FROM cipok WHERE cipo_id = ?`
    connection.query(sql,[id],(error,results)=>{
        if(error){
            console.error("Hiba a törlés során",error)
            return res.status(404).json({error:"Adatbázis hiba"})
        }
        if(results.affectedRows === 0){
            return res.status(404).json({error:"Cipő nem található"})
        }
        res.json(results)
    })
})

app.listen(port,() => {
    console.log(`Szerver fut a http://localhost:${port} címen`)
})
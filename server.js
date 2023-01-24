import express from "express";
import mysql from "mysql";
import cors from "cors";

const app=express();


app.use(cors());


app.use(express.json());


const hostname='localhost';
const port=process.env.PORT || 9090;


//MySql connection
const pool=mysql.createPool({
    connectionLimit:10,
    host: 'localhost',
    user: 'root',
    password : '',
    database : 'to_do_list'
});

//crud

/*******get all tasks */
app.get('/tasks',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`);

        connection.query("select * from task",(err,rows)=>{
            connection.release();

            if(!err){
                if(rows){
                    res.status(200).json(rows);
                }else{
                    res.status(404).json("No data found !");
                }
                
            }else{
                res.status(500).json("Problém au niveau de serveur");
            }
        })
    })
});


/****add task */
app.post('/tasks',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`);
        //Date.parse(dateString)
        //`INSERT INTO task (title,description,priority) VALUES (${req.body.title},${req.body.description},${req.body.priority})`
        
        connection.query(`INSERT INTO task (id,title, description, priority, date) VALUES (${null}, '${req.body.title}','${req.body.description}',${req.body.priority},'${req.body.date}')`,(err,rows)=>{
            connection.release();
            
            if(!err){
                res.status(201).json(req.body);
            }else{
                res.status(500).json({error :err});
            }
        })
    })
});


/*** update task */
app.put('/tasks/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`);
        
        connection.query(`update task set title='${req.body.title}', description='${req.body.description}', priority=${req.body.priority}, date='${req.body.date}' where id=${req.params.id}`,(err,rows)=>{
            connection.release();
            
            if(!err){
                res.status(200).json(req.body);
            }else{
                res.status(500).json({error :err});
            }
        })
    })
});

/******delete task */
app.delete('/tasks/:id',(req,res)=>{
    pool.getConnection((err,connection)=>{
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`);

        connection.query("delete from task where id = ?",[req.params.id],(err,rows)=>{
            connection.release();

            if(!err){
                res.status(200).json('task removed');
            }
        })
    })
});

//end crud tasks

app.listen(port,hostname, ()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
})
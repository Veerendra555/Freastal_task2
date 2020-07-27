var express =require('express');
var path=require('path')
var bodyparser=require('body-parser');
const mysqlConn = require('./model/db');
var app=express();

app.set('views',path.join(__dirname,'views'));

app.set('view engine','ejs');

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render('homepage',{
        msg:null,
        loginmsg:""
    });
})

app.post('/reg',(req,res)=>{
    var data={name:req.body.name,email:req.body.mail,password:req.body.password,phone:req.body.phone};
    var sql="insert into reg SET ?";
    let query=mysqlConn.query(sql,data,(err,result)=>{
        if(err)throw err;
    res.render('homepage',{
        msg:true,
        loginmsg:""
    }) 
    })
    
});

app.post('/login',(req,res)=>{
var mail=req.body.mail;
    var sql="select password from reg where email =?";
   var query=mysqlConn.query(sql,mail,(err,data)=>{
               if(err)throw err;
      if(req.body.password===data[0].password)
      {
        var sql1="select * from item";  
        var query=mysqlConn.query(sql1,(err,rows)=>{
        res.render('product',{
            data:rows
        });
        });
        
       app.get('/cart/:id/:iname/:info/:price/:offer',(req,res)=>{
           
        
         
         var data={itemid:req.params.id,email:mail,itemname:req.params.iname, info:req.params.info, price:req.params.price,offer:req.params.offer};
        var sql3="insert into cart SET ?";
     let query1=mysqlConn.query(sql3,data,(err,result)=>{
              if(err)throw err;
        var sqlcart="select * from cart where email= ?";  
       var query2=mysqlConn.query(sqlcart,mail,(err,rows)=>{
        res.render('cart',{
               cdata:rows 
         }) 

  })
    

    }) 
    })

    app.post('/poduct',(req,res)=>{
        var data={itemname:req.body.itemname,info:req.body.info,price:req.body.price,offer:req.body.offer,itemid:req.body.itemid};
        var sql="insert into item SET ?";
        let query=mysqlConn.query(sql,data,(err,result)=>{
            if(err)throw err;
            var sql1="select * from item";  
            var query=mysqlConn.query(sql1,(err,rows)=>{
            res.render('product',{
                data:rows
            });
            });
        })

    })
        
      } 
                
    else {
       res.render("homepage",{
           msg:false,
           loginmsg:"Invalid username and password.."
       })
    }
               
                 

   
   })

})

app.listen(3000,(err)=>{
    console.log(err?"Error"+err:"Application run on port 3000");
})
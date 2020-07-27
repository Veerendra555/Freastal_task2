var mysql=require('mysql');

var mysqlConn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'product'
})

mysqlConn.connect(err=>{
    console.log(err?"Error"+err:"Connection successfull");
})

module.exports=mysqlConn;
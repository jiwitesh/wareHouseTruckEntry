var mysql = require('mysql');

var conn = mysql.createConnection({host: "localhost", port: "3307", user: "root",password: "", database: 'ware_house'});

var query = 'SELECT * FROM truck_vendor_details'



conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query(query, function (err, result) {
      if (err) throw err;
      console.log("Result: " + result);
    });
  });
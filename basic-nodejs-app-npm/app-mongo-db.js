var MongoClient = require('mongodb').MongoClient;

const DB_CONFIGURATION = 'mlab';

if (DB_CONFIGURATION == 'local') {
    let DATABASE = "mydb";
    let DB_HOST = "localhost";
    let DB_PORT = "27017";
    DB_CONNECTION = "mongodb://" + DB_HOST + ":" + DB_PORT + "/" + DATABASE;
}
if (DB_CONFIGURATION == 'mlab') {
    let DB_USERNAME = 'dohungcuongdev';
    let DB_PW = 'ititiu13170';
    let DB_MLAB_HOST = 'ds245387.mlab.com:45387';
    let DB_MLAB = 'mydb';
    DB_CONNECTION = "mongodb://" + DB_USERNAME + ":" + DB_PW + "@" + DB_MLAB_HOST + "/" + DB_MLAB;
}

var url = DB_CONNECTION;

function workWithMongoDB() {
    console.log(url)
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        console.log("Database created!");

        var dbo = db.db("mydb");
        dbo.createCollection("customers", function (err, res) {
            if (err) throw err;
            console.log("Collection created!");

            var myobj = { name: "Company Inc", address: "Highway 37" };
            dbo.collection("customers").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("1 document inserted");

                dbo.collection("customers").findOne({}, function (err, result) {
                    if (err) throw err;
                    console.log(result.name);
                    db.close();
                });
            });
        });
    });
}

module.exports.createServer = function (req, res) {
    workWithMongoDB();
    return res.end();
}
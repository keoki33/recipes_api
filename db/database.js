const MongoClient = require("mongodb").MongoClient;

const mongoConnect = callback => {
  MongoClient.connect(
    "mongodb+srv://UmarKhan:2bnHHNLDIW37zufm@recipecluster-r6cjr.mongodb.net/test?retryWrites=true"
  )
    .then(client => {
      console.log("Connected");
      callback(client);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports = mongoConnect;

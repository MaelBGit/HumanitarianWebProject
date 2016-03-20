// MARCHE !!!! QUELQUES PB AVEC ASYNCHRONE


//Loading dynamoDB sdk and updating config
var AWS = require('aws-sdk');

AWS.config.update({ accessKeyId: "THE_KEY", secretAccessKey: "THE_SECRET_KEY", region: "THE_REGION"}); //User = Michael
//TODO -> Change user to projectWeb
var myDB = new AWS.DynamoDB();
var docClient = new AWS.DynamoDB.DocumentClient();


//ITEMS
var moi = {
  "YourName" : "WEYDERT",
  "city" : "Voisins le Bretonneux",
  "country" : "France",
  "adress" : "26 mail le corbusier",
  "zipcode" : 78960,
  "sleepingPlaces" : 2
}

var max = {
  "YourName" : "CUABOZ",
  "city" : "Suresnes",
  "country" : "France",
  "adress" : "quelque part",
  "zipcode" : 92000,
  "sleepingPlaces" : 1
}


//FUNCTIONS
//Remarks -> don't seems necessary to specify non key-attributes in table creation
function createDBTable()
{
  var params = {
      TableName : "PeopleProposition",
      KeySchema: [
          { AttributeName: "YourName", KeyType: "HASH" },  //Partition key
          { AttributeName: "city", KeyType: "RANGE" }  //Sort key
      ],
      AttributeDefinitions: [
          { AttributeName: "YourName", AttributeType: "S" }, //S strands for String
          { AttributeName: "city", AttributeType: "S" }
      ],
      ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
      }
  };
  myDB.createTable(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  });
}


function describeDBTable()
{
  var params = {
      TableName: "PeopleProposition"
  };
  myDB.describeTable(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  });

}


function deleteDBTable()
{
  var params = {
      TableName: "PeopleProposition"
  };

  myDB.deleteTable(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  });
}

function putDBItem(testo)
{
  var params = {
    TableName: "PeopleProposition",
    Item: testo
  };

  docClient.put(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  });
}


function queryDB(searchedLabel)
{
  var params = {
    TableName: "PeopleProposition",
    KeyConditionExpression: "YourName = :myName",
    ExpressionAttributeValues: {
        ":myName": searchedLabel
    }
  };

  docClient.query(params, function(err, data) {
      if (err)
          console.log(JSON.stringify(err, null, 2));
      else
          console.log(JSON.stringify(data, null, 2));
  });
}




//OPERATIONS
console.log("----------------------------TABLE CREATION--------------------------");
//createDBTable();


console.log("----------------------------TABLE DESCRIPTION--------------------------");
//describeDBTable();


console.log("----------------------------ADDING ITEM--------------------------");
//putDBItem(moi);
//putDBItem(max);

console.log("----------------------------QUERRY ITEM--------------------------");
//queryDB("WEYDERT");
//queryDB("CUABOZ")

console.log("----------------------------DELETING TABLE--------------------------");
//deleteDBTable();

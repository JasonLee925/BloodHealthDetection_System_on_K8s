const MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:30638/admin';

// 引入中介軟體
const express = require('express');

// 創建express中介軟體
const app = express();

// 引入http body 的解析函式庫
const bodyParser = require('body-parser');

// 引入設定資料 config.js
const config = require('./config');

// 將 http body JSON 解析器加入中介軟體(加入後將可自動解析JSON格式的字串)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const now = () => new Date(Date.now()).toLocaleString('zh-TW');

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
	// 串列資料保存陣列
	let pressureData = {
			'sys':[],
			'dia':[]
		};
	let oxygenData = [];
	let glucoseData = [];
	
	var col;

	function isEmpty(obj) {
		// 為null 或 undeifned 則為空值
		return ([null,undefined].indexOf(obj) != -1)? true : false;
	}

	// post => oxygen data
	app.post('/oxygen', (req, res) => {
		if (isEmpty(req.body)) {
			console.log('Bad request');
			return res.sendStatus(400);
		}
		
		oxygenData.push(req.body.value);
		
		col = db.collection("Oxygen");
		col.insertMany([{time:now(), value:req.body.value}]);
		console.log(oxygenData);
		
		res.sendStatus(200);
	});

	// post => glucose data
	app.post('/glucose', (req, res) => {
		if (isEmpty(req.body)) {
			console.log('Bad request');
			return res.sendStatus(400);
		}
		
		console.log('POST:', req.body.value);
		glucoseData.push(req.body.value);
		
		col = db.collection("Glucose");
		col.insertMany([{time:now(), value:req.body.value}]);
		res.sendStatus(200);
	});

	// post => pressure data
	app.post('/pressure', (req, res) => {
		if (isEmpty(req.body)) {
			console.log('Bad request');
			return res.sendStatus(400);
		}
		
		pressureData['sys'].push(req.body.sys);
		pressureData['dia'].push(req.body.dia);
		console.log(pressureData);
		
		col = db.collection("Pressure");
		col.insertMany([{
			time:now(),
			sys:req.body.sys, 
			dia:req.body.dia}]);
		
		res.sendStatus(200);
	});

	// get => dirname site
	app.get('/', (req, res) => res.sendFile(`${__dirname}/client/html/plot-temp-dynamic.html`));

	// get => oxygen data
	app.get('/oxygen', (req, res) => res.send(oxygenData));

	// get => glucose data
	app.get('/glucose', (req, res) => res.send(glucoseData));

	// get => pressure data
	app.get('/pressure', (req, res) => res.send(pressureData));

	// get => all oxygen data from db
	app.get('/db_oxygen', (req, res) => {
		col = db.collection('Oxygen');
		var value = [];
		col.find().forEach(function(doc){
			value.push(doc.value);
		},function(err) {
			console.log(value);
			res.send(value);
		});
	});
	
	// get => all glucose data from db
	app.get('/db_glucose', (req, res) => {
		col = db.collection('Glucose');
		var value = [];
		col.find().forEach(function(doc){
			value.push(doc.value);
		},function(err) {
			console.log(value);
			res.send(value);
		});
	});
	
	// get => all pressure data from db
	app.get('/db_pressure', (req, res) => {
		col = db.collection('Pressure');
		var _sys = [], _dia = [];
		col.find().forEach(function(doc){
			_sys.push(doc.sys);
			_dia.push(doc.dia);
		},function(err) {
			//console.log({'sys':_sys, 'dia':_dia});
			res.send({'sys':_sys, 'dia':_dia});
		});
	});

	// get => db site
	app.get('/db', (req, res) => res.sendFile(`${__dirname}/client/html/plot-all-data.html`));
	
	// 開始監聽
	app.listen(config.serverPort, () => {
		console.log(`The node.js server is running at port ${config.serverPort}`)
	});
	
	// db.close();
	
});


var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

/* ===================
   Import Node Modules
=================== */
var express = require('express');// Fast, unopinionated, minimalist web framework for node.
var app = express();	// Initiate Express Application
var bodyParser = require('body-parser');	// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
var mongoose = require('mongoose');	// Node Tool for MongoDB
mongoose.connect('mongodb://localhost/employees');	//connect to database
var Employee = mongoose.model('Employee', mongoose.Schema({	//create schema and export the model
	name: String,
	dept: String,
	area: String,
	status: String,
	contact: String,
	salary: String
}));

// Middleware
//app.use(bodyParser.urlencoded({extended:true}));	// parse application/x-www-form-urlencoded
app.use(bodyParser.json());	// parse application/json
app.use(express.static(__dirname + '/client'));	// Provide static directory for frontend

//Default Api
/*app.get('/', function(req, res){
	console.log("Server running");
}); */

//Api to get all employees
app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){	//employees --> response from database ie. all employees
		if(err)
			res.send(err);
		res.json(employees);	//sends back the response to controller in json format
	});
});

//Api to get employee by id
app.get('/api/employees/:id', function(req, res){
	console.log(req.params);
	Employee.findOne({_id:req.params.id},function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Api to create employee
app.post('/api/employees', function(req, res){
	console.log(req.body);
	Employee.create(req.body, function(err, employees){	
		//req.body --> requsting the data from the body of the input data. Install body-parser
		if(err)
			res.send(err);
		res.json(employees);
	});
});

//Api to delete employee by id
app.delete('/api/employees/:id', function(req, res){
	//req.params.id --> get the value of id from url
	//_id:req.params.id --> checks the id with db
	Employee.findOneAndRemove({_id:req.params.id},function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

//Api to update employee by id
app.put('/api/employees/:id', function(req, res){
	var query = {
		name:req.body.name,
		dept:req.body.dept,
		area:req.body.area,
		status:req.body.status,
		contact:req.body.contact,
		salary:req.body.salary
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

// Start Server: Listen on port 3000
app.listen(3000, function(){
	console.log('Server is running on port 3000')
});

module.exports = Employee;

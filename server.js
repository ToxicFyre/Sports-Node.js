const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const jsonParser = bodyParser.json();

let sportsArray = [
					{
						name : "Basketball",
						id : 123
					},
					{
						name : "Soccer",
						id : 456
					},
					{
						name : "Football",
						id : 789
					}
				];

app.get('/list-sports', (req, res) => {
	res.status(200).json({
		message : "Successfully sent the list of sports",
		status : 200,
		sports : sportsArray
	});
});

app.get('/list-sports-with-headers', (req, res) =>{
	let sportId = req.get('id');


	sportsArray.forEach(item => {
		if (item.id == sportId){
			res.status(200).json({
				message : "Successfully sent the sport",
				status : 200,
				sport : item
			});
		}
	});

	res.status(404).json({
		message : "Sport not found in the list",
		status : 404
	});
});

app.get('/list-sports/:id', (req, res) => {
	let sportId = req.params.id;

	sportsArray.forEach(item => {
		if (item.id == sportId){
			res.status(200).json({
				message : "Successfully sent the sport",
				status : 200,
				sport : item
			});
		}
	});

	res.status(404).json({
		message : "Sport not found in the list",
		status : 404
	});
});

app.post('/post-sport', jsonParser, (req, res, next) => {
	
	let requiredFields = ['id', 'name'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			}).send("Finish");
		}
	}

	let sportId = req.body.id;

	sportsArray.forEach(item => {
		if ( sportId == item.id ){
		 	res.status(409).json({
				message : `That id is already in use.`,
				status : 409
			}).send("Finish");
		}
	});

	let objectToAdd = {
		id: sportId,
		name: req.body.name
	};

	sportsArray.push(objectToAdd);
	res.status(201).json({
		message : "Successfully added the sport",
		status : 201,
		sport : objectToAdd
	});
});


app.listen(8080, () => {
	console.log('Your app is running in port 8080');
});







var mongo = require('mongodb').MongoClient;
var table = require('./display.js');
var grouping = require('./grouping.js');
var functions = require('./functions.js');
var caseTask = process.argv[2];
var numberOfRecords = (process.argv[3]);
numberOfRecords = numberOfRecords === undefined ? 10 : Number(numberOfRecords);

train = mongo.connect('mongodb://localhost:27017/trainSchedule', function(err, db) {
	train = db.collection('trainData');

	var finalTrain = [];
	switch (caseTask) {
		case '1' :
		// Find and print 10 longest routes in terms of distance.
		grouping.aggregateFunction(train,'distance', -1 , numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs,'distance');
		});
		break;

		case '2' :
		// Find and print 10 shortest routes in terms of distance.
		grouping.aggregateFunction(train,'distance', 1, numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs, 'distance');
		});
		break;

		case '3':
		// Find and print 10 longest routes in terms of duration.
		var k =0;
		train.find().sort({counter : 1}).toArray(function(error,results) {
			trainWithDuration = functions.hourToMinute(results).sort(functions.dynamicSort('operation'));;
			for(i = trainWithDuration.length - 1; i >= trainWithDuration.length - numberOfRecords; i -= 1) {
				finalTrain[k] = trainWithDuration[i];
				k += 1;
			}
			finalTrain = functions.minutetohour(finalTrain);
			table.displayData(finalTrain, 'duration');
		})
		break;

		case '4':
		// Find and print 10 shortest routes in terms of duration.

		train.find().sort({counter : 1}).toArray(function(error,results) {
			trainWithDuration = functions.hourToMinute(results).sort(functions.dynamicSort('operation'));
			for(i = 0; i < numberOfRecords; i += 1) {
				finalTrain[i] = trainWithDuration[i];
			}
			finalTrain = functions.minutetohour(finalTrain);
			table.displayData(finalTrain, 'duration');
		})
		break;

		case '5':
		// Find and print 10 longest routes in terms of number of stations.
		grouping.aggregateFunction(train,'numberOfStation', -1, numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs, 'number of station');
		});
		break;

		case '6':
		// Find and print 10 shortest routes in terms of number of stations.
		grouping.aggregateFunction(train,'numberOfStation', 1, numberOfRecords).limit(numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs, 'number of station');
		});
		break;

		case '7':
		// Find and print 10 most visited stations.
		grouping.aggregateFunction(train,'visitedStation', -1, numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs, 'visited station');
		});
		break;

		case '8':
		// Find and print 10 least visited stations.
		grouping.aggregateFunction(train,'visitedStation', 1, numberOfRecords).toArray(function(error,docs) {
			table.displayData(docs, 'visited station');
		});
		break;

		default :
		console.log('Find and print 10 longest routes in terms of distance.');
		console.log('Find and print 10 shortest routes in terms of distance.');
		console.log('Find and print 10 longest routes in terms of duration.');
		console.log('Find and print 10 shortest routes in terms of duration.');
		console.log('Find and print 10 longest routes in terms of number of stations.');
		console.log('Find and print 10 shortest routes in terms of number of stations.');
		console.log('Find and print 10 most visited stations.');
		console.log('Find and print 10 least visited stations.');

	}

 });

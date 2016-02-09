// grouping data by specific fields.
exports.aggregateFunction = function (train,groupBy,orderBy,numberOfRecords) {
  var trainGroupBy;
  if (groupBy === 'distance') {
    trainGroupBy =train.aggregate([
        {$group : {
          _id :'$trainNo',

          operation :
          {$max : '$distance' },
          'trainName' : {'$first' : '$trainName'},
          'sourceStationCode' : {'$first' : '$sourceStationCode'},
          'sourceStationName' : {'$first' : '$sourceStationName'},
          'destinationStationCode' : {'$first' : '$destinationStationCode'},
          'destinationStationName' : {'$first' : '$destinationStationName'}

          }
        }
    ]);
  }

  else if (groupBy === 'numberOfStation') {
    trainGroupBy =train.aggregate([
        {$group : {
          _id :'$trainNo',

          operation :
          {$sum : 1 },
          'trainName' : {'$first' : '$trainName'},
          'sourceStationCode' : {'$first' : '$sourceStationCode'},
          'sourceStationName' : {'$first' : '$sourceStationName'},
          'destinationStationCode' : {'$first' : '$destinationStationCode'},
          'destinationStationName' : {'$first' : '$destinationStationName'}
          }
        }
    ]);
  }

  else if (groupBy === 'visitedStation') {
    trainGroupBy =train.aggregate([
        {$group : {
          _id :'$stationName',

          operation :
          {$sum : 1 },
          'stationName' : {'$first' : '$stationName'}
          }
        }
    ]);
  }

  else if (groupBy === 'trainNo') {
    trainGroupBy =train.aggregate([
      {$group : {
          _id :'$trainNo'
        }
      }
    ]);
  }
  return trainGroupBy.sort({operation : orderBy}).limit(numberOfRecords);
}

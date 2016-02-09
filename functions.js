// sorting
exports.dynamicSort = function (property) {
  var sortOrder = 1;
  if(property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}
// final minute calculations
var uniqueTrainCounter =[];
exports.hourToMinute = function (results) {
  for(i = 0; i < results.length; i += 1 ) {
    // console.log(result)
    a = results[i].arrivalTime.slice(1,9);
    b = a.split(':');
    results[i].minutes = (+b[0]) * 60  + (+b[1])+ (+b[2]);
  }
  results.push(0);
  var sum = 0;
  var diff = [];
  var j = 0;
  var sum = 0;
  var k = 0;
  var uniqueTrainCounter = [];
  var length = results.length;
    for (i = 0 ; i < length-1; i += 1) {
      if ((results[i].trainNo === results[i + 1].trainNo) && (results[i].minutes > results[i + 1].minutes)) {
        diff [j] = ((24 * 60) - results[i].minutes) + ( 0 + results[i + 1].minutes);
        j += 1;
      }
      else if ((results[i].trainNo === results[i + 1].trainNo) && (results[i].minutes < results[i + 1].minutes)) {
        diff[j] = results[i + 1].minutes - results[i].minutes;
        // console.log(diff[j]);
        j += 1;
      }
      else if (results[i].trainNo !== results[i+1].trainNo) {
        for (j = 0 ; j < diff.length ; j += 1) {
            sum = sum + (diff[j]);
        }
        uniqueTrainCounter[k] = {
          operation: sum,
          _id : results[i].trainNo,
          trainName : results[i].trainName,
          sourceStationCode : results[i].sourceStationCode,
          sourceStationName : results[i].sourceStationName,
          destinationStationCode : results[i].destinationStationCode,
          destinationStationName : results[i].destinationStationName
        };
        k += 1;
        j = 0;
        sum = 0;
        for (j = 0 ; j < diff.length ; j += 1) {

          diff[j] = 0;
        }
      }
    }
  return uniqueTrainCounter;
}

// ---------------convert minute to hour----------------
exports.minutetohour = function(finalTrain) {
  for(i = 0 ; i < finalTrain.length ; i++) {
    m = (finalTrain[i].operation) % 60;
    h = (finalTrain[i].operation - m)/60;
    finalTrain[i].operation = h.toString() + ':' + (m < 10 ? '0' : '') + m.toString();
    // console.log(finalTrain[i]);
  }
  return finalTrain;
}

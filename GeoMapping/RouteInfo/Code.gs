function SETTRAVELMODE(travel_mode){
  var travelMode = "";

  switch (travel_mode){
    case "DRIVING":
      travelMode = Maps.DirectionFinder.Mode.DRIVING;
      break;
    case "TRANSIT":
      travelMode = Maps.DirectionFinder.Mode.TRANSIT;
      break;
    case "BICYCLING":
      travelMode = Maps.DirectionFinder.Mode.BICYCLING;
      break;
    default:
      return -1
  }
  return travelMode;
}

function ROUTEDISTANCE(start_address, end_address, travel_mode = "DRIVING", units = "KILOMETERS", waypoints = []) {
  var METRES_TO_MILES = 0.0006213712;

  var travelMode = SETTRAVELMODE(travel_mode);
  // Logger.log(travelMode);
  // var log = Logger.getLog();
  // return log;
  if(travelMode == -1){
    return "INCORRECT TRAVEL MODE!!!";
  }

  var routeObject = Maps.newDirectionFinder()
    .setRegion('India')
    .setLanguage('en-GB')
    .setOrigin(start_address)
    .setDestination(end_address)
    .setMode(travelMode);
  
  for (var i = 0; i<waypoints.length;i++){
    routeObject.addWaypoint(waypoints[i]);
  }

  var directions = routeObject.getDirections();

  if (directions.status !== "OK") 
    return "Error: " + directions.status;

  var route = directions.routes[0].legs[0];
  // var time = route.duration.value;
  var distance = route.distance.value;

  switch (units){
    case "KILOMETERS":
      return distance/1000;
      break;
    case "MILES":
      return distance*METRES_TO_MILES;
      break;
    default:
      return "INCORRECT DISTANCE UNITS!!!"
  }
}

function ROUTETIME(start_address, end_address, travel_mode = "DRIVING", units = "HOURS", waypoints = []) {

  var travelMode = SETTRAVELMODE(travel_mode);
  // Logger.log(travelMode);
  // var log = Logger.getLog();
  // return log;
  if(travelMode == -1){
    return "INCORRECT TRAVEL MODE!!!";
  }

  var routeObject = Maps.newDirectionFinder()
    .setRegion('India')
    .setLanguage('en-GB')
    .setOrigin(start_address)
    .setDestination(end_address)
    .setMode(travelMode);
  
  for (var i = 0; i<waypoints.length;i++){
    routeObject.addWaypoint(waypoints[i]);
  }

  var directions = routeObject.getDirections();

  if (directions.status !== "OK") 
    return "Error: " + directions.status;

  var route = directions.routes[0].legs[0];
  var time = route.duration.value;

  switch (units){
    case "HOURS":
      return time/3600;
      break;
    case "MINUTES":
      return time/60;
      break;
    default:
      return "INCORRECT TIME UNITS!!!"
  }
}

function SCORE(volume, distance, algorithm){
  switch(algorithm){
    case "LINEAR COMBINATION":
    // The relative weights of volume and distance can be adjusted
      var alpha = 50;
      var beta = 50;
      var sum = alpha + beta;
      score = (alpha/sum)*volume + (beta/sum)*(1/distance);
      return score;
      break;
    default:
      return "INCORRECT ALGORITHM!!!";
  }
}

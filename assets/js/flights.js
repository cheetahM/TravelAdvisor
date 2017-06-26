// Request data
var flightData = {
  "request": {
    "slice": [
      {
        "origin": "SFO",
        "destination": "NYC",
        "date": "2017-06-27"
      },
      {
        "origin": "NYC",
        "destination": "SFO",
        "date": "2017-06-28"
      }
    ],
    "passengers": {
      "adultCount": 1,
      "infantInLapCount": 0,
      "infantInSeatCount": 0,
      "childCount": 0,
      "seniorCount": 0
    },
    "solutions": 10,
    "refundable": false
  }
};

var flightInfo = [];
var selectedFlight ={};
var jsonObject = {};
var airline;
var price;
var origin = $('#fOrigin').val();
var destination = $('#fDestination').val();
var departingDate = $('#departingDate').val();
var returningDate = $('#returningDate').val();

//api key for QPX
var apikey = "AIzaSyBf_sxIn1lzHh9N4IkjVZK5_rIqkgak7mw";
var endPoint = "https://www.googleapis.com/qpxExpress/v1/trips/search?key="+apikey;

$( "#searchFlights" ).submit(function(event) {
  // Stop form from submitting normally
  event.preventDefault();

// using mock data as QPX API has a limit of 40 request per day
//   $( "#results" ).empty().append( JSON.stringify(mockData, null, 2));
//   for(i=0; i < mockData.trips.tripOption.length; i++){
//         airline = mockData.trips.tripOption[i].slice[0].segment[0].flight.carrier;
//         price = mockData.trips.tripOption[i].saleTotal;
//         origin = mockData.trips.tripOption[i].slice[0].segment[0].leg[0].origin;
//         destination = mockData.trips.tripOption[i].slice[0].segment[0].leg[0].destination;
//         departureTime = mockData.trips.tripOption[i].slice[0].segment[0].leg[0].departureTime;
//         arrivalTime = mockData.trips.tripOption[i].slice[0].segment[0].leg[0].arrivalTime;
//         jsonObject = {"airline": airline , "price": price, "origin": origin,
//             "destination": destination, "departureTime": departureTime, "arrivalTime": arrivalTime };
//         flightInfo.push(jsonObject);
//     }

    $.each(flightInfo, function(i, item) {
            console.log("inside each....");
            var $tr = $('<tr>').addClass('clickable-row page-scroll');
            $tr.append(
                $('<td>').text(item.airline),
                $('<td>').text(item.price),
                $('<td>').text(item.origin),
                $('<td>').text(item.destination),
                $('<td>').text(item.departureTime),
                $('<td>').text(item.arrivalTime)
            ).appendTo('#flightResults');
        });
        $('#flightsTable').removeClass('hide');
        $('#flightsTable').addClass('show');
        $('html,body').animate({
            scrollTop: $('#flightsTable').offset().top},'slow');


  // Using QPX API          
  flightData.request.slice[0].origin = $('#fOrigin').val();
  flightData.request.slice[0].destination = $('#fDestination').val();
  flightData.request.slice[1].origin = $('#fDestination').val();
  flightData.request.slice[1].destination = $('#fOrigin').val();
  flightData.request.passengers.adultCount = $('#ticketCount').val();
  flightData.request.maxPrice = $('#maxPrice').val();
  flightData.request.slice[0].date = $('#departingDate').val();
  flightData.request.slice[1].date = $('#returningDate').val();
  console.log(flightData.request.slice[0].destination);
  
  $.ajax({
    type: "POST",
    //Set up your request URL and API Key.
    url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBf_sxIn1lzHh9N4IkjVZK5_rIqkgak7mw",
    // Set Content-type: application/json
    contentType: 'application/json',
    dataType: 'json',
    // The query we want from Google QPX, This will be the variable we created in the beginning
    data: JSON.stringify(flightData),
    success: function(data) {
        //Once we get the result you can either send it to console or use it anywhere you like.
        console.log(JSON.stringify("Google flights response is: ", JSON.stringify(data)));
        //var content = $( data ).find( "#content" );
        $( "#results" ).empty().append( JSON.stringify(data, null, 2));
        for(i=0; i < data.trips.tripOption.length; i++){
            airline = data.trips.tripOption[i].slice[0].segment[0].flight.carrier;
            price = data.trips.tripOption[i].saleTotal;
            origin = data.trips.tripOption[i].slice[0].segment[0].leg[0].origin;
            destination = data.trips.tripOption[i].slice[0].segment[0].leg[0].destination;
            departureTime = data.trips.tripOption[i].slice[0].segment[0].leg[0].departureTime;
            arrivalTime = data.trips.tripOption[i].slice[0].segment[0].leg[0].arrivalTime;
            jsonObject = {"airline": airline , "price": price, "origin": origin,
                "destination": destination, "departureTime": departureTime, "arrivalTime": arrivalTime };
            flightInfo.push(jsonObject);
        }

        $.each(flightInfo, function(i, item) {
            console.log("inside each....");
            var $tr = $('<tr>').addClass('clickable-row page-scroll');
            $tr.append(
                $('<td>').text(item.airline),
                $('<td>').text(item.price),
                $('<td>').text(item.origin),
                $('<td>').text(item.destination),
                $('<td>').text(item.departureTime),
                $('<td>').text(item.arrivalTime)
            ).appendTo('#flightResults');
        });
        $('#flightsTable').removeClass('hide');
        $('#flightsTable').addClass('show');
        $('html,body').animate({
            scrollTop: $('#flightsTable').offset().top},'slow');
            
    },
    error: function() {
        //Error Handling for our request
        console.log("Access to Google QPX Failed.");
    }
 });
});

$('#flightsTable tr').on("click", function(e) {
    console.log($(this));
});

$("input").on("change", function() {
    this.setAttribute(
        "data-date",
        moment(this.value, "YYYY-MM-DD")
        .format( this.getAttribute("data-date-format") )
    )
}).trigger("change");

$('#flightsTable').on('click', '.clickable-row', function(event) {
  
                var tableData = $(this).children('td').map(function () {
                    return $(this).text();
                }).get();
                var props = $('thead > tr th');
                var array = [];
                props.each(function () { array.push($(this).text().toLowerCase()) });
                //keys
                console.log(array);
                //values
                console.log(tableData);


                for (var i = 0; i < tableData.length; i++) {
                    selectedFlight[array[i]] = tableData[i];
                }
                console.log(selectedFlight);
                $('#events').addClass('show');
                $('html,body').animate({
                    scrollTop: $('#events').offset().top},'slow');
});
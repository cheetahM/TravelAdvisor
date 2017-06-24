
$("#findEvent").on("click", function(event){
	event.preventDefault();
	console.log("hello.. selected flight: ", selectedFlight);		
	// var location = $("#destination-input").val().trim();
	// var startDate = $("#arrival-input").val().trim();
	// var departDate = $("#departure-input").val().trim();

	// Now will get location start and depart dates from flight info. Placeholders declared below:

	var location = selectedFlight.destination;
	var startDate = 20170701;
	var departDate = 20170710;

	var eventList = [];

	var dateRange = (startDate + "-" + departDate);
	var interests = $("#interests").val().trim();
	
	var eventSearchURL = "http://crossorigin.me/http://api.eventful.com/json/events/search?app_key=wHxG23mXN4PJV7cR&page_size=5&page_number=1&location=" + location + "&date=" + dateRange + "&keywords=" + interests;
	
	console.log(eventSearchURL);
	showEventResults();


// ------------- Ajax Search call when Eventful is working ----------------------

	$.ajax({
	    url: eventSearchURL,
	    method: "GET",
	    dataType: "json"
	}).done(function(response) {

		for (var i = 0; i<5; i++){
			
			var a = $("<a></a><br>").addClass("event-button-wrapper");

			var eventTitle = $("<span></span><br>").addClass("buy-button-title").attr("data-eventfulid", response.events.event[i].id).attr("value",response.events.event[i].title).text(response.events.event[i].title);
			a.append(eventTitle);

			var eventStartResult = $("<span></span>").addClass("buy-button-start-time").text("Start Time: " + response.events.event[i].start_time);
			a.append(eventStartResult);

			// var eventEndResult = $("<span></span><br>").addClass("buy-button-end-time").text(" End Time: " + response.events.event[i].stop_time);
			// a.append(eventEndResult);

			var eventVenueResult = $("<span></span><br>").addClass("buy-button-venue").text("Venue: " + response.events.event[i].venue_name);
			a.append(eventVenueResult);

			var eventPriceButton = $("<span></span><br>").attr("data-eventfulid", response.events.event[i].id).attr("id", "price-button-id-" + i).addClass("event-detail-button").text("Click for Pricing");
			a.append(eventPriceButton);


			$("#event-results").append(a);
		}
			$(".buy-button-title").on("click", function(event){
				y = $(this).attr("data-eventfulid");
				z = selectEventPrice(y);
				console.log(z);
				var x = $(this).text();
				console.log(x);
				$('#fAirline').html(selectedFlight.airline);
				$('#fPrice').html(selectedFlight.price);
				$("#itinerary-results").text(x);
				showItineraryResults();
                $('html,body').animate({
                    scrollTop: $('#itinerary').offset().top},'slow');
			});
	
	})
	
// ----------------------- End Get Call -----------------------------------------------------------



// ------------ Hard coded values for testing with Eventful 522 Errors -------------------

			// var a = $("<a></a>").addClass("event-button-wrapper");

			// var eventTitle = $("<span></span>").addClass("buy-button-title").text("Title");
			// a.append(eventTitle);

			// var eventStartResult = $("<span></span>").addClass("buy-button-start-time").text("Start Time: 2pm");
			// a.append(eventStartResult);

			// var eventEndResult = $("<span></span>").addClass("buy-button-end-time").text("End Time: 5pm");
			// a.append(eventEndResult);

			// var eventVenueResult = $("<span></span>").addClass("buy-button-venue").text("Venue: The Double Deuce");
			// a.append(eventVenueResult);

			// var eventPriceButton = $("<button>").attr("data-eventfulid", "E0-001-099584198-2").attr("id", "price-button-id-" + 0).addClass("event-detail-button").text("Click for Pricing");
			// a.append(eventPriceButton);

			// $("#event-results").append(a);

// --------------------- End hard coded values -------------------------------------


});

function showEventResults(){
	var x = document.getElementById('eventTable');
	if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'block';
    }
}

function showItineraryResults(){
	var x = document.getElementById('itineraryTable');
	if (x.style.display === 'none') {
        x.style.display = 'block';
    } else {
        x.style.display = 'block';
    }
}


function displayEventPrice() {

	var eventfulID = $(this).attr("data-eventfulid");
	var buttonID = $(this).attr("id");
	console.log(buttonID);
	var eventGetURL = "http://crossorigin.me/http://api.eventful.com/json/events/get?app_key=wHxG23mXN4PJV7cR&id=" + eventfulID;
	console.log(eventGetURL);



// ------------- Ajax Get call when Eventful is working ----------------------

	$.ajax({
		url: eventGetURL,
		method: "GET",
		dataType: "json"

	}).done(function(response) {

		console.log(response.free);
		console.log(response.price);

		if (response.free === 1){

		$("#" + buttonID).text("Free!");

		} else if (response.price === null){

// Just going to say it's free although may be a missing value -- could do "Unknown" as well

			$("#" + buttonID).text("Free!");

		} else {

			//$("#" + buttonID).text(response.price);

		}

						
	});





// ----------------------- End Get Call -----------------------------------------------------------


// ------------ Hard coded values for testing with Eventful 522 Errors -------------------

	// $("#" + buttonID).text("$27");

// --------------------- End hard coded values -------------------------------------

		
};

function selectEventPrice(a) {

	var eventfulID = a;
	var eventGetURL = "http://crossorigin.me/http://api.eventful.com/json/events/get?app_key=wHxG23mXN4PJV7cR&id=" + eventfulID;
	console.log(eventGetURL);



// ------------- Ajax Get call when Eventful is working ----------------------

	$.ajax({
		url: eventGetURL,
		method: "GET",
		dataType: "json"

	}).done(function(response) {

		console.log(response.free);
		console.log(response.price);

		if (response.free === 1){

			$("#itinerary-results").append(" Free");

		} else if (response.price === null){

// Just going to say it's free although may be a missing value -- could do "Unknown" as well

			$("#itinerary-results").append(" Free!");

		} else {

			$("#itinerary-results").append( response.price);

		}
						
	});

	};	

$(document).on("click", ".event-detail-button", displayEventPrice);
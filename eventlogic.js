

$("#findEvent").on("click", function(event){
	event.preventDefault();
			
	// var location = $("#destination-input").val().trim();
	// var startDate = $("#arrival-input").val().trim();
	// var departDate = $("#departure-input").val().trim();

	// Now will get location start and depart dates from flight info. Placeholders declared below:

	var location = "chicago";
	var startDate = 20170701;
	var departDate = 20170710;

	var dateRange = (startDate + "-" + departDate);
	var interests = $("#interest-input").val().trim()
	
	var eventSearchURL = "http://crossorigin.me/http://api.eventful.com/json/events/search?app_key=wHxG23mXN4PJV7cR&page_size=5&page_number=1&location=" + location + "&date=" + dateRange + "&keywords=" + interests;
	
	console.log(eventSearchURL);


// ------------- Ajax Search call when Eventful is working ----------------------

	$.ajax({
	    url: eventSearchURL,
	    method: "GET",
	    dataType: "json"
	}).done(function(response) {

		for (var i = 0; i<5; i++){
			
			var a = $("<a></a>").addClass("event-button-wrapper");

			var eventTitle = $("<span></span>").addClass("buy-button-title").text(response.events.event[i].title);
			a.append(eventTitle);

			var eventStartResult = $("<span></span>").addClass("buy-button-start-time").text("Start Time: " + response.events.event[i].start_time);
			a.append(eventStartResult);

			var eventEndResult = $("<span></span>").addClass("buy-button-end-time").text("End Time: " + response.events.event[i].stop_time);
			a.append(eventEndResult);

			var eventVenueResult = $("<span></span>").addClass("buy-button-venue").text("Venue: " + response.events.event[i].venue_name);
			a.append(eventVenueResult);

			var eventPriceButton = $("<span></span>").attr("data-eventfulid", response.events.event[i].id).attr("id", "price-button-id-" + i).addClass("event-detail-button").text("Click for Pricing");
			a.append(eventPriceButton);

			$("#event-results").append(a);
		}
	
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

			$("#" + buttonID).text("$" + response.price);

		}
						
	});

// ----------------------- End Get Call -----------------------------------------------------------


// ------------ Hard coded values for testing with Eventful 522 Errors -------------------

	// $("#" + buttonID).text("$27");

// --------------------- End hard coded values -------------------------------------

		
};

$(document).on("click", ".event-detail-button", displayEventPrice);




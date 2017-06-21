
// Destination + Time Frame (coming and going) + Interests (TBD based on Eventful classification)


// DO we store query data in local storage or other before moving to results page

// Eventful requires 

// Title, description, address, time, price, image, category, lat/long for mapping
	

// Assemble start + end into Eventful format 'YYYYMMDD00-YYYYMMDD00',

// 



$("#findEvent").on("click", function(event){
	event.preventDefault();
			
	var location = $("#destination-input").val().trim();
	var startDate = $("#arrival-input").val().trim();
	var departDate = $("#departure-input").val().trim();
	var interests = $("#interest-input").val().trim()
	var dateRange = (startDate + "-" + departDate);

	var eventSearchURL = "http://crossorigin.me/http://api.eventful.com/json/events/search?app_key=wHxG23mXN4PJV7cR&page_size=5&page_number=1&location=" + location + "&date=" + dateRange + "&keywords=" + interests;
	
// have to overtly call out JSON data type to get evenful AJAX call to work
	$.ajax({
	    url: eventSearchURL,
	    method: "GET",
	    dataType: "json"
	}).done(function(response) {

		for (var i = 0; i<5; i++){
			
			var eventTitle = $("<h3></h3>").text(response.events.event[i].title);
			// console.log(eventTitle);
			$("#event-results").append(eventTitle);

			if (response.events.event[i].image === null){
			            // console.log("no image");
			            var image = $("<img>"); 
			            image.attr("src","http://via.placeholder.com/350x150?text=No+Image+Found");
						$("#event-results").append(image);
			        }
			        else{
			            // console.log("image url: " + response.events.event[i].image.url);
			            var image = $("<img>"); 
			            image.attr("src",response.events.event[i].image.url);
						// console.log(image);
						$("#event-results").append(image);
			        }

			var eventStartResult = $("<p></p>").text("Start Time: " + response.events.event[i].start_time);
			$("#event-results").append(eventStartResult);
			// console.log(eventStartResult);

			var eventEndResult = $("<p></p>").text("End Time: " + response.events.event[i].stop_time);
			$("#event-results").append(eventEndResult);
			// console.log(eventEndResult);

			var venueResult = $("<p></p>").text("Venue: " + response.events.event[i].venue_name);
			// console.log(venueResult);
			$("#event-results").append(venueResult);

			if (response.events.event[i].description === null){
			            // console.log("no description");
						var descriptionResult = $("<p></p>").text("Description: No Description Found");
						$("#event-results").append(descriptionResult);
			        }
			        else{
			            // console.log("description: " + response.events.event[i].description);
// Descriptions coming back with encoded characters <br> and em dashes
			            var descriptionResult = $("<p></p>").text("Description: " + response.events.event[i].description);
						// console.log(descriptionResult);
						$("#event-results").append(descriptionResult);
					}

			var findOutButton = $("<button>");
			findOutButton.attr("data-id", response.events.event[i].id).addClass("event-detail-button").text("Find Out More");
			console.log(response.events.event[i].id);
			$("#event-results").append(findOutButton);
		}

// pass a price sum variable from flights into event planner
// Price available in a separate API call (get vs. search) so can we even show price in the for-looped results? 
// Suggestion - have a find out more button that captures the event ID, and only execute the get API call on clicking that button

// Include FOM button in for loop with event ID as data attribute
// On click, ID value is captured from button and submitted in Get API call 
// Event Detail should be separate panel (placeholder added to HTML)

	
	})
	
});



function displayEventDetail() {

	var eventID = $(this).attr("data-id");
			console.log(eventID);
			var eventGetURL = "http://crossorigin.me/http://api.eventful.com/json/events/get?app_key=wHxG23mXN4PJV7cR&id=" + eventID;
			console.log(eventGetURL);

			$.ajax({
		    url: eventGetURL,
		    method: "GET",
		    dataType: "json"
		}).done(function(response) {

			var eventDetailTitle = $("<h3></h3>").text(response.title);
			console.log(eventDetailTitle);
			$("#event-detail").append(eventDetailTitle);


		});
		

	};

$(".event-detail-button").on("click", function(event){

	$("#event-detail").empty();
	displayEventDetail();

});

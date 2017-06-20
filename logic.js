
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

// + "&date=" + dateRange + "&keywords=" + interests

	var queryURL = "http://crossorigin.me/http://api.eventful.com/json/events/search?app_key=wHxG23mXN4PJV7cR&page_size=1&page_number=1&location=" + location ;
	$.ajax({
	    url: queryURL,
	    method: "GET",
	    dataType: "json"
	}).done(function(response) {

		for (var i = 0; i<1; i++){
			

		var i = 0;	
			var eventTitle = $("<h3></h3>").text(response.events.event[i].title);
			console.log(eventTitle);
			$("#event-results").append(eventTitle);

			if (response.events.event[i].image === null){
			            console.log("no image");
			            var image = $("<img>"); 
			            image.attr("src","https://upload.wikimedia.org/wikipedia/en/thumb/4/47/Spongebob-squarepants.svg/666px-Spongebob-squarepants.svg.png");
						$("#event-results").append(image);
			        }
			        else{
			            console.log("image url" + response.events.event[i].image.url);
			            var image = $("<img>"); 
			            image.attr("src",response.events.event[i].image.url);
						console.log(image);
						$("#event-results").append(image);
			        }

			var eventStartResult = $("<p></p>").text("Start Time: " + response.events.event[i].start_time);
			$("#event-results").append(eventStartResult);
			console.log(eventStartResult);

			var venueResult = $("<p></p>").text("Venue: " + response.events.event[i].venue_name);
			console.log(venueResult);
			$("#event-results").append(venueResult);


		}

		// pass a sum variable from flights into event planner

	
	})
	
	});
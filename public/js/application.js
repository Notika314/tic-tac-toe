// alert("hi")
$(document).ready(function() {
	$("#login_button").click(function() {
		$(this).toggleClass("hidden");
		$(this).parent().find("#login_form").toggleClass("hidden");
		$("#signup_button").toggleClass("hidden");
		$("#logout_button").toggleClass("hidden");
	});
	$("#signup_button").click(function() {
		$(this).toggleClass("hidden");
		$(this).parent().find("#signup_form").toggleClass("hidden");
		$("#login_button").toggleClass("hidden");
		$("#logout_button").toggleClass("hidden");s
	});
	// $("#join_game").click(function() {

	// })
	$("#new_game").click(function() {
		$(this).toggleClass("hidden");
		var classNames = $("#new_game").attr("class").split(" ");
		var className = classNames[0].split("-")[1];
		var data = { firstPlayerId: className }
		$.ajax({
			dataType: "json",
			method: "POST", 
			url: "/games", 
			data: data
		}).done(function(response) {
			console.log(response);
		})
	});
	$(".cell").click(function() {
		$(this).append("<h2 class='huge'>X</h2>")
	})


	// setInterval(function(){ alert("Hello"); }, 3000);


})


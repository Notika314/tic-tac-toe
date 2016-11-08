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
		$("#logout_button").toggleClass("hidden");
	});
	$("#new_game").click(function() {
		$(this).toggleClass("hidden");
		$(".game").toggleClass("hidden");
		var classNames = $(".game").attr("class").split(" ");
		var firstPlayerId = parseInt(classNames[classNames.length-1]);
		var data = { firstPlayerId: firstPlayerId }
		$.ajax({
			dataType: "json",
			method: "POST", 
			url: "/games", 
			data: data
		}).done(function(response) {
			console.log(response);
		})
	});


})


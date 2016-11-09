// alert("hi")
var outside ={
	empty: true,
};
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
		$("#all-games").toggleClass("hidden");
		$("table").toggleClass("hidden");
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

	$("#letsStart").click(function() {
		var player1 = $(".my_turn").attr("id");
		var player2 = $(".opponent").attr("id");
		outside.game = new Game(player1,player2);
		outside.empty = "false";	//how to pass game so it exists on the page?
	});
	$(".cell").click(function() {
		var cell = this;
		var gameId = $("table").attr("id").split("-")[1];
		if (outside.game.me.active===true && $(cell).text()=="") {
			$(this).append("<h2 class='huge'></h2>");
			$(this).addClass("taken");
			outside.game.movePlayer(cell,gameId);
		}
	});


	// setInterval(function(){ alert("Hello"); }, 3000);


})


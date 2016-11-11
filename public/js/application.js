// alert("hi")
var outside ={
	empty: true,
	updatedCells: 0,
	updatedCell: -1,
	player1: "",
	player2: "",
	sign: "X",
	opponentsSign: "0"
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
	
	$("#new_game").click(function() {
		$(this).toggleClass("hidden");
		$(".my_turn").toggleClass("hidden");
		$("#all-games").toggleClass("hidden");
		$("table").toggleClass("hidden");
		var table = $("table").attr("class").split(" ");
		var currentPlayer = table[table.length-1];
		console.log("currentPlayer: " + currentPlayer);
		var classNames = $("#new_game").attr("class").split(" ");
		var className = classNames[0].split("-")[1];
		var data = { firstPlayerId: className }
		$.ajax({
			dataType: "json",
			method: "POST", 
			url: "/games", 
			data: data
		}).done(function(response) {
			var gameId = response.game.id;
			$("table").attr("id","game-" + gameId);
			outside.game = new Game(response.game.player1_id);
			outside.gameId = gameId;
		})
		outside.empty = "false";
		outside.joined = "false";
	});

	$("#letsStart").click(function() {
		var player1 = $(".my_turn").attr("id");
		var player2 = $(".opponent").attr("id");
		outside.game = new Game(player1,player2);
		outside.empty = "false";
		var gameId = $("table").attr("id").split("-")[1];
		var table = $("table").attr("class").split(" ");
		var currentPlayer = table[table.length-1];
		// if (currentPlayer == outside.game.me.id.split("-")[1]) { 
		// 	outside.sign = "0";
		// 	outside.opponentsSign = "X";
		// }
		outside.gameId = gameId;
		outside.joined = "true";
	});
	$(".cell").click(function() {
		var cell = this;
		console.log(outside.updatedCell);
		var gameId = $("table").attr("id").split("-")[1];
		if (outside.game.me.active===true && $(cell).text()=="") {
			$(this).append("<h2 class='huge'></h2>");
			$(this).addClass("taken");
			outside.game.movePlayer(cell,gameId);
			outside.updatedCell = $(this).attr("id"); 
			outside.game.me.active = false;
		}
	});
		setInterval(function() {
			var game_id = parseInt(outside.gameId);
			var joined = outside.joined
			if ( game_id > -1 && joined == "false") { 
				$.ajax({
					dataType: "json",
					method: "GET",
					url: "/games/" + game_id + "/check_update"
				}).done(function(response) { 
					if (response.joined === true) { 
						outside.joined = "true";
						outside.game.me.active=true;
						var player2_id = response.game.player2_id;
						var player1_id = outside.game.player1_id;
						console.log("before if ststaement");
						if (response.game.player1_id == outside.game.me.id)  {
							outside.game.opponent.id = response.game.player2_id;
							var player2_name = response.player2_name;
							$(".opponent").removeClass("hidden").append("Player2: "+player2_name);
						}
					 };
			    })
			} else if (game_id > -1 && joined == "true") {
				$.ajax({
					dataType: "json",
					method: "GET",
					url: "/games/" + game_id + "/check_update"
				}).done(function(response) { 
					if ( response.cell[0].coordinates != outside.updatedCell ) { 
						var coordinates = response.cell[response.cell.length-1].coordinates;
						var cellToUpdate = document.getElementById(coordinates);
						$(cellToUpdate).text(outside.opponentsSign);
						outside.game.me.active = true;
					}
				})
			}
		}, 5000)
	// setInterval(function(){ alert("Hello"); }, 3000);


})


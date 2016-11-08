get '/game/index' do 
	@player = Player.find_by(id: session['player_id'])
	@players = Player.all
	@games = Game.all { include :player1 }
	erb :"/game"
end

post "/games" do 
	if request.xhr?
		id = params['firstPlayerId']
		first_player = Player.find_by(id: id.to_i )
		@game = Game.create(player1: first_player)
		content_type :json
		{ game: @game }.to_json
	end
end

put "/games/:id" do 
	@game = Game.find_by(id: params['id'])
	player2 = current_user
	@game.update(player2_id: current_user.id)
	 p @game
end
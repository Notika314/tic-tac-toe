get '/games/index' do 
	@player = Player.find_by(id: session['player_id'])
	@players = Player.all
	@games = Game.all { include :player1 }
	erb :"/games"
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
	@game.update(player2_id: current_user.id)
	redirect "/games/#{@game.id}"
end

get "/games/:id" do 
	@game = Game.find_by(id: params[:id])
	erb :"/game"
end

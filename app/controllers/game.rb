get '/games/index' do 
	@player = Player.find_by(id: session['player_id'])
	@players = Player.all
	@games = Game.all { include :player1 }
	erb :"/games"
end

post "/games" do 
	if request.xhr?
		id = params['firstPlayerId']
		first_player = Player.find_by(id: id.to_i)
		first_player.update!(player_type: "player1")
		@game = Game.create(player1: first_player)
		content_type :json
		{ game: @game }.to_json
	end
end

put "/games/:id" do 
	@game = Game.find_by(id: params[:id])
	@player2 = current_user
	@player2.update!(player_type: "player2")
	@game.update(player2_id: current_user.id, joined: true)
	redirect "/games/#{@game.id}"
end

get "/games/:id" do 
	@game = Game.find_by(id: params[:id])
	if request.xhr? 
		content_type :json
		{yse: "true"}.to_json
	else
		erb :"game"
	end
end

get "/games/:id/check_update" do 
	# Message.order(created_at: :asc).last(10)
	@game = Game.find_by(id: params[:id])
	@updated_cell = Cell.where( new_update: "yes",game_id: @game.id).order(updated_at: :asc).last(1)

	unless @game.player2_id.nil?
		@player = Player.find_by(id: @game.player2_id)
		@player_name = @player.username
	end
	@joined = @game.joined
	content_type :json
	{ cell: @updated_cell , joined: @joined, game: @game , player2_name: @player_name }.to_json
end

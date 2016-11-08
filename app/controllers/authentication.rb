post "/authentication/login" do 
	@player = Player.find_by(username: params['username'])
	if @player
		session['player_id'] = @player.id
		redirect "/games/index"
	else
		redirect "/"
	end
end

get "/authentication/logout" do 
	session['player_id'] = nil
	redirect "/"
end

post "/authentication/signup" do
	if params['password'] == params['password_confirm']
		@player = Player.new(username: params['username'], email: params['email'], password: params['password'])
		if @player.save
			session['player_id'] = @player.id
			redirect "/games/index"
		else
			[400,"could not save user, try different email"]
		end
	else
		[400,"passwords have to match"]
	end

end


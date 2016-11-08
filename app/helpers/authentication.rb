def current_user
	session['player_id']? Player.find(session['player_id']) : nil
end
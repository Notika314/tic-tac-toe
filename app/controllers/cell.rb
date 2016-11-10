put "/cells/:id" do 
	if request.xhr?
		@cell = Cell.find_by(coordinates: params['coordinates'])
		@game = Game.find_by(id: params['game_id'].to_s)
		@content = params['content']
		@cell.update!(content: @content, new_update: "yes",game: @game)
		content_type :json
    { cell: @cell }.to_json
	end
end
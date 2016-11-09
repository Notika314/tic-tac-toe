put "/cells/:id" do 
	if request.xhr?
		@game = Game.find_by(id: params['game_id'].to_s)
		@cell = Cell.find_by(coordinates: params['coordinates'])
		@content = params['content']
		@cell.update!(content: @content)
		content_type :json
    { cell: @cell }.to_json
	end
end
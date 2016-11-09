class Game < ActiveRecord::Base
	after_create :generate_cells
	belongs_to :player1, :class_name => 'Player', :foreign_key => :player1_id
	belongs_to :player2, :class_name => 'Player', :foreign_key => :player2_id
	has_many :cells
	def generate_cells
		cells = []
		9.times do |i|
			cell = Cell.create(content: "", game_id: self.id, coordinates: i)
			cells << cell
		end
	end

	def update_cell(id, new_content)
		@cell= Cell.find_by(coordinates: id)
		@cell.update!(content: new_content)
	end
end

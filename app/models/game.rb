class Game < ActiveRecord::Base
	after_create :generate_cells, :wait_to_join

	belongs_to :player1, :class_name => 'Player', :foreign_key => :player1_id
	belongs_to :player2, :class_name => 'Player', :foreign_key => :player2_id
	has_many :cells
	def generate_cells
		game = self
		cells = []
		9.times do |i|
			cell = Cell.new(content: "", coordinates: i,new_update: "")
			self.cells << cell
		end
	end

	def update_cell(id, new_content)
		@cell= Cell.find_by(coordinates: id)
		@cell.update!(content: new_content, new_update: "yes")
	end
	def wait_to_join
		self.joined = false
	end
	
end

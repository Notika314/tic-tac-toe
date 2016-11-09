class CreateCells < ActiveRecord::Migration
  def change
  	create_table :cells do |t|
  		t.string :content
  		t.integer :game_id
  		t.string :coordinates
  		
  		t.timestamps null: false
  	end
  end
end

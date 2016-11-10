class CreatePlayers < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.string :username, null: false
  		t.string :password_digest, null: false
  		t.string :email, null: false
  		t.string :player_type
  		
  		t.timestamps null: false
  	end
  end
end

require "bcrypt"
class Player < ActiveRecord::Base
	has_secure_password
	has_many :games, :class_name => "Game", :foreign_key => 'player1_id'
	has_many :games, :class_name => "Game", :foreign_key => 'player2_id'
	validates :email, uniqueness: true
	validates_confirmation_of :password

	def logged_in?
		session[:user_id] == self.id
	end
	def all_games
		Game.where(player1: self) + Game.where(player2: self)
	end
end

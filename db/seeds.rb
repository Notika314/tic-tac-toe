mark = Player.create(username: "Mark", email: "mark@gmail.com",password: "1234")
lia = Player.create(username: "Lia", email: "lia@gmail.com", password: "1234")
sonia= Player.create(username: "Sonia", email: "sonia@gmail.com", password: "1234")
dan = Player.create(username: "Daniel", email: "daniel@gmail.com", password: "1234")
matt = Player.create(username: "Matt", email: "matt@gmail.com", password: "1234")

game1 = Game.create(player1: lia, player2: matt)
game2 = Game.create(player1: dan, player2: matt)
game3 = Game.create(player1: sonia, player2: mark)
game4 = Game.create(player1: dan, player2: lia)
(function () {
	var Land = window.Land = function () {
		this.image = game.R.land
		this.y = game.canvas.height * 0.75
		this.x = 0
		this.w = 336
		this.h = 112
	}
	Land.prototype.update = function(){
		this.x -= 2
		if (this.x < -this.w) {
			this.x = 0
		}
	}
	Land.prototype.render = function(){
		game.ctx.drawImage(this.image,this.x, this.y)
		game.ctx.drawImage(this.image,this.x + this.w, this.y)
		game.ctx.drawImage(this.image,this.x + this.w*2, this.y)
		//画大地
		game.ctx.fillStyle = '#DED895'
		game.ctx.fillRect(0,this.y + this.h, game.canvas.width,game.canvas.height * 0.25)
	};	
}())
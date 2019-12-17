(function () {
	var Background = window.Background = function () {
		this.image = game.R.bg_day
		this.y = game.canvas.height * 0.75 - 396
		this.w = 288
		this.h = 512
		this.x = 0
		this.speed = 1


	}
	Background.prototype.update = function(){
		this.x -= this.speed	
		if (this.x < -this.w) {
			this.x = 0
		}
	}
	Background.prototype.render = function(){
		game.ctx.drawImage(this.image, this.x,this.y)
		game.ctx.drawImage(this.image, this.x + this.w-10,this.y)
		game.ctx.drawImage(this.image, this.x + this.w *2-10,this.y)
		// 渲染天空
		game.ctx.fillStyle = '#4EC0CA'
		game.ctx.fillRect(0, 0, game.canvas.width, this.y + 10)
		// 渲染大地
		game.ctx.fillStyle = '#5EE270'
		game.ctx.fillRect(0,this.y + this.h - 10,game.canvas.width,game.canvas.height - this.h - this.y)
	}	
}())
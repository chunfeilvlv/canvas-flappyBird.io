(function () {
	var Pipe = window.Pipe = function () {
		this.imageDown = game.R.pipe_down
		this.imageUp = game.R.pipe_up
		this.allHeight = game.canvas.height * 0.75
		this.imageH = 320
		this.imageW = 52
		this.interspace = 120
		this.baseHeight = 100
		this.alreadyPass = false
		
		this.upHeight = this.baseHeight + parseInt(Math.random()*(this.imageH-this.baseHeight))
		this.downHeight = this.allHeight - this.upHeight -this.interspace
		this.x = game.canvas.width
		if (this.downHeight > this.imageH) {
			this.downHeight = this.imageH
			this.interspace = this.allHeight -this.upHeight-this.downHeight
		}
		game.pipeArr.push(this)
		
	}
	Pipe.prototype.update = function(){
		this.x -= 2
		if ((game.bird.R > this.x) && game.bird.L < (this.x + 52)) {
			if (game.bird.T < this.upHeight || game.bird.B > (this.upHeight + this.interspace)) {
				console.log('碰撞了')
				game.sceneManager.enter(4)
				
			}
		}
		if (game.bird.R > this.x + 52 && !this.alreadyPass) {
			game.score ++
			this.alreadyPass = true
		}
		if (this.x < -52) {
			for (var i = 0; i < game.pipeArr.length; i++) {
				if (game.pipeArr == this) {
					game.pipeArr.splice(i, 1)
				}
			}
		}
	}
	Pipe.prototype.render = function(){
		game.ctx.drawImage(this.imageDown,0,this.imageH- this.upHeight,this.imageW,this.upHeight,this.x,0,this.imageW,this.upHeight)
		game.ctx.drawImage(this.imageUp,0,0,this.imageW,this.downHeight,this.x,this.interspace + this.upHeight,this.imageW,this.downHeight)
		// game.ctx.fillStyle = 'black'
		// game.ctx.fillText(this.x,this.x,100)
		// game.ctx.fillText(this.upHeight,this.x + 30,this.upHeight)
		// game.ctx.fillText(this.interspace + this.upHeight,this.x + 30,this.interspace + this.upHeight)
		// console.log(this.x,this.upHeight,this.downHeight)
	};	
}())
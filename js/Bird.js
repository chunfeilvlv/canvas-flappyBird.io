(function () {
	var Bird = window.Bird = function () {
		this.color = parseInt(Math.random()*3)
		this.imageArr  = [game.R['bird' + this.color +'_0'],game.R['bird' + this.color +'_1'],game.R['bird' + this.color +'_2']]
		this.wingStep = 0
		this.x = game.canvas.width * (1-0.618) -24;
		this.y = 100
		this.birdno = 0
		this.rotateAngle = 0
		this.hasEnergy = false

	}
	Bird.prototype.update = function(){	
		if (!this.hasEnergy) {
			this.y += this.birdno * 0.6
		} else {
			this.y -= (20-this.birdno) * 0.41
			if (this.birdno > 20) {
				this.hasEnergy = false
				this.birdno = 0
			}
		}
		this.rotateAngle += 0.04
		this.birdno ++
		if (this.y < 0) {
			this.y = 0
		}
		this.T =this.y - 12
		this.B =this.y + 12
		this.L =this.x - 17
		this.R =this.x + 17
		if (this.B > game.ctx.canvas.height * 0.75) {
			
			game.sceneManager.enter(4)
		}
		
	}
	Bird.prototype.render = function(){
		game.ctx.save()
		game.ctx.translate(this.x, this.y)
		game.ctx.rotate(this.rotateAngle)
		game.ctx.drawImage(this.imageArr[this.wingStep], -24, -24)
		game.ctx.restore()
		game.ctx.save()
		// game.ctx.fillStyle = 'black'
		// game.ctx.fillText(this.T,this.x+20,this.y + 50)
		// game.ctx.fillText(this.B,this.x+20,this.y + 70)
		// game.ctx.fillText(this.T,this.x+20,this.y + 90)
		// game.ctx.fillText(this.T,this.x+20,this.y + 110)
		// game.ctx.restore()
	}
	Bird.prototype.fly = function(){
		this.hasEnergy = true
		this.rotateAngle = -0.6
		this.birdno = 0
	}
	// 小鸟扇动翅膀
	Bird.prototype.swing = function () {
		game.fno % 150 == 0 && this.wingStep ++
		if (this.wingStep >= 2) {
			this.wingStep = 0
		}
	}		
}())
(function () {
	var SceneManager = window.SceneManager = function () {
		// 1表示欢迎屏幕
		this.sceneNumber = 1
		
		this.logoY =-20
		this.buttonImageW = 116
		this.buttonImageH = 70
		this.button_playX = game.canvas.width / 2 -58
		this.button_playY = game.canvas.height

		game.background = new Background()
		game.bird = new Bird()
		game.land = new Land()
		this.bindEvent()
	}
	SceneManager.prototype.update = function(){
		switch (this.sceneNumber) {
			case 1:
				this.logoY += 2
				if (this.logoY >120) {
					this.logoY = 120
				}
				this.button_playY -= 6
				if (this.button_playY < 300) {
					this.button_playY = 300
				}
				break;
			case 2:
				game.bird.swing()
				if (this.tutorialOpacityIsDown) {
					this.tutorialOpacity -= 0.1
				} else {
					this.tutorialOpacity += 0.1
				}
				if (this.tutorialOpacity < 0.02 || this.tutorialOpacity > 0.98) {
					this.tutorialOpacityIsDown = !this.tutorialOpacityIsDown
				}
				break;
			case 3:
				game.bird.update()
				game.background.update()
				game.land.update()
				game.fno % 150 == 0 && (new Pipe())
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].update()	
				}
				break;
			case 4:
				if (game.bird.y > game.canvas.height * 0.75 -17) {
					this.isBirdLand = true
				}
				game.fno % 5 == 0 && this.birdFno ++
				if (!this.isBirdLand) {
					game.bird.y += 1 * this.birdFno
				} else {
					game.fno % 5 == 0 && this.bombStep ++
				}
				this.maskOpacity -= 0.1
				if (this.maskOpacity < 0) {
					this.maskOpacity = 0
				}
				break;

		}
	}
	SceneManager.prototype.render = function(){
		
		switch (this.sceneNumber) {
			case 1:
				game.background.render()
				game.land.render()
				game.bird.render()
				game.bird.x = game.canvas.width / 2
				game.bird.y = 220
				game.ctx.drawImage(game.R['logo'], game.canvas.width / 2 - 89, this.logoY)
				game.ctx.drawImage(game.R['button_play'], this.button_playX, this.button_playY)
				break;
			case 2:
				game.background.render()
				game.land.render()
				game.bird.render()
				game.ctx.save()
				game.ctx.globalAlpha = this.tutorialOpacity
				game.ctx.drawImage(game.R['tutorial'], this.button_playX, this.button_playY-50)
				game.ctx.restore()
				break;
			case 3:
				game.background.render()
				game.land.render()
				game.bird.render()
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				game.scoreLength = game.score.toString().length
				for (var i = 0; i < game.scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 -  game.scoreLength /2 * 34 + 34 * i,100)
				}
				break;
			case 4:
				game.background.render()
				game.land.render()
				if (!this.isBirdLand) {
					game.bird.render()
				} else {
					if (this.bombStep <= 11) {
						game.ctx.drawImage(game.R["b" + this.bombStep],game.bird.x - 24 - 36, game.bird.y - 24 - 60);
					} else {
						this.enter(5)
					}
				}
				
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render()
				}
				// 画大白屏
				game.ctx.fillStyle = "rgba(255,255,255," + this.maskOpacity + ")";
				game.ctx.fillRect(0,0,game.canvas.width , game.canvas.height);
				// 画分数
				game.scoreLength = game.score.toString().length
				for (var i = 0; i < game.scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 - game.scoreLength /2 * 34 + 34 * i,100)
				}
				break;
			case 5:
				game.background.render();
				//渲染大地
				game.land.render();
				 
				//渲染管子
				for (var i = 0; i < game.pipeArr.length; i++) {
					game.pipeArr[i] && game.pipeArr[i].render();
				}
			 
				//打印当前分数
				//当前分数的位数，比如66分就是2位
				game.scoreLength = game.score.toString().length
				for (var i = 0; i < game.scoreLength; i++) {
					game.ctx.drawImage(game.R["shuzi" + game.score.toString().charAt(i)],game.canvas.width / 2 -  game.scoreLength /2 * 34 + 34 * i,100)
				}

				//渲染重新再来
				game.ctx.drawImage(game.R["text_game_over"],game.canvas.width / 2 - 102 , 200);
		}
	}
	SceneManager.prototype.enter = function(number){
		this.sceneNumber = number
		switch (this.sceneNumber) {
			case 1:
				game.bird.rotateAngle = 0
				this.logoY = -20
				this.button_playY = game.canvas.height
				break;
			case 2:
				game.bird.y = 150
				this.tutorialOpacity = 1
				this.tutorialOpacityIsDown = true
				break;
			case 3:
				game.pipeArr = new Array()
				break;
			case 4:
				this.maskOpacity = 1
				this.isBirdLand = false
				this.birdFno = 0
				this.bombStep = 0
				break;
			case 5:
				break;
		}
	}
	SceneManager.prototype.bindEvent = function(number){
		var self = this
		game.canvas.onclick = function (e) {
			var mouseX = e.clientX
			var mouseY = e.clientY
			switch (self.sceneNumber) {
				case 1:
					// console.log(mouseX,self.button_playX, self.button_playX +self.buttonImageW, mouseY,self.button_playY,self.button_playY + self.buttonImageH)
					// console.log(mouseX > self.button_playX,mouseX < self.button_playX + self.buttonImageW,mouseY > self.button_playY,mouseY < self.button_playY + self.buttonImageH)
					if (mouseX > self.button_playX && mouseX < self.button_playX + self.buttonImageW && mouseY > self.button_playY && mouseY < self.button_playY + self.buttonImageH) {
						self.enter(2)
					}
					break;
				case 2:
					self.enter(3)
					break;
				case 3: 
					game.bird.fly()
					break;
				case 5:
					self.enter(1)

			}
		}
	};
}())
(function () {
	var Game = window.Game = function (canvasObject) {
		this.canvas = document.querySelector(canvasObject.canvasid)
		this.Rjsonurl = canvasObject.Rjsonurl
		this.ctx = this.canvas.getContext('2d')
		// 帧编号
		this.fno = 0
		this.score = 0
		this.collide = false
		this.init()
		// 读取资源并处理资源，传入一个回调函数
		var self = this
		this.loadAllResource(function () {
			self.start()
			// self.bindEvent()

		})
		// this.pipeArr = []
	}
	Game.prototype.init = function(){
		this.windowW = document.documentElement.clientWidth
		this.widowH = document.documentElement.clientHeight
		// 设置视口的宽度和高度，任何手机都是充满屏幕的
		if (this.windowW > 414) {
			this.windowW = 414
		} else if (this.windowW < 320) {
			this.windowW = 320
		}
		if (this.widowH > 812) {
			this.widowH = 812
		} else if (this.widowH <500) {
			this.widowH = 500
		}
		this.canvas.width = this.windowW
		this.canvas.height = this.widowH
	};
	Game.prototype.loadAllResource = function(callback){
		this.R = {}
		var alreadyDoneNumber = 0
		var xhr = new XMLHttpRequest()
		xhr.open('get', './R.json', true)
		xhr.send(null)
		var self = this
		xhr.onreadystatechange = function () {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var R_obj = JSON.parse(xhr.responseText)
			// console.log(R_obj)
			for (var i = 0; i < R_obj.images.length; i++) {
				self.R[R_obj.images[i].name]= new Image()
				self.R[R_obj.images[i].name].src = R_obj.images[i].url
				self.R[R_obj.images[i].name].onload = function () {
					alreadyDoneNumber ++
					self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height)
					self.ctx.textAlign = 'center'
					self.ctx.font = '20px 微软雅黑'
					self.ctx.fillText('正在加载第' + alreadyDoneNumber + '/' + R_obj.images.length + '张图片，请稍后',self.canvas.width / 2,self.canvas.height * (1-0.618))
					
					if (alreadyDoneNumber === R_obj.images.length ) {
						callback() && callback().call(self)
					}
				}
			}
		}
	}
	};
	Game.prototype.start = function(){
		// 实例化背景
		// this.background = new Background()
		// this.land = new Land()
		// this.bird = new Bird()
		this.sceneManager = new SceneManager()
		var self = this
		self.timer = setInterval(function () {
			
			self.fno ++
			self.ctx.clearRect(0,0,self.canvas.width,self.canvas.height)
			// self.background.update()
			// self.background.render()
			// self.land.update()
			// self.land.render()
			// 渲染Pipe
			// for (var i = 0; i < self.pipeArr.length; i++) {
			// 	self.pipeArr[i] && self.pipeArr[i].update()
			// 	self.pipeArr[i] && self.pipeArr[i].render()
			// }
			//渲染小鸟
			// self.bird.update()
			// self.bird.render()
			//打印分数
			// self.scoreLength = self.score.toString().length
			// for (var i = 0; i < self.scoreLength; i++) {
			// 	self.ctx.drawImage(self.R["shuzi" + self.score.toString().charAt(i)],self.canvas.width / 2 -  self.scoreLength /2 * 34 + 34 * i,100)
			// }
			// self.ctx.drawImage(self.R["shuzi0"],self.canvas.width / 2 - 2 * 34,100)
			
			// self.ctx.drawImage(self.R["shuzi2"],self.canvas.width / 2 - 2 * 34 + 34* 2,100)
			// self.ctx.drawImage(self.R["shuzi3"],self.canvas.width / 2 - 2 * 34 +34* 3,100)
			// self.fno % 100 == 0 && (new Pipe())
			self.sceneManager.render()
			self.sceneManager.update()
			self.ctx.font = '15px consolas'
			self.ctx.fillStyle = 'black'
			self.ctx.textAlign = 'left'
			self.ctx.fillText('FNO:'+self.fno, 10, 20)
			self.ctx.fillText('sceneNumber:' + self.sceneManager.sceneNumber,10 ,40)
		}, 20)
	};
	// Game.prototype.bindEvent = function () {
	// 	var self = this
	// 	// this.canvas.onclick = function () {
	// 	// 	self.bird.fly()
	// 	//}
	// }
	
}())
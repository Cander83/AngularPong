import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit
{

	@ViewChild('canvas', { static: true })
	canvas: ElementRef<HTMLCanvasElement>;
	private canvasContext: CanvasRenderingContext2D;

	PADDLE_HEIGHT: number = 100;

	ballX: number = 50;
	ballY: number = 50;

	ballSpeedX: number = 5;
	ballSpeedY: number = 4;

	height = 600;
	width = 800;

	paddle1Y: number = 250;

	constructor() { }

	ngOnInit()
	{
		this.initialize();

	}

	initialize()
	{
		this.canvasContext = this.canvas.nativeElement.getContext('2d');
		this.moveAndAnimate();

		var framesPerSecond = 30;

		//()=> means function() such that, it's like a lambda.
		setInterval(() => { this.moveAndAnimate(); }, 1000 / framesPerSecond);

		this.canvas.nativeElement.addEventListener('mousemove', (evt) =>
		{
			var mousePos = this.calculateMousePos(evt);
			this.paddle1Y = mousePos.y - (this.PADDLE_HEIGHT / 2);
		});

	}

	ballReset()
	{
		this.ballX = this.width / 2;
		this.ballY = this.height / 2;
	}

	calculateMousePos(evt)
	{
		var rect = this.canvas.nativeElement.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		return {
			x: mouseX,
			y: mouseY
		};
	}

	private moveAndAnimate()
	{
		this.move();
		this.animate();
	}

	private move(): void
	{
		this.ballX = this.ballX + this.ballSpeedX;
		this.ballY = this.ballY + this.ballSpeedY;

		if (this.ballX < 0)
		{
			if (this.ballY > this.paddle1Y && this.ballY < this.paddle1Y + this.PADDLE_HEIGHT)
			{
				this.bounceHorizontal();
			}
			else
			{
				this.ballReset();
			}
		}


		if (this.ballX > this.width || this.ballX < 0)
		{
			this.bounceHorizontal();
		}

		if (this.ballY > this.height || this.ballY < 0)
		{
			this.ballSpeedY = -this.ballSpeedY;
		}

	}

	private bounceHorizontal(): void
	{
		this.ballSpeedX = -this.ballSpeedX;
	}

	private animate()
	{
		//Background
		let background = new Background(this.canvasContext);
		background.draw(this.width, this.height);

		//LefthandPaddle
		let paddle = new Paddle(this.canvasContext);
		paddle.draw(0, this.paddle1Y, 10, 'white')

		//RighthandPaddle
		let rightPaddle = new Paddle(this.canvasContext);
		rightPaddle.draw(this.width - 10, 210, 10, 'white')

		//Ball
		let ball = new Ball(this.canvasContext);
		ball.draw(this.ballX, this.ballY, 'red')

	}


}

export class Background
{
	constructor(private ctx: CanvasRenderingContext2D) { }

	draw(width: number, height: number)
	{
		this.ctx.fillStyle = 'black';
		this.ctx.fillRect(0, 0, width, height);
	}
}

export class Paddle
{
	PADDLE_HEIGHT: number = 100;

	constructor(private ctx: CanvasRenderingContext2D) { }

	draw(leftX, topY, width, drawColor)
	{
		this.ctx.fillStyle = drawColor;
		this.ctx.fillRect(leftX, topY, width, this.PADDLE_HEIGHT);
	}
}

export class Ball
{
	constructor(private ctx: CanvasRenderingContext2D) { }

	draw(ballX, ballY, drawColor)
	{
		this.ctx.fillStyle = drawColor;
		this.ctx.beginPath();
		this.ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
		this.ctx.fill();

	}
}

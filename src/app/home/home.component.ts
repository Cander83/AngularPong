import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackgroundViewModel } from '../ViewModels/BackgroundViewModel';
import { PaddleViewModel } from '../ViewModels/PaddleViewModel';
import { BallViewModel } from '../ViewModels/BallViewModel';
import { Ball } from '../gameObjects/Ball';
import { Position } from '../gameObjects/position';
import { Paddle } from '../gameObjects/Paddle';

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

	ball: Ball;

	backgroundViewModel: BackgroundViewModel;
	ballViewModel: BallViewModel;
	leftHandPaddleViewModel: PaddleViewModel;
	rightHandPaddleViewModel: PaddleViewModel;

	fieldHeight = 600;
	fieldWidth = 800;

	paddle1: Paddle = new Paddle(0, 250);
	//paddle1Y: number = 250;
	//paddle1X: number = 10;

	paddle2: Paddle = new Paddle(10, 250);
	paddle2Y: number = 250;
	paddle2X: number = 10;

	constructor() { }

	ngOnInit()
	{
		this.initialize();

	}

	initialize()
	{
		var framesPerSecond = 30;

		this.ball = new Ball();

		this.canvasContext = this.canvas.nativeElement.getContext('2d');

		this.initializeViewModels();

		//()=> means function() such that, it's like a lambda.
		setInterval(() => { this.moveAndAnimate(); }, 1000 / framesPerSecond);

		this.addMouseEventListener();

	}

	initializeViewModels()
	{
		this.backgroundViewModel = new BackgroundViewModel(this.canvasContext);
		this.ballViewModel = new BallViewModel(this.canvasContext);
		this.leftHandPaddleViewModel = new PaddleViewModel(this.canvasContext);
		this.rightHandPaddleViewModel = new PaddleViewModel(this.canvasContext);
	}

	addMouseEventListener()
	{
		this.canvas.nativeElement.addEventListener('mousemove', (evt) =>
		{
			var mousePos = this.calculateMousePos(evt);

			//this.paddle1Y = mousePos.y - (this.PADDLE_HEIGHT / 2);
			this.paddle1.paddlePosition.y = mousePos.y - (this.PADDLE_HEIGHT / 2);
			console.log(this.paddle1.paddlePosition);

		});
	}

	ballReset()
	{
		this.ball.reset(this.fieldWidth, this.fieldHeight);
	}

	calculateMousePos(evt): Position 
	{
		var rect = this.canvas.nativeElement.getBoundingClientRect();
		var root = document.documentElement;
		var mouseX = evt.clientX - rect.left - root.scrollLeft;
		var mouseY = evt.clientY - rect.top - root.scrollTop;
		var position = new Position();
		position.x = mouseX;
		position.y = mouseY
		return position;
	}

	private moveAndAnimate()
	{
		this.move();

		this.animate();
	}

	private move(): void
	{
		this.ball.move();

		if (this.ball.ballPosition.x <= this.paddle1.paddlePosition.x + 10)
		{
			if (this.ball.ballPosition.y > this.paddle1.paddlePosition.y && this.ball.ballPosition.y < (this.paddle1.paddlePosition.y + this.PADDLE_HEIGHT))
			{
				this.ball.bounceHorizontal();

			}
		}

		//RightHand score mechanism
		if (this.ball.ballPosition.x <= 0)
		{
			this.ballReset();

		}

		//LeftHand score mechanism
		// if (this.ball.ballX >= this.fieldWidth)
		// {
		// 	this.ballReset();
		// }

		//Lefthand singlePlayer algorithm
		if (this.ball.ballPosition.x >= this.fieldWidth)
		{
			this.ball.bounceHorizontal();
		}

		//Field bounce logic
		if (this.ball.ballPosition.y >= this.fieldHeight || this.ball.ballPosition.y <= 0)
		{
			this.ball.bounceVertical();
		}

	}

	private animate()
	{
		//Background
		this.backgroundViewModel.draw(this.fieldWidth, this.fieldHeight);

		//LefthandPaddle
		this.leftHandPaddleViewModel.draw(0, this.paddle1.paddlePosition.y, 'white')

		//RighthandPaddle
		this.rightHandPaddleViewModel.draw(this.fieldWidth - 10, this.paddle2Y, 'white')

		//Ball	
		this.ballViewModel.draw(this.ball.ballPosition, 'red')

	}
}
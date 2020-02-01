import { Position } from '../gameObjects/position';

export class PaddleViewModel
{
    PADDLE_HEIGHT: number = 100;
    PADDLE_WIDTH: number = 10;

    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(position: Position, drawColor)
    {
        this.ctx.fillStyle = drawColor;
        this.ctx.fillRect(position.x, position.y, this.PADDLE_WIDTH, this.PADDLE_HEIGHT);
    }
}
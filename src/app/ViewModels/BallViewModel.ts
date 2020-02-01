import { Position } from '../gameObjects/position';

export class BallViewModel
{
    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(ballPosition: Position, drawColor)
    {
        this.ctx.fillStyle = drawColor;
        this.ctx.beginPath();
        this.ctx.arc(ballPosition.x, ballPosition.y, 10, 0, Math.PI * 2, true);
        this.ctx.fill();

    }
}
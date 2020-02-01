export class PaddleViewModel
{
    PADDLE_HEIGHT: number = 100;
    PADDLE_WIDTH: number = 10;

    constructor(private ctx: CanvasRenderingContext2D) { }

    draw(leftX, topY, drawColor)
    {
        this.ctx.fillStyle = drawColor;
        this.ctx.fillRect(leftX, topY, this.PADDLE_WIDTH, this.PADDLE_HEIGHT);
    }
}
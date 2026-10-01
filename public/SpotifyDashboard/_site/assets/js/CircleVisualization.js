import { AudioVisualization } from "./AudioVisualization.js";

export class CircleVisualization extends AudioVisualization {
  constructor(canvas, audioProcessor) {
    super(canvas, audioProcessor);
    this.name = "Forma Circular";
    this.numDots = 1000;
    this.centerCircle();
  }

  update() {
    super.update();
    this.centerCircle();
    this.draw();
  }

  draw() {
    this.clearCanvas();

    const data = this.audioProcessor
      ? this.audioProcessor.getWaveformData()
      : this.testData;

    this.numDots = data.length;
    this.ctx.beginPath();
    const dotRadius = 2;
    const dotDistance = this.radius;

    for (let i = 0; i < this.numDots; i++) {
      const angle = (i / this.numDots) * Math.PI * 2;

      const force = data[i] / 255;

      const x = this.centerX + dotDistance * force * Math.cos(angle);
      const y = this.centerY + dotDistance * force * Math.sin(angle);

      this.ctx.arc(x, y, dotRadius, 0, Math.PI * 2);
    }
    this.ctx.closePath();
    this.ctx.fillStyle = `rgba(164, 93, 240, 1)`;
    this.ctx.fill();
  }

  centerCircle() {
    this.radius = this.canvas.clientHeight / 2;
    this.centerX = this.canvas.clientWidth / 2;
    this.centerY = this.canvas.clientHeight / 2;
  }
}

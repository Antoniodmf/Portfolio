import { AudioVisualization } from "./AudioVisualization.js";

export class WaveformVisualization extends AudioVisualization {
  constructor(canvas, audioProcessor) {
    super(canvas, audioProcessor);
    this.name = "Forma de Onda";
    // Inicializar propriedades específicas
  }

  draw() {
    // TODO: desenhar forma de onda
    this.clearCanvas();

    // Implementação básica para teste
    const data = this.audioProcessor
      ? this.audioProcessor.getWaveformData()
      : this.testData;
    const sliceWidth = this.canvas.clientWidth / data.length;

    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.clientHeight / 2);

    for (let i = 0; i < data.length; i++) {
      const v = (data[i]*0.175) / 128.0;
      const y = (v * this.canvas.clientHeight/2) + this.canvas.clientHeight*0.4;
      const x = i * sliceWidth;

      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }

    this.ctx.strokeStyle = "#1db954";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
  }
}

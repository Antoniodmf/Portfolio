import { SpectrumVisualization } from "./SpectrumVisualization.js";
import { WaveformVisualization } from "./WaveformVisualization.js";
import { ParticleVisualization } from "./ParticleVisualization.js";
import { CircleVisualization } from "./CircleVisualization.js";

export class VisualizationEngine {
  constructor(canvasId, audioProcessor) {
    this.audioProcessor = audioProcessor;
    this.canvas = document.getElementById(canvasId);

    this.ctx = this.canvas.getContext("2d");
    this.visualizations = new Map();
    this.currentVisualization = null;
    this.animationId = null;
    this.isRunning = false;
    this.resizeCanvas();

    // Inicializar visualizações
    this.initVisualizations();
    this.start();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();

    // Define resolução REAL do canvas (backing store)
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Escala o contexto para manter coordenadas CSS
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  initVisualizations() {
    // TODO: inicializar tipos de visualização
    this.visualizations.set(
      "spectrum",
      new SpectrumVisualization(this.canvas, this.audioProcessor)
    );
    this.visualizations.set(
      "waveform",
      new WaveformVisualization(this.canvas, this.audioProcessor)
    );
    this.visualizations.set(
      "particles",
      new ParticleVisualization(this.canvas, this.audioProcessor)
    );
    this.visualizations.set(
      "circular",
      new CircleVisualization(this.canvas, this.audioProcessor)
    );
  }

  setVisualization(type) {
    // TODO: definir visualização atual
    console.log(`Definindo visualização: ${type}`);
    this.currentVisualization = this.visualizations.get(type);

    return false; // Devolver boolean indicando sucesso
  }

  async start() {
    // TODO: iniciar animação
    if (!this.isRunning) this.isRunning = true;

    const loop = () => {
      if (!this.isRunning) return;
      if (this.currentVisualization) {
        this.audioProcessor.update();
        this.currentVisualization.update();
        this.currentVisualization.draw();
      }
      this.animationId = requestAnimationFrame(loop);
    };

    loop();
  }

  stop() {
    // TODO: parar animação
    console.log("Parando motor de visualização...");
    this.isRunning = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }
}

export class AudioProcessor {
  constructor() {
    try {
      this.audioContext = new AudioContext();
    } catch (error) {
      console.error("Web Audio API não suportada: ", error);
      throw new Error("O navegador não suporta a API Web Audio");
    }
    this.analyser = this.audioContext.createAnalyser();
    this.gain = this.audioContext.createGain();
    this.osc = null;
    this.mediaStream = null;
    this.frequencyData = null;
    this.waveformData = null;
    this.isPlaying = false;
    this.setupAnalyser();
    this.gain.gain.value = 0.5;
  }

  async startMicrophone() {
    try {
      await this.stop();

      this.setupAnalyser();

      await this.ensureRunning();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          audio: true,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      const mediaSource = this.audioContext.createMediaStreamSource(stream);

      this.connectSource(mediaSource);
    } catch (error) {
      console.error("Erro no Microfone: ", error);
    }
  }

  async resumeAudio() {
    if (this.audioContext.state === "running") {
      await this.audioContext.suspend();
      this.isPlaying = false;
    } else {
      await this.ensureRunning();
      this.isPlaying = true;
    }
  }

  setupAnalyser() {
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 2048;
    this.analyser.smoothingTimeConstant = 0.8;
    this.analyser.minDecibels = -90;
    this.analyser.maxDecibels = 20;

    const bufferLength = this.analyser.frequencyBinCount;
    this.frequencyData = new Uint8Array(bufferLength);
    this.waveformData = new Uint8Array(bufferLength);
  }

  async loadAudioFile(file) {
    console.log("Carregando ficheiro de áudio...");

    await this.stop();

    this.setupAnalyser();

    await this.ensureRunning();

    this.analyser.connect(this.gain);

    const reader = new FileReader();

    reader.onload = async (e) => {
      const audioData = e.target.result;
      const audioBuffer = await this.audioContext.decodeAudioData(audioData);
      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      this.connectSource(source, true);
      source.loop = true;

      source.start();
    };
    reader.readAsArrayBuffer(file);
  }

  async generateFreq(freq) {
    if (freq < 1) {
      if (this.osc) {
        try {
          this.osc.stop();
        } catch (e) {}
        this.osc.disconnect();
        this.osc = null;
      }
      return;
    }

    this.stop();

    await this.ensureRunning();

    const osc = this.audioContext.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.audioContext.currentTime);

    this.connectSource(osc, true);

    osc.connect(this.gain);

    osc.start();

    this.osc = osc;
  }

  async ensureRunning() {
    if (this.audioContext.state === "suspended") {
      await this.audioContext.resume();
    }
    this.isPlaying = true;
  }

  async stop() {
    // TODO: parar processamento de áudio
    console.log("Parando processamento de áudio...");

    // Parar steams
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }

    // Parar sources
    if (this.source && this.source.stop) {
      this.source.stop();
      this.source = null;
    }

    // Suspender contextos
    if (this.audioContext) {
      this.audioContext.suspend();
    }

    if (this.osc) {
      try {
        this.osc.stop();
      } catch (e) {}
      this.osc.disconnect();
      this.osc = null;
    }

    this.isPlaying = false;
  }

  async update() {
    this.analyser.getByteFrequencyData(this.frequencyData);
    this.analyser.getByteTimeDomainData(this.waveformData);
  }

  getFrequencyData() {
    // Devolve um array com 1024 valores de 0 a 255
    // Cada valor representa a amplitude de um freq
    return this.frequencyData;
  }

  getWaveformData() {
    // Devolve um array com 1024 valores de 0 a 255
    // Cada valor representa a forma da onda no tempo
    // 128 - silencio, 0/255 picos máximos
    return this.waveformData;
  }

  async calculateAudioLevel(value) {
    // TODO: calcular nível de áudio
    // console.log(this.gain.gain.value);
    this.gain.gain.value = value / 100;
  }

  connectSource(source, playback = false) {
    if (this.source) {
      this.source.disconnect();
    }

    this.source = source;

    source.connect(this.analyser);

    this.gain.disconnect();
    if (playback) this.gain.connect(this.audioContext.destination);
  }

  getIsPlaying() {
    return this.isPlaying;
  }
}

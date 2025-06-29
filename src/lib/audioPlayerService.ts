// src/lib/audioPlayerService.ts

function pcmToWav(samples: Float32Array, sampleRate: number): Blob {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + samples.length * 2, true);
  writeString(view, 8, 'WAVE');
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeString(view, 36, 'data');
  view.setUint32(40, samples.length * 2, true);
  
  let offset = 44;
  for (let i = 0; i < samples.length; i++, offset += 2) {
    // --- FIX #1 HERE ---
    // Use the nullish coalescing operator (??) to provide a fallback value of 0.
    const sample = samples[i] ?? 0;
    const s = Math.max(-1, Math.min(1, sample));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
  }

  return new Blob([view], { type: 'audio/wav' });
}

function writeString(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) {
    view.setUint8(offset + i, str.charCodeAt(i));
  }
}

function base64ToPcm(base64String: string): Float32Array {
  try {
    const binaryString = atob(base64String);
    const len = binaryString.length;
    const buffer = new ArrayBuffer(len);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < len; i++) {
      view[i] = binaryString.charCodeAt(i);
    }

    const int16Array = new Int16Array(buffer);
    const float32Array = new Float32Array(int16Array.length);

    for (let i = 0; i < int16Array.length; i++) {
      // --- FIX #2 HERE ---
      // Again, provide a fallback value of 0.
      const sample = int16Array[i] ?? 0;
      float32Array[i] = sample / 32768.0;
    }

    return float32Array;
  } catch (e) {
    console.error("Failed to decode base64 string:", e);
    return new Float32Array(0);
  }
}

class AudioPlayerService {
  private audio: HTMLAudioElement | null = null;
  private currentObjectUrl: string | null = null;

  async play(base64Audio: string, mimeType: string, onEnd: () => void) {
    console.log(`AudioPlayerService: Received audio data. MimeType: ${mimeType}`);

    // Stop any previous audio and clean up its resources before starting anew.
    this.stop();
    
    const sampleRateMatch = mimeType.match(/rate=(\d+)/);
    const sampleRate = sampleRateMatch && sampleRateMatch[1] ? parseInt(sampleRateMatch[1], 10) : 24000;

    const pcmData = base64ToPcm(base64Audio);
    const wavBlob = pcmToWav(pcmData, sampleRate);
    this.currentObjectUrl = URL.createObjectURL(wavBlob);
    
    this.audio = new Audio(this.currentObjectUrl);
    
    // Define a single cleanup function to be called on end or error.
    const cleanup = () => {
      onEnd(); // First, notify our app state that playback is over.
      this.stop(); // Then, run the full cleanup logic.
    };

    this.audio.onended = cleanup;
    this.audio.onerror = (e) => {
      console.error("Audio playback error event:", e);
      cleanup(); // Also run cleanup on error.
    };
    
    try {
      await this.audio.play();
      console.log("AudioPlayerService: Playback started successfully.");
    } catch (error) {
      console.error("AudioPlayerService: Error starting playback.", error);
      cleanup();
    }
  }

  stop() {
    if (this.audio) {
      // --- THIS IS THE KEY FIX ---
      // 1. Remove the event listeners so they can't fire again during cleanup.
      this.audio.onended = null;
      this.audio.onerror = null;

      // 2. Now, it's safe to pause and detach the source without triggering the error.
      this.audio.pause();
      this.audio.src = '';
      this.audio = null;
    }
    if (this.currentObjectUrl) {
      URL.revokeObjectURL(this.currentObjectUrl);
      this.currentObjectUrl = null;
    }
    console.log("AudioPlayerService: Playback stopped and resources cleaned up.");
  }
}

export const audioPlayer = new AudioPlayerService();
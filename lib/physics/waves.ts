export type WaveParams = {
  amplitudeA: number;
  amplitudeB: number;
  frequencyA: number;
  frequencyB: number;
  phase: number;
};

export function simulateWaves(params: WaveParams, length = 20, resolution = 200) {
  const { amplitudeA, amplitudeB, frequencyA, frequencyB, phase } = params;
  const samples: { x: number; y: number; t: number }[] = [];
  for (let index = 0; index <= resolution; index += 1) {
    const x = (index / resolution) * length;
    const yA = amplitudeA * Math.sin(frequencyA * x);
    const yB = amplitudeB * Math.sin(frequencyB * x + phase);
    samples.push({ x, y: yA + yB, t: index / resolution });
  }
  return {
    samples,
    metrics: {
      amplitudMaxima: Math.max(...samples.map((sample) => Math.abs(sample.y))),
      frecuenciaMedia: (frequencyA + frequencyB) / 2
    }
  };
}

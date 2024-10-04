export class PumpState {
  pump: string;
  permutation: boolean;

  constructor(pump: string, permutation: boolean) {
    this.pump = pump;
    this.permutation = permutation;
  }

  generatePump(): string {
    const pumpRes = this.pump.split("").filter((_) => Math.random() < 0.5);
    if (pumpRes.length === 0) {
      return this.generatePump();
    }
    if (this.permutation) {
      const order = Array.from({length: pumpRes.length}, _ => Math.random());
      const sorted = order.map((_, i) => i).sort((a, b) => order[a] - order[b]);
      return sorted.map(i => pumpRes[i]).join("");
    }
    return pumpRes.join("");
  }
}

export function setupPump(element: HTMLButtonElement, pumpState: PumpState, results: HTMLDivElement, times: number = 1) {
  element.addEventListener('click', () => {
    const pump = Array.from({length: times}, () => `<li>${pumpState.generatePump()}</li>`).join(" ");
    results.innerHTML = `<ul>${pump}</ul>`;
  });
}

export function setupPermutation(element: HTMLButtonElement, pumpState: PumpState) {
  element.addEventListener('click', () => {
    pumpState.permutation = !pumpState.permutation;
    element.innerHTML = pumpState.permutation ? "Enabled" : "Disabled";
  });
}

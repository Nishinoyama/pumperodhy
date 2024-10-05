export class PumpState {
  pump: string;
  permutation: boolean;
  generatePump: () => string;
  permutationWeights: number[];

  constructor(pump: string, permutation: boolean) {
    this.pump = pump;
    this.permutation = permutation;
    this.generatePump = permutation ? this.generatePermutationPump : this.generateCombinationPump;

    // To determine the length of the permutation
    const pumpRes = this.pump.split("");
    let n = pumpRes.length;
    let weight = 1;
    const weights = [1];
    for (let i = 0; i < n; i++) {
      weight *= pumpRes.length - i;
      weights.push(weight);
    }
    for (let i = 0; i < n; i++) {
      weights[i + 1] += weights[i];
    }
    this.permutationWeights = weights;
  }

  generateCombinationPump(): string {
    const res = this.pump.split("").filter((_) => Math.random() < 0.5).join("");
    if (res === "" || res === this.pump) {
      return this.generateCombinationPump();
    }
    return res;
  }

  generatePermutationPump(): string {
    const pumpRes = this.pump.split("");
    const length = this.getPermutationRandomLength();
    const levels = Array.from({length: pumpRes.length}, _ => Math.random());
    const order = levels.map((_, i) => i).sort((a, b) => levels[a] - levels[b]);
    const res = order.map((i) => pumpRes[i]).slice(0, length).join("");
    if (res === this.pump) {
      return this.generatePermutationPump();
    }
    return res;
  }

  getPermutationRandomLength(): number {
    const random = Math.floor(Math.random() * this.permutationWeights[this.permutationWeights.length - 1]);
    let length = 0;
    for (let i = 0; i < this.permutationWeights.length; i++) {
      if (random < this.permutationWeights[i]) {
        length = i;
        break;
      }
    }
    if (length === 0) {
      return this.getPermutationRandomLength();
    }
    return length;
  }

  changeMode(): void {
    this.permutation = !this.permutation;
    this.generatePump = this.permutation ? this.generatePermutationPump : this.generateCombinationPump;
  }
}

export class ResultsState {
  results: string[];
  resultsDiv: HTMLDivElement;

  constructor(resultsDiv: HTMLDivElement) {
    this.results = [];
    this.resultsDiv = resultsDiv;
  }

  renderResults(): void {
    this.resultsDiv.innerHTML = `<ul>${this.results.map((res) => `<li>${evalPump(res)}</li>`).join("")}</ul>`;
  }

  setResults(result: string[]): void {
    this.results = result;
  }
}

export function setupPump(element: HTMLButtonElement, pumpState: PumpState, results: ResultsState, times: number = 1) {
  element.addEventListener('click', () => {
    const pump = Array.from({length: times}, () => pumpState.generatePump());
    results.setResults(pump);
    results.renderResults();
  });
}

export function setupPermutation(element: HTMLButtonElement, pumpState: PumpState) {
  element.addEventListener('click', () => {
    pumpState.changeMode();
    element.innerHTML = pumpState.permutation ? "Enabled" : "Disabled";
  });
}

function evalPump(pump: string): string {
  if (pump === "プンポロドイハ") {
    return `<span class='pump-tier1'>${pump}</span>`;
  }
  if (["ドロポン", "ハイドロ", "ハイポン"].includes(pump)) {
    return `<span class='pump-tier2'>${pump}</span>`;
  }
  if (["ポンプ", "イドンプ", "ドロンプ", "ハインプ", "ハドロン"].includes(pump)) {
    return `<span class='pump-tier3'>${pump}</span>`;
  }
  return pump;
}

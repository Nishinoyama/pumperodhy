import './style.css'
import {PumpState, setupPermutation, setupPump} from "./pumpe.ts";

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Pumperodhy<h1>
    <div>
      <button id="permutation"> Permutation Enabled </button>
    </div>
    <div>
      <button id="generate">Generate</button>
    </div>
  </div>
`

const pumpState = new PumpState("ハイドロポンプ", false);

setupPump(document.querySelector<HTMLButtonElement>('#generate')!, pumpState);
setupPermutation(document.querySelector<HTMLButtonElement>('#permutation')!, pumpState);

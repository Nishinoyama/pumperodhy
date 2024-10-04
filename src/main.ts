import './style.css'
import {PumpState, setupPermutation, setupPump} from "./pumpe.ts";

const pumpState = new PumpState("ハイドロポンプ", false);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Pumperodhy</h1>
    <div class="config">
      <div class="config-item">
        <label for="permutation">
          Permutation 
          <button  id="permutation"> Disabled </button>
        </label>
      </div>
    </div>
    <div>
      <button id="generate">Generate</button>
    </div>
    <div>
      <button id="generate10">Generate x 10</button>
    </div>
    <div>
      <button id="generate100">Generate x 100</button>
    </div>
    <div>
      <div id="results">
      </div>
    </div>
  </div>
`

const results = document.querySelector<HTMLDivElement>('#results')!;

setupPump(document.querySelector<HTMLButtonElement>('#generate')!, pumpState, results);
setupPump(document.querySelector<HTMLButtonElement>('#generate10')!, pumpState, results, 10);
setupPump(document.querySelector<HTMLButtonElement>('#generate100')!, pumpState, results, 100);
setupPermutation(document.querySelector<HTMLButtonElement>('#permutation')!, pumpState);

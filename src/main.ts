import './style.css'
import {PumpState, ResultsState, setupPermutation, setupPump} from "./pumpe.ts";

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
      <div id="results">
      </div>
    </div>
    <div>
      <a 
        id="share"
        target="_blank"
      >
        Share X(Twitter)
      </a>
    </div>
  </div>
`

const pumpState = new PumpState("ハイドロポンプ", false);
const results = new ResultsState(document.querySelector<HTMLDivElement>('#results')!)

setupPump(document.querySelector<HTMLButtonElement>('#generate')!, pumpState, results);
setupPump(document.querySelector<HTMLButtonElement>('#generate10')!, pumpState, results, 10);
setupPermutation(document.querySelector<HTMLButtonElement>('#permutation')!, pumpState);
setupShare(document.querySelector<HTMLAnchorElement>('#share')!, results);

function setupShare(element: HTMLAnchorElement, results: ResultsState) {
  element.addEventListener('mouseover', () => {
    const pumps = results.results.map((res) => res).join("\n");
    const pageUrl = "https://nishinoyama.github.io/pumperodhy/";
    const text = encodeURIComponent(`Pumperodhy\n${pumps}\n${pageUrl}\n#pumperodhy`);
    element.href = `https://twitter.com/intent/tweet?text=${text}`;
  });
}

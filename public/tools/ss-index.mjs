export function calculateShapleyShubik(weights, quota) {
  const n = weights.length;
  if (n < 2 || n > 18) throw new Error("プレイヤー数は2〜18人にしてください。");
  if (!weights.every((weight) => Number.isFinite(weight) && weight > 0)) throw new Error("重みには0より大きい数を入力してください。");
  const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
  if (!Number.isFinite(quota) || quota <= 0 || quota > totalWeight) throw new Error(`可決基準は0より大きく、総重み${totalWeight}以下にしてください。`);
  const factorial = [1];
  for (let index = 1; index <= n; index += 1) factorial[index] = factorial[index - 1] * index;
  const size = 1 << n;
  const coalitionWeights = new Float64Array(size);
  const coalitionSizes = new Uint8Array(size);
  for (let mask = 1; mask < size; mask += 1) {
    const bit = mask & -mask;
    const player = 31 - Math.clz32(bit);
    const previous = mask ^ bit;
    coalitionWeights[mask] = coalitionWeights[previous] + weights[player];
    coalitionSizes[mask] = coalitionSizes[previous] + 1;
  }
  const indices = new Float64Array(n);
  for (let mask = 0; mask < size; mask += 1) {
    const before = coalitionWeights[mask];
    if (before >= quota) continue;
    const members = coalitionSizes[mask];
    const coefficient = factorial[members] * factorial[n - members - 1] / factorial[n];
    for (let player = 0; player < n; player += 1) {
      if (!(mask & (1 << player)) && before + weights[player] >= quota) indices[player] += coefficient;
    }
  }
  return Array.from(indices);
}

function startApp() {
  const list = document.querySelector("#player-list");
  if (!list) return;
  const quotaInput = document.querySelector("#quota");
  const calculateButton = document.querySelector("#calculate");
  const addButton = document.querySelector("#add-player");
  const exampleButton = document.querySelector("#example");
  const results = document.querySelector("#results");
  const error = document.querySelector("#error");

  const createRow = (name = "", weight = "") => {
    const row = document.createElement("div");
    row.className = "player-row";
    row.innerHTML = `<label>名称<input class="player-name" value="${name}" maxlength="24" aria-label="プレイヤー名"></label><label>重み<input class="player-weight" type="number" value="${weight}" min="0.0001" step="any" aria-label="重み"></label><button class="remove-button" type="button" aria-label="このプレイヤーを削除">×</button>`;
    row.querySelector(".remove-button").addEventListener("click", () => {
      if (list.children.length <= 2) return;
      row.remove();
      updateRemoveButtons();
    });
    list.append(row);
    updateRemoveButtons();
  };

  const updateRemoveButtons = () => {
    [...list.querySelectorAll(".remove-button")].forEach((button) => { button.disabled = list.children.length <= 2; });
  };

  const setExample = () => {
    list.innerHTML = "";
    [["A党",45],["B党",35],["C党",20]].forEach(([name, weight]) => createRow(name, weight));
    quotaInput.value = "51";
    results.innerHTML = "";
    error.textContent = "";
  };

  calculateButton.addEventListener("click", () => {
    error.textContent = "";
    results.innerHTML = "";
    try {
      const rows = [...list.querySelectorAll(".player-row")];
      const names = rows.map((row, index) => row.querySelector(".player-name").value.trim() || `プレイヤー${index + 1}`);
      const weights = rows.map((row) => Number(row.querySelector(".player-weight").value));
      const indices = calculateShapleyShubik(weights, Number(quotaInput.value));
      indices.forEach((value, index) => {
        const item = document.createElement("div");
        item.className = "result-row";
        item.innerHTML = `<strong></strong><div class="result-track"><div class="result-bar"></div></div><span class="result-value"></span>`;
        item.querySelector("strong").textContent = names[index];
        item.querySelector(".result-bar").style.width = `${Math.max(0, Math.min(100, value * 100))}%`;
        item.querySelector(".result-value").textContent = `${(value * 100).toFixed(2)}%`;
        results.append(item);
      });
    } catch (cause) {
      error.textContent = cause.message;
    }
  });
  addButton.addEventListener("click", () => {
    if (list.children.length >= 18) return error.textContent = "プレイヤーは18人まで追加できます。";
    createRow(`プレイヤー${list.children.length + 1}`, 10);
  });
  exampleButton.addEventListener("click", setExample);
  setExample();
}

if (typeof document !== "undefined") startApp();

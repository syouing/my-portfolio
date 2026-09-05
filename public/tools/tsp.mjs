export function routeDistance(points, route) {
  return route.slice(1).reduce((total, current, index) => {
    const previous = route[index];
    return total + Math.hypot(points[current].x - points[previous].x, points[current].y - points[previous].y);
  }, 0);
}

export function solveTsp(points) {
  const n = points.length;
  if (n < 2) return { route: n ? [0, 0] : [], distance: 0 };
  if (n > 14) throw new Error("厳密計算は14地点までです。");
  const distances = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y)));
  const size = 1 << n;
  const dp = Array.from({ length: size }, () => new Float64Array(n).fill(Infinity));
  const parent = Array.from({ length: size }, () => new Int16Array(n).fill(-1));
  dp[1][0] = 0;

  for (let mask = 1; mask < size; mask += 1) {
    if (!(mask & 1)) continue;
    for (let last = 1; last < n; last += 1) {
      if (!(mask & (1 << last))) continue;
      const previousMask = mask ^ (1 << last);
      for (let previous = 0; previous < n; previous += 1) {
        if (!(previousMask & (1 << previous))) continue;
        const candidate = dp[previousMask][previous] + distances[previous][last];
        if (candidate < dp[mask][last]) {
          dp[mask][last] = candidate;
          parent[mask][last] = previous;
        }
      }
    }
  }

  const fullMask = size - 1;
  let bestLast = 1;
  let bestDistance = Infinity;
  for (let last = 1; last < n; last += 1) {
    const candidate = dp[fullMask][last] + distances[last][0];
    if (candidate < bestDistance) {
      bestDistance = candidate;
      bestLast = last;
    }
  }

  const reversed = [];
  let mask = fullMask;
  let current = bestLast;
  while (current !== 0) {
    reversed.push(current);
    const previous = parent[mask][current];
    mask ^= 1 << current;
    current = previous;
  }
  return { route: [0, ...reversed.reverse(), 0], distance: bestDistance };
}

function startApp() {
  const canvas = document.querySelector("#tsp-canvas");
  if (!canvas) return;
  const context = canvas.getContext("2d");
  const solveButton = document.querySelector("#solve");
  const randomButton = document.querySelector("#randomize");
  const undoButton = document.querySelector("#undo");
  const clearButton = document.querySelector("#clear");
  const status = document.querySelector("#status");
  const pointCount = document.querySelector("#point-count");
  const distanceValue = document.querySelector("#distance");
  const timeValue = document.querySelector("#elapsed");
  let points = [];
  let solution = null;

  const resize = () => {
    const ratio = window.devicePixelRatio || 1;
    const bounds = canvas.getBoundingClientRect();
    canvas.width = Math.round(bounds.width * ratio);
    canvas.height = Math.round(bounds.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  };

  const draw = () => {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    context.clearRect(0, 0, width, height);
    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "#111827");
    gradient.addColorStop(1, "#07111f");
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
    context.strokeStyle = "rgba(255,255,255,.055)";
    context.lineWidth = 1;
    for (let x = 40; x < width; x += 40) { context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke(); }
    for (let y = 40; y < height; y += 40) { context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke(); }
    if (solution?.route.length) {
      context.beginPath();
      solution.route.forEach((index, order) => {
        const point = points[index];
        if (order === 0) context.moveTo(point.x * width, point.y * height);
        else context.lineTo(point.x * width, point.y * height);
      });
      context.strokeStyle = "#64d2ff";
      context.lineWidth = 3;
      context.lineJoin = "round";
      context.stroke();
    }
    points.forEach((point, index) => {
      const x = point.x * width;
      const y = point.y * height;
      context.beginPath(); context.arc(x, y, 13, 0, Math.PI * 2); context.fillStyle = index === 0 ? "#30d158" : "#0071e3"; context.fill();
      context.fillStyle = "#fff"; context.font = "600 11px -apple-system, sans-serif"; context.textAlign = "center"; context.textBaseline = "middle"; context.fillText(String.fromCharCode(65 + index), x, y);
    });
  };

  const update = (message = "キャンバスをクリックして地点を追加できます") => {
    pointCount.textContent = String(points.length);
    distanceValue.textContent = solution ? solution.distance.toFixed(3) : "—";
    solveButton.disabled = points.length < 3;
    undoButton.disabled = points.length === 0;
    clearButton.disabled = points.length === 0;
    status.textContent = message;
    draw();
  };

  const randomize = (count = 9) => {
    points = Array.from({ length: count }, () => ({ x: .08 + Math.random() * .84, y: .1 + Math.random() * .8 }));
    solution = null;
    timeValue.textContent = "—";
    update(`${count}地点を生成しました`);
  };

  canvas.addEventListener("pointerdown", (event) => {
    if (points.length >= 14) return update("厳密計算は14地点までです");
    const bounds = canvas.getBoundingClientRect();
    points.push({ x: (event.clientX - bounds.left) / bounds.width, y: (event.clientY - bounds.top) / bounds.height });
    solution = null;
    timeValue.textContent = "—";
    update("地点を追加しました");
  });
  solveButton.addEventListener("click", () => {
    const started = performance.now();
    solution = solveTsp(points);
    timeValue.textContent = `${(performance.now() - started).toFixed(1)} ms`;
    update("最短巡回路を厳密計算しました");
  });
  randomButton.addEventListener("click", () => randomize(9));
  undoButton.addEventListener("click", () => { points.pop(); solution = null; timeValue.textContent = "—"; update("最後の地点を削除しました"); });
  clearButton.addEventListener("click", () => { points = []; solution = null; timeValue.textContent = "—"; update("すべての地点を削除しました"); });
  window.addEventListener("resize", resize);
  resize();
  randomize(9);
}

if (typeof document !== "undefined") startApp();

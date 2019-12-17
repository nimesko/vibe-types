import { performance, PerformanceObserver } from "perf_hooks";

const pow = 7;

let triangleArea = function(base, height): number {
  return (base * height) / 2;
};

triangleArea = performance.timerify(triangleArea);

let calculations = function() {
  const iterations = Math.pow(10, pow);
  for (let i = 0; i < iterations; i++) {
    triangleArea(i * 20, i * 10);
  }
};

calculations = performance.timerify(calculations);

const obs = new PerformanceObserver((list, observer) => {
  const average = new Map();
  list.getEntries().forEach(({ name, duration }) => {
    const registry = average.get(name);
    if (registry) {
      average.set(name, {
        count: registry.count + 1,
        sum: registry.sum + duration
      });
    } else {
      average.set(name, {
        count: 1,
        sum: duration
      });
    }
  });
  for (const [key, { count, sum }] of average) {
    const averageResult = Math.round((sum / count) * 100) / 100;
    const times = `${count}`.padStart(pow + 1, "0");
    console.log(
      `Function '${key}' executed ${times} times with ${averageResult} ms at each call`
    );
  }
  performance.clearMarks();
  observer.disconnect();
});

obs.observe({ entryTypes: ["function"], buffered: true });

calculations();

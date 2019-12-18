const jsdom = require("jsdom");
const { performance, PerformanceObserver } = require("perf_hooks");
const yargs = require("yargs");

const { JSDOM } = jsdom;
const w = new JSDOM().window;
const iterations = 1000000;
const conditions = 7;

let render = function(element, props) {
  const domElement = w.document.createElement(element);
  const propsElement = Object.entries(props);
  for (const [key, value] of propsElement) {
    domElement[key] = value;
  }
};

render = performance.timerify(render);

let renderApplication = function(seedRandom) {
  let element = "";
  const parameters = {};
  switch (seedRandom) {
    case 0:
      element = "input";
      parameters.inputmode = "number";
      parameters.id = "input";
      parameters.aria = true;
      parameters.oninput = () => console.log(this);
      break;
    case 1:
      element = "img";
      parameters.aria = false;
      parameters.onload = event => console.log(event);
      parameters.id = "img-site";
      parameters.src = `https://www.${Math.random()}.batata.com`;
      break;
    case 2:
      element = "a";
      parameters.onclick = event => event.stopPropagation();
      parameters.href = "https://google.com.br";
      parameters.aria = true;
      parameters.id = "another-anchor";
      break;
    case 3:
      element = "span";
      parameters.id = "random-id";
      parameters.class = "d-block hidden";
      parameters.onclick = event => event.preventDefault();
      parameters.hidden = true;
      parameters.aria = false;
      break;
    case 4:
      element = "link";
      parameters.rel = "stylesheet";
      parameters.onload = () => console.log("Stylesheet loaded");
      parameters.crossorigin = true;
      break;
    case 5:
      element = "script";
      parameters.src = "https://google.com.asdfa.asdfas/asdfoinasd?1234sfaa";
      parameters.onload = () => console.log("Loaded!");
      parameters.defer = true;
      parameters.async = true;
      break;
    default:
      element = "div";
      parameters.class = "d-flex event-list";
      parameters.style = "background-color: red;";
      parameters.id = "test";
      break;
  }
  render(element, parameters);
};

renderApplication = performance.timerify(renderApplication);

let bridge = function() {
  console.log(
    `Running ${
      yargs.argv.single ? "as single with " : "with"
    } ${iterations} iterations\n`
  );
  if (yargs.argv.single) {
    const seed = ~~((Math.random() * 10000) % conditions);
    for (let i = 0; i < iterations; i++) {
      const fakeSeed = i % conditions;
      renderApplication(seed);
    }
  } else {
    for (let i = 0; i < iterations; i++) {
      const seed = i % conditions;
      renderApplication(seed);
    }
  }
};

bridge = performance.timerify(bridge);

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
    console.log(
      `Function '${key}' executed ${count} times with ${averageResult} ms at each call`
    );
  }
  console.log("\nEnd of benchmark\n");
  performance.clearMarks();
  observer.disconnect();
});

obs.observe({ entryTypes: ["function"], buffered: true });

bridge();

import { get } from "https";

const url =
  "https://www.random.org/integers/?num=1&min=1&max=100000&col=1&base=10&format=plain&rnd=new";

function randomNumber(): Promise<Number> {
  return new Promise((ffl, rej) => {
    get(url, res => {
      const data = [];
      res.on("data", chunk => data.push(chunk));
      res.on("end", () => ffl(+Buffer.concat(data).toString()));
    });
  });
}

randomNumber().then(console.log);

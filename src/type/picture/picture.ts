import { Id, Person } from "../person/person";

enum Geometry {
  CIRCLE = 1,
  SQUARE,
  RECTANGLE,
  TRIANGLE,
  PENTAGON,
  HEXAGON
}

interface Picture {
  id?: Id;
  date: Date;
  artist: Person;
  dimensions: [number, number];
  frame: Geometry;
}

const monalisa: Picture = {
  date: new Date("1506-01-01 00:00:00"),
  artist: {
    name: "Leonardo da Vinci"
  },
  frame: Geometry.RECTANGLE,
  dimensions: [77, 53]
};

console.log(monalisa);
console.log(Geometry[monalisa.frame]);

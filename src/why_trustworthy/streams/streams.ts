import { Readable, Transform } from "stream";

console.log("Type anything to be uppercased");

function toUppercase(src: Readable): Transform {
  return src.pipe(
    new Transform({
      transform: function(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
      }
    })
  );
}

toUppercase(process.stdin).pipe(process.stdout);

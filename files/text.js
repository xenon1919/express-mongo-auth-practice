const fs = require("fs");
const filePath = "files/large-file.txt";
const lines = 100000;
const text = "This is a line of text.\n";

const stream = fs.createWriteStream(filePath, { flags: "a" });

for (let i = 0; i < lines; i++) {
  stream.write(text);
}

stream.end(() => {
  console.log(`File with ${lines} lines of text has been created.`);
});

const readline = require("readline");
const fs = require("fs");

fs.readFile("./files/start.txt", "utf-8", (err1, data1) => {
  if (err1) {
    console.log(err1);
  }
  console.log(data1);
  fs.readFile(`./files/${data1}.txt`, "utf-8", (err2, data2) => {
    if (err2) {
      console.log(err2);
    }
    console.log(data2);
    fs.readFile("./files/append.txt", "utf-8", (err3, data3) => {
      if (err3) {
        console.log(err3);
      }
      console.log(data3);
      fs.writeFile(
        "./files/output/txt",
        `${data2}\n\n ${data3}\n\nData created ${new Date()}`,
        () => {
          console.log("File written successfully");
        }
      );
    });
  });
});
console.log("Reading file.......");

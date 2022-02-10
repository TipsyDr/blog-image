"use strict";
const fs = require("fs");
const path = "./photos";

fs.readdir(path, function (err, files) {
  console.log(2222,2222,222);
  if (err) {
    console.log(err);
    return;
  }
  let arr = [];
  (function iterator(index) {
    if (index == files.length) {
      fs.writeFile("output.json", JSON.stringify(arr, null, "\t"), (e) => console.log(e));
      return;
    }

    fs.stat(path + "/" + files[index], function (err, stats) {
      if (err) {
        return;
      }
      if (stats.isFile()) {
        arr.push(files[index]);
      }
      iterator(index + 1);
    })
  }(0));
});

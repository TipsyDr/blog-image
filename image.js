"use strict";

const fs = require("fs");
const path = "./image";

function getMdFiles(name, data) {
`
---
title: ${name}
---

{% gallery %}
![](https://i.loli.net/2019/12/25/Fze9jchtnyJXMHN.jpg)
${data}
{% endgallery %}

`
}

function getFilesName(path) {
  return new Promise(function(resolve, reject) {
    fs.readdir(path, function (err, res) {
      resolve(res);
    })
  })
}

async function asyncGetFilesName(path) {
  let files1 = await getFilesName(path);
  for (let i = 0; i < files1.length; i++) {
    const item = files1[i];
    fs.writeFile(`../../source/photo/${item}.md`, JSON.stringify(await getFilesName(path + '/' + item), null, "\t"), (e) => console.log(e));
  }
}



asyncGetFilesName(path);


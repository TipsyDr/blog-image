"use strict";

const fs = require("fs");
const path = "./image";

function getMdFiles(name, urls) {
  const temp =
    `
---
title: ${name}
---

{% gallery %}
${urls}
{% endgallery %}

`
  return temp;
}

function getIndexMdFiles(data) {
  const temp =
    `
---
title: 图库
---

${data}

`
  return temp;
}

function getFilesName(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, res) {
      resolve(res);
    })
  })
}

async function asyncGetFilesName(path) {
  let files1 = await getFilesName(path);
  let indexData = '';
  for (let i = 0; i < files1.length; i++) {
    const name = files1[i];
    const data = await getFilesName(path + '/' + name);
    let urls = '';
    let cover = '';
    for (let j = 0; j < data.length; j++) {
      const item = `![](https://blog-image-rosy.vercel.app/image/${name}/${data[j]})`;
      urls += item;
      if (item.indexOf('cover') > 0) {
        cover = data[i];
      }
    }
    const coverItem = `{% galleryGroup ${name} 关于${name}的图片 /gallery/${name} https://blog-image-rosy.vercel.app/image/${name}/${cover} %}`;
    indexData += coverItem;
    fs.writeFile(`../source/gallery/${name}.md`, getMdFiles(name, urls), (e) => console.log('success'));
  }
  fs.writeFile(`../source/gallery/index.md`, getIndexMdFiles(indexData), (e) => console.log('success'));
}



asyncGetFilesName(path);


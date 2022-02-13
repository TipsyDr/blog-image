"use strict";

const fs = require("fs");
const getPicPath = "./image";
const getMoviePath = "./movie";
const picPath = '../source/image';
const moviePath = '../source/movie';
function creatPicMd(name, urls) {
  const temp =
`
---
title: ${name}
---

{% gallery %}
${urls}
{% endgallery %}

`;
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

function creatMovieMd(name, data) {
  const temp = 
`
---
title: ${name}
---

${data}

`;

  return temp;
}






function getFilesName(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, res) {
      resolve(res);
    })
  })
}

async function asyncGetFilesName(path, toPath, type, func) {
  let files1 = await getFilesName(path);
  let indexData = '';
  const remotPath = 'https://blog-image-rosy.vercel.app';
  for (let i = 0; i < files1.length; i++) {
    const name = files1[i];
    const data = await getFilesName(path + '/' + name);
    let urls = '';
    let cover = '';
    for (let j = 0; j < data.length; j++) {
      const url = `${remotPath}/${type}/${name}/${data[j]}`;
      const item = type === 'image' ? 
        `![](${url})`
        : 
        `<video src="${url}" width="350px" height="200px" controls="controls"></video>`;
      if (item.indexOf('cover') > 0) {
        cover = data[j];
      }
      if(type !== 'movie' || url.indexOf('cover') < 0) {
        urls += item;
      };
    }
    const typeText = type === 'image' ? '图片' : '电影';
    const coverItem = `{% galleryGroup ${name} 关于${name}的${typeText} /${type}/${name} ${remotPath}/${type}/${name}/${cover} %}`;
    indexData += coverItem;
    const mdPath = `${toPath}/${name}`
    if (!fs.existsSync(mdPath)) {
      fs.mkdirSync(mdPath);
    }
    fs.writeFile(`${mdPath}/index.md`, func(name, urls), (e) => console.log('success'));
  }
  fs.writeFile(`${toPath}/index.md`, getIndexMdFiles(indexData), (e) => console.log('success'));
}



asyncGetFilesName(getPicPath, picPath, 'image', creatPicMd);
asyncGetFilesName(getMoviePath, moviePath, 'movie', creatMovieMd);

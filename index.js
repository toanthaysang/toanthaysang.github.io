const fs = require('fs')
const moveFile = require('move-file');

const config = {
  maxFile: 990
}

const rawdata = fs.readFileSync('data.json')
const data = JSON.parse(rawdata)
let current = data.folder
const start = config.maxFile

try {
  const files = fs.readdirSync(`./image${current}`)
  let filelefts = Math.abs(start - files.length)

  fs.readdir(`images`, (err, images) => {
    var index = 0;
    const length = images.length > filelefts ? filelefts : images.length
    for (let i = 0; i < length; i++) {
      move(current, images[index])
      index++
    }
    current++
    while (index < images.length) {
      let end = images.length - index > config.maxFile ? config.maxFile : images.length - index - 1
      for (let i = 0; i <= end; i++) {
        move(current, images[index])
        index++
        console.log(index)
      }
      current++
    }
    current--
    console.log(current)
    data.folder = current
    fs.writeFileSync('data.json', JSON.stringify(data))
  })
} catch{
  console.log('ERROR')
}

// function write() {
//   fs.readdir('./images', (err, files) => {
//     let amountFiles = files.length
//     while (amountFiles > 0) {
//       let i = amountFiles - 1;
//       amountFiles--;
//       move(1, files[i])
//     }
//     console.log(files[0])
//   })
// }

async function move(num, name) {
  await moveFile(`images/${name}`, `image${num}/${name}`);
};

// move()
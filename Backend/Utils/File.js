const fs = require('fs')
const path = require('path')
// import { v4 as uuid } from 'uuid'
const { fileURLToPath } = require('url')
const dirCodes = path.join(__dirname, 'codes')
const dirInputs = path.join(__dirname, 'inputs')
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true })
}
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true })
}
const generateFile = async (format, content, jobID) => {
  //   const jobID = uuid()
  //   const filename = `a.${format}`
  const filename = `${jobID}.${format}`
  const filePath = path.join(dirCodes, filename)
  await fs.writeFileSync(filePath, content)
  return filePath
}
const generateInputFile = async (content, jobID) => {
  //   const jobID = uuid()
  const filename = `${jobID}.txt`
  const filePath = path.join(dirInputs, filename)
  await fs.writeFileSync(filePath, content)
  return filePath
}
const readFile = (filepath) => {
  return fs.readFileSync(filepath, 'utf8')
}
// console.log(uuid())
// console.log(uuid())
// console.log(uuid())
// generateFile(
//   'cpp',
//   '#include <iostream>\nusing namespace std;\nint main() {\n\tcout << "Hello World";\n\treturn 0;\n}'
// )
// generateInputFile(readFile(path.join(dirCodes, 'a.cpp')))
exports = { generateFile, generateInputFile, readFile }

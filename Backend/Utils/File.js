const fs = require('fs')
const path = require('path')
const dirCodes = path.join(__dirname, 'codes')
const dirInputs = path.join(__dirname, 'inputs')
if (!fs.existsSync(dirInputs)) {
  fs.mkdirSync(dirInputs, { recursive: true })
}
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true })
}
exports.generateCodeFile = async (format, content, fileName) => {
  const filename = `${fileName}.${format}`
  const filePath = path.join(dirCodes, filename)
  fs.writeFileSync(filePath, content)
  return filePath
}
exports.generateInputFile = async (fileName, content, jobID) => {
  const filename = `${fileName}.txt`
  const filePath = path.join(dirInputs, filename)
  fs.writeFileSync(filePath, content)
  return filePath
}
exports.readFile = (filepath) => {
  return fs.readFileSync(filepath, 'utf8')
}

exports.deleteFile = (filepath) => {
  return fs.unlinkSync(filepath)
}

// generateFile(
//   'cpp',
//   '#include <iostream>\nusing namespace std;\nint main() {\n\tcout << "Hello World";\n\treturn 0;\n}'
// )
// generateInputFile(readFile(path.join(dirCodes, 'a.cpp')))

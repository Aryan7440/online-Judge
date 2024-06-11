import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const outputPath = path.join(__dirname, 'outputs')

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true })
}

const executeCpp = (filepath, inputFilepath) => {
  const jobId = path.basename(filepath).split('.')[0]
  const outPath = path.join(outputPath, `${jobId}.exe`)

  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.exe < ${inputFilepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr })
        }
        if (stderr) {
          reject(stderr)
        }
        resolve(stdout)
      }
    )
  })
}
const executeJava = (filepath, inputFilepath) => {
  const jobId = path.basename(filepath).split('.')[0]
  console.log(jobId)
  // const outPath = path.join(outputPath, `Code.class`)
  const fileContent = fs.readFileSync(filepath, 'utf8')
  // console.log(fileContent)
  // const classNameMatch = fileContent.match(/public\s+class\s+(\w+)/)
  // console.log(classNameMatch)
  // if (!classNameMatch) {
  //   return Promise.reject(new Error('Class name not found in the file'))
  // }
  // const className = classNameMatch[1]
  // console.log(className)
  const newFilePath = path.join(outputPath, `${jobId}.java`)
  // console.log(newFilePath)

  return new Promise((resolve, reject) => {
    exec(
      `javac ${newFilePath} -d ${outputPath} && cd ${outputPath} && java ${jobId} < ${inputFilepath}`,
      (error, stdout, stderr) => {
        if (error) {
          reject({ error, stderr })
        }
        if (stderr) {
          reject(stderr)
        }
        resolve(stdout)
      }
    )
  })
}
const executePython = (filepath, inputFilepath) => {
  return new Promise((resolve, reject) => {
    exec(`python ${filepath} < ${inputFilepath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr })
      }
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}
const executeJavaScript = (filepath, inputFilepath) => {
  return new Promise((resolve, reject) => {
    exec(`node ${filepath} < ${inputFilepath}`, (error, stdout, stderr) => {
      if (error) {
        reject({ error, stderr })
      }
      if (stderr) {
        reject(stderr)
      }
      resolve(stdout)
    })
  })
}

export { executeCpp, executeJava, executePython, executeJavaScript }

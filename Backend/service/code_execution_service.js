const { exec } = require('child_process')
const fs = require('fs')
const path = require('path')


// const outputPath = path.join(__dirname, 'outputs')
const outputPath = path.join(__dirname, '../files/output');

if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
}

exports.executeCpp = (filepath, inputFilepath) => {
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
exports.executeJava = (filepath, inputFilepath) => {
    const jobId = path.basename(filepath).split('.')[0]

    const fileContent = fs.readFileSync(filepath, 'utf8')

    const newFilePath = path.join(outputPath, `${jobId}.java`)

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
exports.executePython = (filepath, inputFilepath) => {
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
exports.executeJavaScript = (filepath, inputFilepath) => {
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


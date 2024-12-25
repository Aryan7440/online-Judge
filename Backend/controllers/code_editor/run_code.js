const fileUtils = require('../../utils/File')
const codeExcecutionService = require('../../services/codeExecutionService')
const { generateFile, generateInputFile } = require('../Utils/File')
const requestResponseUtils = require('../../utils/request_response_utils')
// const { v4: uuid } = require('uuid')
const {
    executeCpp,
    executeJava,
    executeJavaScript,
    executePython,
} = require('./execute')


exports.runCode('/run', async (request, reply) => {
    const { language, code, input } = request.body
    try {
        const jobID = uuid()
        const filePath = await generateFile(language, code, jobID)
        const inputPath = await generateInputFile(input, jobID)
        console.log(inputPath)
        if (language === 'java') {
            const output = await executeJava(filePath, inputPath)
            res.json({ filePath, output })
        } else if (language === 'py') {
            const output = await executePython(filePath, inputPath)
            res.json({ filePath, output })
        } else if (language === 'js') {
            const output = await executeJavaScript(filePath, inputPath)
            res.json({ filePath, output })
        } else if (language === 'cpp') {
            const output = await executeCpp(filePath, inputPath)
            res.json({ filePath, output })
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({ error: error })
    }
})

module.exports = router

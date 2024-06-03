import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dirCodes = path.join(__dirname, 'inputs')

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true })
}
const generateInputFile = async (content) => {
  const jobID = uuidv4()
  const filename = `${jobID}.txt`
  const filePath = path.join(dirCodes, filename)
  await fs.writeFileSync(filePath, content)
  return filePath
}
export { generateInputFile }

// generateInputFile('1 2 3 4 5 6 7 8 9 10') // /home/runner/Backend/API/inputs/1 2 3 4 5 6 7 8 9 10.txt

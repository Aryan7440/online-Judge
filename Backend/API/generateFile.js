import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dirCodes = path.join(__dirname, 'codes')

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true })
}

const generateFile = async (format, content) => {
  const jobID = uuid()
  const filename = `${jobID}.${format}`
  const filePath = path.join(dirCodes, filename)
  await fs.writeFileSync(filePath, content)
  return filePath
}

export { generateFile }

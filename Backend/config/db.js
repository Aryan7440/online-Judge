const mongoose = require('mongoose')

exports.connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_API_KEY)
    logger.info(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    logger.error(error)
    process.exit(1)
  }
}

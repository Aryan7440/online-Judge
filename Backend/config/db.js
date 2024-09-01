const mongoose = require('mongoose')

exports.connectToDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGOOSE_API_KEY)
    console.log(`MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

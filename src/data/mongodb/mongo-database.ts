import mongoose from 'mongoose'

interface Options {
  mongoUrl: string
  dbName: string
}

export class MongoDatabase {
  static async connect(options: Options) {
    const { mongoUrl, dbName } = options

    try {
      await mongoose.connect(mongoUrl, { dbName: dbName })
      console.log('Connected to MongoDB')
    } catch (error) {
      console.error('Error connecting to MongoDB')
      throw error
    }
  }
}

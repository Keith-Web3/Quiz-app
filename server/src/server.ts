import mongoose from 'mongoose'
import app from './app.js'

app.listen(process.env.PORT, () => {
  console.log(`App is running on port ${process.env.PORT}`)
})

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log('connected to db successfully'))

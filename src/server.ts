import 'dotenv/config'
import app from './app'
import config from './config'
import mongoose, { ConnectOptions } from 'mongoose'

if (!process.env.DB_URI) {
  throw new Error('DB_URI must be defined');
}

const uri = process.env.DB_URI as string;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true} as ConnectOptions)
  .then(() => console.log('DB Connected!'))
  .catch( (err) => console.error(err))

app.listen(config.PORT, () => {
  console.log('Server listening at port ' + config.PORT)
})

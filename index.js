import app from './app.js';
import mongoose from 'mongoose';
import { config } from './config/index.js';

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connection established');

    app.on('error', (err) => {
      console.log('Error: ', err.message);
    });

    app.listen(process.env.PORT || 4000, () => {
      console.log('Server is running on port 4000');
    });
  } catch (error) {
    console.log('Error: ', error.message);
  }
})();

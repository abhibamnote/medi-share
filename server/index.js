const app = require('./app')
require('dotenv').config();

const connectDB = require('./db/connectDB');
process.env.TZ = 'Asia/Calcutta';

connectDB()
  .then(()=>{
    app.listen(process.env.PORT || 8000, () =>{
      console.log(`Server is running at port: ${process.env.PORT}`);
    })
  })
  .catch(error =>{
    console.log("MongoDb connection failed: ", error);
  })

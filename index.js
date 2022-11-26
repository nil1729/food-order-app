const app = require('./server');
const { connectDB } = require('./config/db');
const PORT = process.env.PORT || 5050;

app.listen(PORT, async () => {
  try {
    await connectDB(process.env.DB_URI);
    console.log(`Our App up and running with Database on port ${PORT}`);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
});

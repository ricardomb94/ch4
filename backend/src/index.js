import { app } from './app.js';
import dotenv from 'dotenv';
import { initDatabase } from './db/init.js';

dotenv.config();

try {
  await initDatabase();
  const PORT = process.env.PORT || 3000;  // Default to port 3000 if PORT is not defined
  app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
  });
} catch (err) {
  console.error('Error connecting to database:', err);
  process.exit(1);  // Exit the process with a failure code
}
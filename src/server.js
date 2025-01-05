const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
// const { initWebSocket } = require('./services/notificationService');
const userRoutes = require('./routes/usersRoutes');
const earningsRoutes = require('./routes/earningsRoutes');
const { errorHandler } = require('./middleware/errorHandler');
const sequelize = require('./config/db');
const { User, Earnings } = require('./models');

const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/earnings', earningsRoutes);
app.use(errorHandler);

// Initialize WebSocket server
// initWebSocket(server);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.sync({ force: false }) // Set force to true for development resets
  .then(() => console.log('Database & tables created!'))
  .catch((err) => console.error('Error syncing database:', err));
});

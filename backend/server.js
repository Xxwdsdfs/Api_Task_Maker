const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const userRoutes = require('./routes/users');
const authMiddleware = require('./middleware/auth');
const { createServer } = require('http');
const { Server } = require('socket.io');
require('dotenv').config();


const app = express();
const httpServer = createServer(app);

app.use(cors({
  origin: 'http://localhost:3001', // Ajoutez ici l'origine de votre client
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Ajoutez les méthodes HTTP autorisées
  credentials: true // Ajoutez les credentials si vous utilisez des cookies ou des en-têtes d'authentification
}));
app.use(express.json());

// Connectez-vous à MongoDB avec le nom de votre base de données
mongoose.connect('mongodb://localhost:27017/taskmanager', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('MongoDB connected');
});

// Importez les modèles pour les enregistrer avec Mongoose
require('./models/User');
require('./models/Task');

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);
app.use(authMiddleware);

const PORT = process.env.PORT || 5000;

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3001', // Remplacez par l'origine de votre client
    methods: ['GET', 'POST'],
    credentials: true
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('chat message', (msg) => {
    console.log('Message received:', msg);
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require('express');
const cors = require('cors'); 
const redis = require('redis');
const { v4: uuidv4 } = require('uuid');


const app = express();
app.use(express.json());


app.use(cors({
  origin: 'http://localhost:5173',  
  methods: ['GET', 'POST'],  
  allowedHeaders: ['Content-Type'],  
}));


const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client Error', err));


client.connect();


app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  const id = uuidv4();
  const user = { id, name, email };


  await client.set(name.toLowerCase(), JSON.stringify(user));  

  res.status(201).json({ message: 'User added successfully', user });
});


app.get('/user/:name', async (req, res) => {
  const name = req.params.name.toLowerCase();  
  const user = await client.get(name);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json(JSON.parse(user));
});


app.get('/users', async (req, res) => {
  try {
    const keys = await client.keys('*');
    const users = [];

    for (const key of keys) {
      const user = await client.get(key);
      if (user) {
        users.push(JSON.parse(user));  
      }
    }

    res.status(200).json(users);  
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users from cache', error });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

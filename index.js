const express = require('express');
const { connectToDatabase, sql } = require('./dbConfig');

const app = express();
const port = 3000;

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to SQL Server
connectToDatabase();

// Route to fetch data from the database
app.get('/api/users', async (req, res) => {
  try {
    const result = await sql.query('SELECT * FROM Users'); // Replace with your actual table
    res.json(result.recordset); // Return the records in JSON format
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Route to insert data into the database
// app.post('/api/users', async (req, res) => {
//   const { name, email } = req.body; // Example body data

//   try {
//     await sql.query`INSERT INTO Users (Name, Email) VALUES (${Vishnu}, ${vishnu123gmail.com})`;
//     res.status(201).send('User added');
//   } catch (err) {
//     console.error('Error inserting data:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

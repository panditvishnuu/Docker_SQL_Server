// const express = require('express');
// const { connectToDatabase, sql } = require('./dbConfig');

// const app = express();
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// connectToDatabase();

// app.get('/api/users', async (req, res) => {
//   try {
//     const result = await sql.query('SELECT * FROM Users');
//     res.json(result.recordset);
//   } catch (err) {
//     console.error('Error fetching data:', err);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });

const express = require("express");
const { connectToDatabase, sql } = require("./dbConfig");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDatabase();

// Fetch all users
app.get("/api/users", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Add a new user
app.post("/api/users", async (req, res) => {
  const {UserID, name, email, age } = req.body;
  if (!name || !email || !age) {
    return res.status(400).send("Name, Email, and Age are required");
  }

  try {
    await sql.query(
      `INSERT INTO Users (Name, Email, Age) VALUES ('${UserID}', '${name}', '${email}', ${age})`
    );
    res.status(201).send("User added successfully");
  } catch (err) {
    console.error("Error adding data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete a user
app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await sql.query(`DELETE FROM Users WHERE UserID = ${id}`);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User deleted successfully");
  } catch (err) {
    console.error("Error deleting data:", err);
    res.status(500).send("Internal Server Error");
  }
});

// Update a user's details
app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name && !email && !age) {
    return res
      .status(400)
      .send(
        "At least one field (Name, Email, Age) must be provided for update"
      );
  }

  const fieldsToUpdate = [];
  if (name) fieldsToUpdate.push(`Name = '${name}'`);
  if (email) fieldsToUpdate.push(`Email = '${email}'`);
  if (age) fieldsToUpdate.push(`Age = ${age}`);

  const updateQuery = `UPDATE Users SET ${fieldsToUpdate.join(
    ", "
  )} WHERE UserID = ${id}`;

  try {
    const result = await sql.query(updateQuery);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("User not found");
    }
    res.send("User updated successfully");
  } catch (err) {
    console.error("Error updating data:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://20.197.9.231/:${port}`);
});

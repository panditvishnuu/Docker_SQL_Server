const sql = require('mssql');


const config = {
  user: 'sa',  // SQL Server 'sa' user
  password: 'Vishnu@1234567', // SQL Server password (set in Docker)
  server: '20.197.9.231',  // Replace with your Azure VM public IP
  database: 'Vishnu1', // Your database name
  options: {
    encrypt: true, // For encrypted connections (set to true)
    trustServerCertificate: true, // Trust the self-signed certificate (if applicable)
  },
};

// Function to connect to the database
const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

module.exports = { sql, connectToDatabase };

const sql = require('mssql');


const config = {
  user: 'sa',
  password: 'Vishnu@1234567',
  server: '20.197.9.231',
  database: 'Vishnu1',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

const connectToDatabase = async () => {
  try {
    await sql.connect(config);
    console.log('Connected to SQL Server');
  } catch (err) {
    console.error('Database connection failed:', err);
  }
};

module.exports = { sql, connectToDatabase };

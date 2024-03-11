const dotenv = require('dotenv');
dotenv.config();
const mssql = require('mssql');

const config = {
  server: process.env.DB_SERVERNAME,
  database: process.env.DB_NAME,
  authentication: {
    type: 'default',
    options: {
      userName: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    },
  },
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function testConnection() {
  try {
    if (!config.server || !config.database || !config.authentication.options.userName || !config.authentication.options.password) {
      throw new Error('Bağlantı bilgileri eksik veya hatalı.');
    }
    const pool = await new mssql.ConnectionPool(config).connect();
    if (pool.connected) {
      console.log('Veritabanına başarıyla bağlandı!');
      pool.close();
    } else {
      throw new Error('Bağlantı başarısız.');
    }
  } catch (err) {
    console.error('Error connecting to MSSQL database:', err.message);
  }
}

// Eğer modül bir başka dosya tarafından içe aktarıldıysa testConnection fonksiyonunu çağır
if (require.main === module) {
  testConnection();
}

module.exports = config;

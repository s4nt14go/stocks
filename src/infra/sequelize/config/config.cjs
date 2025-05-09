const pg = require('pg');
const {Sequelize} = require('sequelize');
require('dotenv').config();

// Workaround to fix DECIMALs being returned as strings instead of numbers (make sure that your data won't run into precision issues)
Sequelize.postgres.DECIMAL.parse = function (value) {
  return parseFloat(value);
};
pg.defaults.parseInt8 = true;

const {
  COCKROACH_username,
  COCKROACH_password,
  COCKROACH_database,
  COCKROACH_host,
  COCKROACH_dialect,
  COCKROACH_port,
  COCKROACH_cluster,
} = process.env;

if (
  !COCKROACH_username ||
  !COCKROACH_password ||
  !COCKROACH_database ||
  !COCKROACH_host ||
  !COCKROACH_dialect ||
  !COCKROACH_port ||
  !COCKROACH_cluster
) {
  throw new Error(
    'Missing required environment variables for database connection',
  );
}

const databaseCredentials = {
  username: COCKROACH_username,
  password: COCKROACH_password,
  database: COCKROACH_database,
  host: COCKROACH_host,
  dialect: COCKROACH_dialect,
  dialectModule: pg,
  port: COCKROACH_port,
  dialectOptions: {
    options: `--cluster=${COCKROACH_cluster}`,
    ssl: {},
  },
};

module.exports = databaseCredentials;

let connection = new Sequelize(
  databaseCredentials.database,
  databaseCredentials.username,
  databaseCredentials.password,
  {
    host: databaseCredentials.host,
    dialect: databaseCredentials.dialect,
    dialectModule: pg,
    port: databaseCredentials.port,
    dialectOptions: databaseCredentials.dialectOptions,
    pool: {
      max: 2,
      min: 0,
      idle: 0,
      acquire: 3000,
      evict: 10000,
    },
    define: {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      underscored: false,
    },
  },
);

module.exports.connection = connection;
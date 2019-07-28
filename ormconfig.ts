module.exports = {
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: ['server/models/*.ts'],
  migrations: ['server/db/migrations/*.ts'],
  cli: {
    migrationsDir: 'server/db/migrations',
    entitiesDir: 'server/models',
  },
}

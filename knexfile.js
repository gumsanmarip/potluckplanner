const sharedConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  migrations: {
    directory: './data/migrations',
  },
  seeds: {
    directory: './data/seeds',
  },
  pool: {
    afterCreate: (conn, done) => {
      conn.run('PRAGMA foreign_keys = ON', done)
    },
  },
}

module.exports = {
  development: {
    ...sharedConfig,
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./data/potluck-planner.db3",
    },
    production: {
      ...sharedConfig,
      connection: { filename: './data/prod.db3' },
    },
    seeds: {
      directory: "./data/seeds",
    },
  },
};

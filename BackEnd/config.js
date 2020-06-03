var config = {
  production: false,
  port: 3000,
};

config.db = {
  host: "database",
  port: 5432,
  database: "todo",
  user: "todo",
  password: "todo",
};

// Override default settings
switch (process.env.NODE_ENV) {
  case "production":
    config.port = 3000;
    break;
  case "staging":
    config.port = 3000;
    break;
}

module.exports = config;

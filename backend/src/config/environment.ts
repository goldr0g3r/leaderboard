import { configDotenv } from "dotenv";
import IEnvironment, { NodeEnvironment } from "./interfaces/IEnvironment";

configDotenv({
  path: "./src/config/.env",
});

const environment: IEnvironment = {
  port: 8080,
  nodeEnv: NodeEnvironment.DEVELOPMENT,
  accessTokenSecret: "abcdefgh-123-abcdefgh",
  accessTokenExpiry: 15 * 60 * 60 * 1000,
  mongoDbUrl: "mongodb://localhost:27017/leaderboard",
};

if (process.env.PORT) {
  environment.port = parseInt(process.env.PORT);
} else {
  console.error(
    `PORT is not defined in .env file. Using default port ${environment.port}`
  );
}

if (process.env.NODE_ENV) {
  if (
    process.env.NODE_ENV !== NodeEnvironment.DEVELOPMENT &&
    process.env.NODE_ENV !== NodeEnvironment.PRODUCTION
  )
    console.error(
      `NODE_ENV is not valid in .env file. Using default environment: ${environment.nodeEnv}`
    );
  else environment.nodeEnv = process.env.NODE_ENV as NodeEnvironment;
} else {
  console.error(
    `NODE_ENV is not defined in .env file. Using default environment: ${environment.nodeEnv}`
  );
}

if (process.env.REFRESH_TOKEN_SECRET) {
  environment.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
} else {
  console.error(`REFRESH_TOKEN_SECRET is not defined in .env file`);
}

if (process.env.REFRESH_TOKEN_EXPIRY) {
  environment.refreshTokenExpiry = parseInt(process.env.REFRESH_TOKEN_EXPIRY);
} else {
  console.error(
    `REFRESH_TOKEN_EXPIRY is not defined in .env file, using default value: ${environment.refreshTokenExpiry}`
  );
}

if (process.env.ACCESS_TOKEN_SECRET) {
  environment.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
} else {
  console.error(`ACCESS_TOKEN_SECRET is not defined in .env file`);
}

if (process.env.ACCESS_TOKEN_EXPIRY) {
  environment.accessTokenExpiry = parseInt(process.env.ACCESS_TOKEN_EXPIRY);
} else {
  console.error(
    `ACCESS_TOKEN_EXPIRY is not defined in .env file, using default value: ${environment.accessTokenExpiry}`
  );
}

if (process.env.COOKIE_SECRET) {
  environment.cookieSecret = process.env.COOKIE_SECRET;
} else {
  console.error(`COOKIE_SECRET is not defined in .env file`);
}

if (process.env.BCRYPT_SALT_ROUNDS) {
  environment.bcryptSaltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
} else {
  console.error(
    `BCRYPT_SALT_ROUNDS is not defined in .env file, using default value: ${environment.bcryptSaltRounds}`
  );
}

if (process.env.MONGODB_URL) {
  environment.mongoDbUrl =
    "mongodb+srv://Iagent-node:tptMZVgPjyYrsYQv@cluster0.qikjyyx.mongodb.net/Iagent-node";
} else {
  console.error(
    `MONGODB_URL is not defined in .env file, using default value: ${environment.mongoDbUrl}`
  );
}

if (process.env.PUBLIC_URL_SECRET) {
  environment.publicUrlSecret = process.env.PUBLIC_URL_SECRET;
} else {
  console.error(`PUBLIC_URL_SECRET is not defined in .env file`);
}

if (process.env.PUBLIC_URL_UUID) {
  environment.publicUrlUUID = process.env.PUBLIC_URL_UUID;
} else {
  console.error(`PUBLIC_URL_UUID is not defined in .env file`);
}

if (process.env.GRAPH_INTERVAL) {
  environment.graphInterval = parseInt(process.env.GRAPH_INTERVAL);
} else {
  console.error(
    `GRAPH_INTERVAL is not defined in .env file, using default value: ${environment.graphInterval}`
  );
}

if (process.env.PROTECTED_URL_SECRET) {
  environment.protectedUrlSecret = process.env.PROTECTED_URL_SECRET;
} else {
  console.error(`PROTECTED_URL_SECRET is not defined in .env file`);
}

if (process.env.JWT_SECRET) {
  environment.jwtSecret = process.env.JWT_SECRET;
} else {
  console.error(`JWT_SECRET is not defined in .env file`);
}

export default environment;

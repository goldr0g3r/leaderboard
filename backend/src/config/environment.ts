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

if (process.env.MONGODB_URL) {
  environment.mongoDbUrl = process.env.MONGODB_URL;
} else {
  console.error(
    `MONGODB_URL is not defined in .env file, using default value: ${environment.mongoDbUrl}`
  );
}

export default environment;

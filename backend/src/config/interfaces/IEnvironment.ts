export enum NodeEnvironment {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
}

export default interface IEnvironment {
  port: number;
  nodeEnv: NodeEnvironment;
  accessTokenSecret: string;
  accessTokenExpiry: number;
  mongoDbUrl: string;
}

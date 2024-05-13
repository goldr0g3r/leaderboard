import app from "./app";
import environment from "./config/environment";

/**
 * Start the server on the specified port
 */
app.listen(environment.port, () =>
  console.info(`Server is up and listening to port ${environment.port}`)
);

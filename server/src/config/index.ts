export default () => ({
  app: {
    apiVersion: process.env.API_VERSION,
    frontendBaseUrl: process.env.FRONTEND_BASE_URL,
    serviceName: process.env.SERVICE_NAME,
    serviceVersion: process.env.SERVICE_VERSION,
    env: process.env.NODE_ENV || 'development',
  },
  mongo: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    auth: process.env.MONGO_AUTH,
    name: process.env.MONGO_NAME,
    user: process.env.MONGO_USERNAME,
    pass: process.env.MONGO_PASSWORD,
  },
});

module.exports = getCorsOptions = () => {
  return {
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "https://smart-energi-hub.vercel.app",
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  };
};

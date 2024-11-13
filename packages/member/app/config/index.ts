const config = __DEV__
  ? {
      AN_DEBUG: true,
      AUTOCARE_API_URL: "https://autocarenetwork.com",
    }
  : {
      AN_DEBUG: false,
      AUTOCARE_API_URL: "https://autocarenetwork.com",
    };

export default config;

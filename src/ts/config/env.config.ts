class config {
  static REFRESH_TOKEN_EXPIRATION_TIME = process.env.NEXT_PUBLIC_REFRESH_TOKEN_EXPIRATION_TIME || 1;
  static API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
}

export default config;

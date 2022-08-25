export interface TokenInterface {
  token: string;
  expires: string;
}

export interface TokensInterface {
  access: TokenInterface;
  refresh: TokenInterface;
}

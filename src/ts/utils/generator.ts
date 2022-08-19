export function generateUsername(name: string, number?: number): string {
  number = number || 4;

  return name + Math.floor(Math.random() * Math.pow(10, number));
}

export function generatePassword(passwordLength?: number, charset?: string): string {
  let password = '';

  passwordLength = passwordLength || 8;
  charset = charset || 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  for (let i = 0, n = charset.length; i < passwordLength; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }

  return password;
}

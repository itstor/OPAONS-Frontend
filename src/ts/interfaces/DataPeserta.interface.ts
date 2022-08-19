export interface DataPesertaForm {
  name: string;
  email: string;
  phone: string;
  school: string;
  username1: string;
  password1: string;
  username2: string;
  password2: string;
  username3: string;
  password3: string;
}

export type UsernameTypesForm = 'username1' | 'username2' | 'username3';
export type PasswordTypesForm = 'password1' | 'password2' | 'password3';

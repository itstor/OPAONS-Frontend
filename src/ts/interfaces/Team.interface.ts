import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';

export interface TeamInterface {
  membersId: string[];
  name: string;
  phone: string;
  school: string;
  email: string;
  score: number;
  schoolType: string;
  members: (UserInterface & DefaultResponseInterface)[];
  scoreTotal_1: number;
  scoreTotal_2: number;
  corrected: number;
  scoreTotal: number;
  pass: boolean;
}

export interface TeamMemberFormInterface {
  username: string;
  password: string;
  school?: string;
}

export interface TeamFormInterface {
  name: string;
  phone: string;
  school: string;
  email: string;
  schoolType: string;
}

export interface NewTeamFormInterface {
  team: TeamFormInterface;
  user1: TeamMemberFormInterface;
  user2: TeamMemberFormInterface;
  user3: TeamMemberFormInterface;
}

export interface TeamFormikInitialValuesInterface {
  name: string;
  email: string;
  phone: string;
  school: string;
  kategori: KategoriSekolah;
  username1: string;
  password1: string;
  username2: string;
  password2: string;
  username3: string;
  password3: string;
}

export type KategoriSekolah = 'SMA' | 'SMK';

export type UsernameTypesForm = 'username1' | 'username2' | 'username3';
export type PasswordTypesForm = 'password1' | 'password2' | 'password3';

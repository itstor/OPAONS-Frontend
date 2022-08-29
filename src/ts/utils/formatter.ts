import { TeamFormikInitialValuesInterface } from '@/ts/interfaces/Team.interface';

export default class Format {
  static usernamePasswordCopy(value: TeamFormikInitialValuesInterface) {
    return `
${value.username1} ${value.password1}
${value.username2} ${value.password2}
${value.username3} ${value.password3}`;
  }
}

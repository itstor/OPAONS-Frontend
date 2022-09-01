import { UserInterface } from '@/ts/interfaces/User.interface';

class LocalStorageService {
  setUser(user: Partial<UserInterface>) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): Partial<UserInterface> | null {
    const user = localStorage.getItem('user');

    if (!user) return null;

    return JSON.parse(user);
  }

  removeUser() {
    localStorage.removeItem('user');
  }

  removeUserAnswers() {
    localStorage.removeItem('userAnswers');
  }
}

export default new LocalStorageService();

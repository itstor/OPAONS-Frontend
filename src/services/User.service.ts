import { apiPrivate } from '@/services/apiPrivate';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { AnswerInterface, UserInterface } from '@/ts/interfaces/User.interface';

class UserService {
  getProfile() {
    return apiPrivate.get<UserInterface>('users/profile');
  }
  getUserById(id: string) {
    return apiPrivate.get<UserInterface & DefaultResponseInterface>(`users/${id}`);
  }
  updateUserById(id: string, user: Partial<UserInterface>) {
    return apiPrivate.patch<UserInterface & DefaultResponseInterface>(`users/${id}`, user);
  }
  getUserAnswers() {
    return apiPrivate.get<{ answers: AnswerInterface[] }>('users/answers');
  }
  toggleCorected(id: string) {
    return apiPrivate.post<UserInterface>(`users/toggle-corrected/${id}`);
  }
}

export default new UserService();

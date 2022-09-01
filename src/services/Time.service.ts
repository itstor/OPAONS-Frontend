import { apiPrivate } from '@/services/apiPrivate';
import { OldPagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { TimeInterface } from '@/ts/interfaces/Time.interface';
import queryPick from '@/ts/utils/queryPick';

class TimeService {
  async getAllTimes(options: { round?: number; sortBy?: string; limit?: number; page?: number }) {
    return await apiPrivate
      .get<OldPagingInterface<TimeInterface & DefaultResponseInterface>>('time' + queryPick(options))
      .then((r) => r.data);
  }

  createTime(time: TimeInterface) {
    return apiPrivate.post<TimeInterface & DefaultResponseInterface>('time', time);
  }

  getTimeById(id: string) {
    return apiPrivate.get<TimeInterface & DefaultResponseInterface>(`time/${id}`);
  }

  updateTimeById(id: string, time: Partial<TimeInterface>) {
    return apiPrivate.patch<TimeInterface & DefaultResponseInterface>(`time/${id}`, time);
  }

  deleteTimeById(id: string) {
    return apiPrivate.delete<TimeInterface & DefaultResponseInterface>(`time/${id}`);
  }
}

export default new TimeService();

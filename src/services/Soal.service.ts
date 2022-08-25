import { apiPrivate } from '@/services/apiPrivate';
import { PagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { SoalInterface } from '@/ts/interfaces/Soal.interface';
import queryPick from '@/ts/utils/queryPick';

class SoalService {
  getSoalAdmin(options: {
    type?: string;
    difficulty?: string;
    school?: string;
    round?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
  }) {
    return apiPrivate.get<PagingInterface<SoalInterface & DefaultResponseInterface>>('soal' + queryPick(options));
  }

  deleteSoalById(id: string) {
    return apiPrivate.delete(`soal/${id}`);
  }
}

export default new SoalService();

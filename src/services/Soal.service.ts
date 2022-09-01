import { apiPrivate } from '@/services/apiPrivate';
import { OldPagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { SoalInterface } from '@/ts/interfaces/Soal.interface';
import { AnswerInterface } from '@/ts/interfaces/User.interface';
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
    return apiPrivate.get<OldPagingInterface<SoalInterface & DefaultResponseInterface>>('soal' + queryPick(options));
  }

  getSoalPeserta() {
    return apiPrivate.get<(SoalInterface & DefaultResponseInterface)[]>('soal/peserta');
  }

  getUserAnswers() {
    return apiPrivate.get<AnswerInterface[]>('soal/answers');
  }

  async getSoalById({ id }: { id: string }) {
    return await apiPrivate.get<SoalInterface & DefaultResponseInterface>(`soal/${id}`).then((r) => r.data);
  }

  async getSoalByRound({ round, kategori }: { round: number; kategori: string }) {
    return apiPrivate
      .get<OldPagingInterface<SoalInterface & DefaultResponseInterface>>(
        `soal?round=${round}&limit=1000&school=${kategori}&sortBy=type:desc`
      )
      .then((r) => r.data);
  }

  deleteSoalById(id: string) {
    return apiPrivate.delete(`soal/${id}`);
  }

  createSoal(data: SoalInterface) {
    return apiPrivate.post('soal', data);
  }

  updateSoalById(id: string, data: Partial<SoalInterface>) {
    return apiPrivate.patch(`soal/${id}`, data);
  }

  jawabSoal({ id, answer }: { id: string; answer?: string | null }) {
    const data: { soalId: string; answer?: string | null } = {
      soalId: id,
      answer,
    };
    if (answer === '' || answer === null) {
      delete data.answer;
    }
    return apiPrivate.post(`soal/peserta`, data);
  }

  submitExam() {
    return apiPrivate.post('soal/peserta/finish');
  }
}

export default new SoalService();

import { apiPrivate } from '@/services/apiPrivate';
import UserService from '@/services/User.service';
import { NewPagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { NewTeamFormInterface, TeamInterface } from '@/ts/interfaces/Team.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';
import queryPick from '@/ts/utils/queryPick';

class TeamService {
  getAllTeams(options: { sortBy?: string; limit?: number; page?: number; schoolType?: string }) {
    return apiPrivate.get<NewPagingInterface<TeamInterface & DefaultResponseInterface>>('team/all' + queryPick(options));
  }

  createTeam(team: NewTeamFormInterface) {
    return apiPrivate.post<NewTeamFormInterface>('team/register', team);
  }

  deleteTeamById(id: string) {
    return apiPrivate.delete<TeamInterface & DefaultResponseInterface>(`team/${id}`);
  }

  updateTeamById(id: string, team: Partial<TeamInterface>) {
    return apiPrivate.patch<TeamInterface & DefaultResponseInterface>(`team/${id}`, team);
  }

  async getTeamById({ id }: { id: string }) {
    return await apiPrivate.get<{ team: (TeamInterface & DefaultResponseInterface)[] }>(`team/${id}`).then((r) => r.data);
  }

  async getTeamByName({ name }: { name: string }) {
    return await apiPrivate
      .get<{ team: (TeamInterface & DefaultResponseInterface)[] }>(
        `team?name=${name}
    `
      )
      .then((r) => r.data);
  }

  async getAllTeamMembers({ ids }: { ids: string[] }) {
    let data: (UserInterface & DefaultResponseInterface)[] = [];
    return await Promise.all(ids.map((id) => UserService.getUserById(id)))
      .then((r) => {
        data = r.map((r) => r.data);
        return data;
      })
      .catch((e) => {
        throw e;
      });
  }

  async getMinimumScore({ babak, kategori }: { babak: 1 | 2; kategori: string }) {
    return await apiPrivate
      .get<NewPagingInterface<TeamInterface & DefaultResponseInterface>>(
        'team/all' + queryPick({ limit: 1, sortBy: `scoreTotal_${babak}:asc`, page: 1, schoolType: kategori })
      )
      .then((r) => r.data.docs[0][`scoreTotal_${babak}`]);
  }

  async getMaximumScore({ babak, kategori }: { babak: 1 | 2; kategori: string }) {
    return await apiPrivate
      .get<NewPagingInterface<TeamInterface & DefaultResponseInterface>>(
        'team/all' + queryPick({ limit: 1, sortBy: `scoreTotal_${babak}:desc`, page: 1, schoolType: kategori })
      )
      .then((r) => r.data.docs[0][`scoreTotal_${babak}`]);
  }
}

export default new TeamService();

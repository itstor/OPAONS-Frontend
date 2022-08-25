import { apiPrivate } from '@/services/apiPrivate';
import UserService from '@/services/User.service';
import { PagingInterface } from '@/ts/interfaces/Pagination.interface';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { NewTeamFormInterface, TeamInterface } from '@/ts/interfaces/Team.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';
import queryPick from '@/ts/utils/queryPick';

class TeamService {
  getAllTeams(options: { sortBy?: string; limit?: number; page?: number; schoolType?: string }) {
    return apiPrivate.get<PagingInterface<TeamInterface & DefaultResponseInterface>>('team/all' + queryPick(options));
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
}

export default new TeamService();

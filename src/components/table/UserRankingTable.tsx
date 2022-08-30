import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import useSWR from 'swr';

import TeamService from '@/services/Team.service';
import { UserInterface } from '@/ts/interfaces/User.interface';

export default function UserRankingTable({ ids, babak }: { ids: string[]; babak: 1 | 2 }) {
  const { data } = useSWR({ ids }, TeamService.getAllTeamMembers);
  return (
    <React.Fragment>
      <tr>
        <td colSpan={7}>
          <TableContainer component={Paper}>
            <Table style={{ minWidth: '650' }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align='center'>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data
                  ? data.map((row: UserInterface) => (
                      <TableRow key='a'>
                        <TableCell component='th' scope='row'>
                          {row.username}
                        </TableCell>
                        <TableCell align='center'>{row[`score_${babak}`]}</TableCell>
                      </TableRow>
                    ))
                  : null}
              </TableBody>
            </Table>
          </TableContainer>
        </td>
      </tr>
    </React.Fragment>
  );
}

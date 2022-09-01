import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Tooltip } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Router from 'next/router';
import * as React from 'react';
import useSWR from 'swr';

import FlatChip from '@/components/FlatChip';

import TeamService from '@/services/Team.service';
import { DefaultResponseInterface } from '@/ts/interfaces/Response.interface';
import { UserInterface } from '@/ts/interfaces/User.interface';

export default function UserReviewTable({ ids, babak, teamName }: { ids: string[]; babak: 1 | 2; teamName: string }) {
  const { data } = useSWR({ ids }, TeamService.getAllTeamMembers);
  return (
    <tr>
      <td colSpan={7}>
        <TableContainer component={Paper}>
          <Table style={{ minWidth: '650' }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Terkoreksi?</TableCell>
                <TableCell align='center'>Score</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((row: UserInterface & DefaultResponseInterface, index) => (
                    <TableRow key={row.username}>
                      <TableCell component='th' scope='row'>
                        {row.username}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {babak === 1 ? (
                          <FlatChip label='Sudah' color='success' />
                        ) : row.corrected ? (
                          <FlatChip label='Sudah' color='success' />
                        ) : (
                          <FlatChip label='Belum dikoreksi' color='error' />
                        )}
                      </TableCell>
                      <TableCell align='center'>{row[`score_${babak}`]}</TableCell>
                      <TableCell component='th' scope='row'>
                        <Tooltip title='Koreksi'>
                          <IconButton
                            size='small'
                            onClick={() => {
                              Router.push(`/dashboard/review/${teamName}?id=${index}&babak=${babak}`);
                            }}
                          >
                            <FontAwesomeIcon icon={faCircleCheck} />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </td>
    </tr>
  );
}

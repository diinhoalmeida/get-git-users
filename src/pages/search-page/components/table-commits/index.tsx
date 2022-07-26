import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { AuthContext } from '../../../../setup/context/context';

function createData(
  message: string,
  stats_total: number,
  stats_additions: number,
  stats_deletions: number,
  date: Date,
  files: any
) {
  return {
    message,
    stats_total,
    stats_additions,
    stats_deletions,
    date,
    files
  };
}

function Row(props: { commitsList: ReturnType<typeof createData> }) {
  
  const { commitsList }: any = props;
  const [idOpen, setIdOpen] = React.useState<number | boolean>();
  const [previousId, setPreviousId] = React.useState<any>();

  const openCloseArrow = (id: number) => {
    setIdOpen(id);
    if (previousId !== idOpen) {
      setIdOpen(id);
      setPreviousId(id);
    } else {
      setIdOpen(false);  
    }
    
  }

  return (
    <React.Fragment>
      {commitsList?.map((project: any, id: number) => (
        <>
          <TableRow key={id} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => openCloseArrow(id)}
            >
              {idOpen === id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {project?.message}
          </TableCell>
          <TableCell align="right">{project?.stats_additions}</TableCell>
          <TableCell align="right">{project?.stats_deletions}</TableCell>
          <TableCell align="right">{project?.stats_total}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={idOpen === id} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Total price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project?.files?.map((file: any, id: number) => (
                      <TableRow key={id}>
                        <TableCell component="th" scope="row">
                          {project?.date}
                        </TableCell>
                        <TableCell>{file.filename}</TableCell>
                        <TableCell align="right">{file?.additions}</TableCell>
                        <TableCell align="right">
                          {file?.deletions}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </>
      ))}
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const { commitsList } = React.useContext(AuthContext);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell>Mensagem</TableCell>
            <TableCell align="right">Adições</TableCell>
            <TableCell align="right">Deletados</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row commitsList={commitsList} />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
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
import { TableCommitsTextPortuguese } from './constants';
import { TableCommitsInterface } from './interface';

function createData(
  message: string,
  stats_total: number,
  stats_additions: number,
  stats_deletions: number,
  date: Date,
  files: []
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

const { 
  addText, 
  delText, 
  totalText, 
  messageText, 
  addOnFileText, 
  dataCommitText, 
  deleteOnFileText, 
  filesText, 
  nameFileText
}: TableCommitsInterface = TableCommitsTextPortuguese;

function Row(props: { commitsList: ReturnType<typeof createData> }) {
  
  const { commitsList }: any = props;
  const [idOpen, setIdOpen] = React.useState<number | boolean>();
  const [previousId, setPreviousId] = React.useState<any>();

  const openCloseArrow = async (id: number) => {
    await setIdOpen(id);
    if (previousId !== idOpen) {
      setIdOpen(id);
    } else {
      setIdOpen(false);  
    }
    
  }

  const formatFileName = (fileName: string) => {  
    var newFileName:any = fileName;
    const arrayFileName = [...fileName.split("")];
    const arrayFileNameReverse = arrayFileName.reverse();
    const barId = arrayFileNameReverse.indexOf("/");
    const arrayNameFormated = arrayFileName.splice(0, barId).reverse();

    if (barId !== -1) newFileName = arrayNameFormated.join("");
    return { newFileName } 
  }

  const formatDate = (dateFileChanged: string) => {
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul","Ago","Set","Out","Nov","Dez"];
    let data = new Date(dateFileChanged);
    let dataFormatada = ((data.getDate() + " " + meses[(data.getMonth())] + " " + data.getFullYear()));
    return { dataFormatada };
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
                  {filesText}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>{dataCommitText}</TableCell>
                      <TableCell>{nameFileText}</TableCell>
                      <TableCell align="right">{addOnFileText}</TableCell>
                      <TableCell align="right">{deleteOnFileText}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {project?.files?.map((file: any, id: number) => {
                      const { newFileName } = (formatFileName(file.filename));
                      const { dataFormatada } = formatDate(project?.date);
                      return (
                        <TableRow key={id}>
                          <TableCell component="th" scope="row">
                            {`${dataFormatada}`}
                          </TableCell>
                          <TableCell>{newFileName}</TableCell>
                          <TableCell align="right">{file?.additions}</TableCell>
                          <TableCell align="right">
                            {file?.deletions}
                          </TableCell>
                        </TableRow>
                      )
                    })}
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
            <TableCell>{messageText}</TableCell>
            <TableCell align="right">{addText}</TableCell>
            <TableCell align="right">{delText}</TableCell>
            <TableCell align="right">{totalText}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <Row 
            commitsList={commitsList} 
            
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
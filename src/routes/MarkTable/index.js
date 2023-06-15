import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { get } from '../../utils/request';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function MarkTable() {
    const { classId } = useParams();

    const [rows, setRows] = useState([]);

    const [cell, setCell] = useState(0);

    useEffect(() => {
        const students = get(`/classes/${classId}/students`);
        const reports = get(`/cycle-reports`, { classId: classId });

        Promise.all([students, reports]).then(([students, reports]) => {
            const studentList = students.data.data;
            const reportList = reports.data.data;

            const matcher = (groupId) => {
                return reportList.filter((report) => report.groupId == groupId);
            };

            const _list = studentList.map((student) => {
                const mark = student.groupId ? matcher(student.groupId) : [];

                if (mark.length > cell) {
                    setCell(mark.length);
                }

                return {
                    ...student,
                    mark,
                };
            });

            console.log(_list);

            setRows(_list);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Student Name</TableCell>
                        <TableCell align="left">Group</TableCell>
                        {new Array(cell).fill('').map((cell, index) => (
                            <TableCell align="center" key={index}>
                                Cycle {index + 1}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((student) => {
                        return (
                            <TableRow key={student.id}>
                                <TableCell component="th" scope="row">
                                    {student.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {student.groupNumber ? 'Group' + student.groupNumber : '-'}
                                </TableCell>
                                {student.mark &&
                                    student.mark.map((mark, index) => (
                                        <TableCell align="center" key={index}>
                                            {mark.mark}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MarkTable;

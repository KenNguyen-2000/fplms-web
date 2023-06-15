/* eslint-disable prettier/prettier */
import { useState, useEffect } from 'react';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { Table, Row, TableHeader, Selection } from '../../components';
import { get } from '../../utils/request';
import { success } from '../../utils/toaster';
import { TableContainer, SelectionContainer } from './style';

function StudentList() {
    const { classId } = useParams();

    const [rows, setRows] = useState({});

    const [groups, setGroups] = useState([]);

    const addGroup = (groupNumber) => {
        setGroups((groups) => {
            const _group = groups.filter((group) => group.groupNumber == groupNumber);
            console.log(_group);
            if (_group.length == 0) {
                return groups.concat({
                    groupNumber: groupNumber,
                    value: groupNumber,
                    content: 'Group' + groupNumber,
                });
            }
            return groups;
        });
    };

    useEffect(() => {
        get(`/classes/${classId}/students`).then((response) => {
            if (response.status == 200 && response.data.code == 200) {
                const data = response.data.data;
                data.forEach((student) => {
                    addGroup(student.groupNumber);
                    setRows((rows) => {
                        return {
                            ...rows,
                            [student.id]: {
                                group: student.groupNumber,
                                name: student.name,
                                ...student,
                            },
                        };
                    });
                });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _delete = (studentId) => {
        axios
            .delete(process.env.REACT_APP_API_URL + `/classes/${classId}/students/${studentId}`, {
                headers: { Authorization: `${localStorage.getItem('token')}` },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.code);
                    success('Delete success');
                    setRows((rows) => {
                        const _rows = { ...rows };
                        delete _rows[studentId];
                        return _rows;
                    });
                }
            });
    };

    const _move = (selection, student) => {
        console.log('_move');
        axios
            .put(
                process.env.REACT_APP_API_URL +
                `/classes/${classId}/students/${student.id}/groups/${selection.groupNumber}`,
                {
                    Authorization: `${localStorage.getItem('token')}`
                }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    console.log(res.data.code);
                    success('Move success');
                    setRows((rows) => {
                        const _row = { ...rows };
                        _row[student.id].group = selection.groupNumber;
                        return _row;
                    });
                }
            });
    };

    return (
        <TableContainer>
            <div>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <tbody>
                        <TableHeader>
                            <td>Student Name</td>
                            <td align="left">Group</td>
                            <td>Remove</td>
                            <td>Move</td>
                        </TableHeader>
                        {Object.keys(rows).map((studentId) => {
                            return (
                                <Row
                                    key={studentId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <td component="th" scope="row">
                                        {rows[studentId].name}
                                    </td>
                                    <td component="th" scope="row">
                                        Group {rows[studentId].group}
                                    </td>
                                    <td
                                        component="th"
                                        scope="row"
                                        onClick={() => _delete(studentId)}
                                    >
                                        remove
                                    </td>
                                    <td component="th" scope="row">
                                        <SelectionContainer>
                                            <Selection
                                                onChange={(e) => _move(e, rows[studentId])}
                                                options={groups
                                                    .filter(
                                                        (group) =>
                                                            rows[studentId].groupNumber !=
                                                            group.groupNumber
                                                    )
                                                    .sort((group1, group2) =>
                                                        group1.groupNumber > group2.groupNumber
                                                            ? 1
                                                            : -1
                                                    )}
                                            />
                                        </SelectionContainer>
                                    </td>
                                </Row>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        </TableContainer>
    );
}

export default StudentList;

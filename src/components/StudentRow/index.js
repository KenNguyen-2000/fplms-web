import { useState } from 'react';

import { TableCell, Container, Row, GroupInput } from './style';

const StudentRow = ({ studentName, studentID, groupName, role, reports, action }) => {
    const [group, setGroup] = useState(groupName);
    return (
        <>
            <Container>
                <Row>
                    <TableCell>{studentName}</TableCell>
                    <TableCell>{studentID}</TableCell>
                    <TableCell>
                        <GroupInput
                            type={'text'}
                            onChange={(e) => setGroup(e.target.value)}
                            placeholder={'Group Name'}
                            value={group}
                        />
                    </TableCell>
                    <TableCell>{role}</TableCell>
                    <TableCell>{reports}</TableCell>
                    <TableCell>{action}</TableCell>
                </Row>
            </Container>
        </>
    );
};

export default StudentRow;

import { useParams } from 'react-router-dom';

import { getTokenInfo } from '../../utils/account';
import LecturerView from './lecturer.view';
import StudentView from './student.view';

const GroupView = () => {
    const { groupId, classId } = useParams();

    const user = getTokenInfo();

    return user.email.includes('fe@') ? (
        <LecturerView groupId={groupId} classId={classId} />
    ) : (
        <StudentView groupId={groupId} classId={classId} />
    );
};

export default GroupView;

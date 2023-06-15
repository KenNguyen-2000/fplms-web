/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { getTokenInfo } from '../../utils/account';
import { error, success } from '../../utils/toaster';
import AvatarGroup from '../AvatarGroup';
import ConfirmModal from '../ConfirmModal';
import EditGroupForm from '../EditGroupForm';
import {
    Container,
    Header,
    Row,
    Project,
    Members,
    GroupBtn,
    JoinBtn,
    Dropdown,
    DropdownMenu,
} from './style';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BookIcon from '@mui/icons-material/Book';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PeopleIcon from '@mui/icons-material/People';

const GroupSection = ({ data, class_ID, role, email, isJoined, setJoin, setRefresh }) => {
    const [isCreate, setCreate] = useState(false);
    const [disable, setDisable] = useState(false);
    const [disableBtn, setDisableBtn] = useState(false);
    const [btnStyle, setBtnStyle] = useState(false);
    const [action, setAction] = useState();
    const [slot, setSlot] = useState(data.currentNumber);
    const [isOpen, setIsOpen] = useState(false);
    const [group] = useState(data);
    const currentDate = new Date();

    const navigate = useNavigate();
    const user = getTokenInfo();

    const TOKEN = localStorage.getItem('token');
    const URL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}/join`;
    const URL_DELETE = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}`;
    const URL_DISABLE =
        process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}/disable`;
    const URL_ENABLE =
        process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups/${group.id}/enable`;
    const header = {
        Authorization: `${TOKEN}`,
    };

    useEffect(() => {
        if (
            slot === group.memberQuantity ||
            isJoined ||
            currentDate > new Date(group.enrollTime) ||
            data.disable
        ) {
            if (data.disable) {
                setDisableBtn(true);
            }
            setDisable(true);
        } else {
            setDisable(false);
            setDisableBtn(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slot, isJoined]);

    const handleJoinBtn = async () => {
        await axios.post(URL, {}, { headers: header }).then((res) => {
            if (res.data.code == 200) {
                setJoin(true);
                setBtnStyle(true);
                setSlot((prev) => prev + 1);
                navigate(`/class/${class_ID}/group/${group.id}`);
            } else {
                error(`An error occured!`);
            }
        });
    };

    const handleRemoveBtn = () => {
        axios
            .delete(URL_DELETE, { headers: header })
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Remove group${group.number} successfully!`);
                    setIsOpen(false);
                } else {
                    error(`${res.data.message}`);
                    setIsOpen(false);
                }
            })
            .finally(() => {
                setRefresh((prev) => prev - 1);
            });
    };

    const handleDisableGroup = () => {
        axios
            .put(URL_DISABLE, { userEmail: email }, { headers: header })
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Disable group${group.number} successfully!`);
                    setIsOpen(false);
                    setDisable(true);
                } else error(`${res.data.message}`);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                setRefresh((prev) => prev - 1);
            });
    };

    const handleEnableGroup = () => {
        axios
            .put(URL_ENABLE, { userEmail: email }, { headers: header })
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Enable group${group.number} successfully!`);
                    setIsOpen(false);
                    setDisable(false);
                } else error(`${res.data.message}`);
            })
            .catch((err) => {
                error(err);
            })
            .finally(() => {
                setRefresh((prev) => prev - 1);
            });
    };

    return (
        <>
            <EditGroupForm
                showing={isCreate}
                group={group}
                setCreate={setCreate}
                class_ID={class_ID}
                email={email}
                setRefresh={setRefresh}
            />
            <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={action} />
            <Container>
                <Header style={{ justifyContent: 'space-between' }}>
                    <div>GROUP {group.number}</div>
                    {user.email.includes('fe@') && (
                        <Dropdown>
                            <button className="sub-option" onClick={(e) => e.stopPropagation}>
                                <MoreVertIcon />
                            </button>
                            <DropdownMenu className="dropdown-menu">
                                <DeleteIcon
                                    onClick={() => {
                                        if (slot > 0) {
                                            error(`Group is not empty!`);
                                        } else {
                                            setIsOpen(true);
                                            setAction(() => handleRemoveBtn);
                                        }
                                    }}
                                />
                                <EditIcon onClick={() => setCreate(true)} />
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </Header>
                <Row>
                    <BookIcon className="book-icon" />
                    <Project style={{ color: group?.projectDTO?.name ? '#8B8B8B' : '#F776A5' }}>
                        {group?.projectDTO?.name || `UNASSIGNED`}
                    </Project>
                </Row>
                <Row>
                    <PeopleIcon className="people-icon" />
                    <Members>{`${slot}/${group.memberQuantity}Members`}</Members>
                </Row>
                <Row>
                    <AccessTimeIcon className="time-icon" />
                    <Members>{group.enrollTime && group.enrollTime.split('.')[0]}</Members>
                </Row>
                {user.email.includes('fe@') ? (
                    <Row>
                        <GroupBtn
                            onClick={() => {
                                navigate(`/class/${class_ID}/group/${group.id}`);
                            }}
                        >
                            View
                        </GroupBtn>
                        <GroupBtn
                            onClick={() => {
                                setIsOpen(true);
                                if (disableBtn) {
                                    setAction(() => handleEnableGroup);
                                } else {
                                    setAction(() => handleDisableGroup);
                                }
                            }}
                            style={{ backgroundColor: disableBtn ? '#75D996' : '#F776A5' }}
                        >
                            {disableBtn ? 'Enable' : 'Disable'}
                        </GroupBtn>
                    </Row>
                ) : (
                    <Row style={{ justifyContent: 'space-between' }}>
                        <AvatarGroup slot={slot} members={group.memberQuantity} />
                        <JoinBtn onClick={handleJoinBtn} disable={disable} btnStyle={btnStyle}>
                            {slot == group.memberQuantity ? 'Full' : disable ? 'Closed' : 'Join'}
                        </JoinBtn>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default GroupSection;

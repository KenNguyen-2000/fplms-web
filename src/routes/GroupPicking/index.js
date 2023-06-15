import { useState, useEffect } from 'react';

import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useParams, useNavigate } from 'react-router-dom';

import banner from '../../assets/Asset 1.png';
import { ConfirmModal } from '../../components';
import CreateGroupForm from '../../components/CreateGroupForm';
import GroupSection from '../../components/GroupSection';
import { error } from '../../utils/toaster';
import {
    Banner,
    Container,
    GroupList,
    Title,
    CreateGroupBtn,
    GroupLabel,
    BannerTitle,
    Loader,
} from './style';

const GroupPicking = () => {
    const class_ID = useParams().id;
    const [loading, setLoading] = useState(true);
    const [isCreate, setCreate] = useState(false);
    const [groups, setGroups] = useState([]);
    const [isJoined, setJoin] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups`;
    const UNENROLL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/unenroll`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    var user = jwt_decode(TOKEN);
    useEffect(() => {
        setLoading(true);
        axios
            .get(URL, {
                headers: header,
            })
            .then((res) => {
                setGroups(res.data.data);
                setLoading(false);
            })
            .catch((err) => {
                error(err);
                setLoading(false);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    const handleUnenroll = () => {
        axios
            .delete(UNENROLL, { headers: header })
            .then(() => setIsOpen(false))
            .then(navigate('/class'));
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleUnenroll} />
            <CreateGroupForm
                groups={groups}
                showing={isCreate}
                setCreate={setCreate}
                class_ID={class_ID}
                setRefresh={setRefresh}
            />
            <Container>
                <Banner>
                    <BannerTitle>Groups brings out the best</BannerTitle>
                    <img src={banner} alt="Banner" />
                </Banner>
                <GroupLabel>
                    <Title>groups</Title>
                    {user.email.includes('fe@') ? (
                        <div style={{ display: 'flex' }}>
                            <CreateGroupBtn
                                onClick={() => {
                                    navigate(`/mark-table/${class_ID}`);
                                }}
                            >
                                Mark Table
                            </CreateGroupBtn>
                            <CreateGroupBtn
                                onClick={() => {
                                    navigate(`/student-list/${class_ID}`);
                                }}
                            >
                                Student List
                            </CreateGroupBtn>
                            <CreateGroupBtn
                                onClick={() => {
                                    setCreate(true);
                                }}
                            >
                                Create Groups
                            </CreateGroupBtn>
                        </div>
                    ) : (
                        <CreateGroupBtn onClick={() => setIsOpen(true)}>Unenroll</CreateGroupBtn>
                    )}
                </GroupLabel>
                <GroupList>
                    {loading && <Loader />}
                    {groups
                        ?.sort((a, b) => a.number - b.number)
                        .map((group) => {
                            return (
                                <GroupSection
                                    key={group.id}
                                    data={group}
                                    class_ID={class_ID}
                                    {...user}
                                    isJoined={isJoined}
                                    setJoin={setJoin}
                                    setRefresh={setRefresh}
                                />
                            );
                        })}
                </GroupList>
            </Container>
        </>
    );
};

export default GroupPicking;

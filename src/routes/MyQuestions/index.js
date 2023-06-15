import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import PostLoader from '../../components/PostSection/loader';
import Selection from '../../components/Selection';
import StudentInfoModal from '../../components/StudentInfoModal';
import TopActivities from '../../components/TopActivities';
import { getTokenInfo } from '../../utils/account';
import {
    StyledContainer,
    StyledHeader,
    Row,
    Column,
    NewTopicBtn,
    InputBox,
    StyledBody,
    PostList,
    Label,
    TypeSelection,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const MyQuestions = () => {
    const [search, setSearch] = useState('');
    const topMember = [
        {
            name: 'Tran Nhat Hoang',
            comments: '1k comments',
        },
        {
            name: 'Quach Heng To Ni',
            comments: '305 comments',
        },
        {
            name: 'Mai Thanh Phuong',
            comments: '300 comments',
        },
        {
            name: 'Pham Trong Thanh',
            comments: '290 comments',
        },
        {
            name: 'Nguyen Thanh Kien',
            comments: '102 comments',
        },
    ];

    const options = [
        {
            content: 'SWP391',
            value: 'SWP391',
        },
        {
            content: 'C#',
            value: 'C#',
        },
        {
            content: 'MogoDB',
            value: 'MogoDB',
        },
    ];
    const [loadAnim] = useState(
        new Array(3).fill(PostLoader).map((Load, i) => <PostLoader key={i} />)
    );
    const [isLoading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState();
    const [refresh, setRefresh] = useState(0);
    const navigate = useNavigate();
    const user = getTokenInfo();
    let URL = process.env.REACT_APP_DISCUSSION_URL;
    if (!user.email.includes('fe@')) {
        URL = URL + '/students/questions';
    } else {
        URL = URL + '/lecturers/questions';
    }

    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetchData = () => {
            axios
                .get(URL, {
                    headers: header,
                })
                .then((res) => {
                    if (res.status >= 200 && res.status < 300) {
                        setPosts(res.data);
                        setLoading(false);
                    } else {
                        setLoading(false);
                    }
                })
                .catch(setLoading(false));
        };
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refresh]);

    return (
        <>
            <StudentInfoModal isOpen={isOpen} studentInfo={studentInfo} setOpen={setOpen} />
            <StyledContainer>
                <Jumbotron title={'discussion'} subtitle={'SWP391'} />
                <StyledHeader>
                    <Row style={{ alignItems: 'flex-end' }}>
                        <Column>
                            <Row style={{ alignItems: 'flex-end' }}>
                                <Column>
                                    <Label>Search for topics</Label>
                                    <InputBox
                                        type={'text'}
                                        value={search}
                                        placeholder={'Search topic by name'}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </Column>
                                <Column>
                                    <TypeSelection>
                                        <Selection
                                            title={'Type'}
                                            options={options}
                                            placeholder={'All'}
                                        />
                                    </TypeSelection>
                                </Column>
                            </Row>
                        </Column>
                        <Column>
                            {!user.email.includes('fe@') && (
                                <NewTopicBtn onClick={() => navigate('/add-question')}>
                                    <AddIcon />
                                    Start new topic
                                </NewTopicBtn>
                            )}
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <PostList>
                            {isLoading ? (
                                loadAnim
                            ) : (
                                <>
                                    <span>My posts</span>
                                    {posts
                                        ?.filter((post) => !post.removed)
                                        .map((post) => (
                                            <PostSection
                                                key={post.id}
                                                post={post}
                                                setOpen={setOpen}
                                                setPosts={setPosts}
                                                setStudentInfo={setStudentInfo}
                                                setRefresh={setRefresh}
                                            />
                                        ))}
                                    <span>Removed posts</span>
                                    {posts
                                        ?.filter((post) => post.removed)
                                        .map((post) => (
                                            <PostSection
                                                key={post.id}
                                                post={post}
                                                setOpen={setOpen}
                                                setPosts={setPosts}
                                                setStudentInfo={setStudentInfo}
                                                setRefresh={setRefresh}
                                            />
                                        ))}
                                </>
                            )}
                        </PostList>
                    </Column>
                    <Column>
                        {/* <span>Top Activities</span> */}
                        <TopActivities arr={topMember} />
                    </Column>
                </StyledBody>
            </StyledContainer>
        </>
    );
};

export default MyQuestions;

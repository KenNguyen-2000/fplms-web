import { useEffect, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Pagination } from '../../components';
import Jumbotron from '../../components/Jumbotron';
import PostSection from '../../components/PostSection';
import PostLoader from '../../components/PostSection/loader';
import Selection from '../../components/Selection';
import StudentInfoModal from '../../components/StudentInfoModal';
import TopActivities from '../../components/TopActivities';
import { getTokenInfo } from '../../utils/account';
import { error } from '../../utils/toaster';
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
    PaginateContainer,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const DiscussionList = () => {
    const [search, setSearch] = useState('');
    const topMember = [
        {
            name: 'Tran Nhat Hoang',
            point: '15 point',
            value: 15,
        },
        {
            name: 'Quach Heng To Ni',
            point: '2 point',
            value: 2,
        },
        {
            name: 'Mai Thanh Phuong',
            point: '1 point',
            value: 1,
        },
        {
            name: 'Pham Trong Thanh',
            point: '25 point',
            value: 25,
        },
        {
            name: 'Nguyen Thanh Kien',
            point: '5 point',
            value: 5,
        },
    ];
    const loadPage = [
        {
            content: 'NEW',
            value: 0,
        },
        {
            content: 'TOP',
            value: 1,
        },
        {
            content: 'HOT',
            value: 2,
        },
    ];
    const [loadAnim] = useState(
        new Array(3).fill(PostLoader).map((Load, i) => <PostLoader key={i} />)
    );
    const [isLoading, setLoading] = useState(true);
    const [isOpen, setOpen] = useState(false);
    const [studentInfo, setStudentInfo] = useState();
    const [posts, setPosts] = useState([]);
    const [subject, setSubject] = useState();
    const [subjects, setSubjects] = useState();
    const [sort, setSort] = useState(0);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize] = useState(3);
    const navigate = useNavigate();
    const user = getTokenInfo();

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/questions`;

    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    useEffect(() => {
        try {
            setLoading(true);
            const fetchData = () => {
                axios
                    .get(URL, {
                        headers: header,
                        params: {
                            PageNumber: pageNum,
                            PageSize: pageSize,
                            sort: sort.value || 0,
                            Question: search || '',
                            Subject: subject?.value || '',
                        },
                    })
                    .then((res) => {
                        if (res.status == 200) {
                            console.log(res);
                            setPosts(res.data);
                            setTotalPages(JSON.parse(res.headers['x-pagination']).TotalPages);
                            setLoading(false);
                        } else {
                            error(`An error occured!`);
                            setLoading(false);
                        }
                    });
            };

            fetchData();
        } catch (err) {
            error(`${err}`);
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNum, subject, sort]);

    useEffect(() => {
        const getSubjects = () => {
            const URL = process.env.REACT_APP_DISCUSSION_URL + `/subjects`;
            axios
                .get(URL, { headers: header })
                .then((res) => {
                    const datas = res.data.map((item) => ({
                        value: item.name,
                        content: item.name,
                    }));

                    setSubjects([{ value: '', content: 'All' }].concat(datas));
                })
                .catch((err) => {
                    error(err);
                    return;
                });
        };
        getSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const searchForQuestions = (e) => {
        if (e.key === 'Enter') {
            setLoading(true);
            axios
                .get(URL, {
                    headers: header,
                    params: {
                        PageNumber: pageNum,
                        PageSize: pageSize,
                        Question: search || '',
                        Subject: subject?.content || '',
                    },
                })
                .then((res) => {
                    if (res.status == 200) {
                        setPosts(res.data);
                        setTotalPages(JSON.parse(res.headers['x-pagination']).TotalPages);
                        setLoading(false);
                    } else {
                        error(`An error occured!`);
                        setLoading(false);
                    }
                });
        }
    };

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
                                        onKeyUp={searchForQuestions}
                                    />
                                </Column>
                                <Column>
                                    <TypeSelection>
                                        <Selection
                                            title={'Type'}
                                            options={subjects || [{}]}
                                            placeholder={'All'}
                                            onChange={setSubject}
                                        />
                                    </TypeSelection>
                                </Column>
                                <Column>
                                    <TypeSelection>
                                        <Selection
                                            title={'Type'}
                                            options={loadPage}
                                            placeholder={'Sort'}
                                            onChange={setSort}
                                        />
                                    </TypeSelection>
                                </Column>
                            </Row>
                        </Column>
                        <Column>
                            {!user.email.includes('fe@') ? (
                                <NewTopicBtn onClick={() => navigate('/add-question')}>
                                    <AddIcon />
                                    <span>Add question</span>
                                </NewTopicBtn>
                            ) : null}
                        </Column>
                    </Row>
                </StyledHeader>
                <StyledBody>
                    <Column>
                        <span>New Posts</span>
                        <PostList>
                            {isLoading
                                ? loadAnim
                                : posts?.map((post) => (
                                      <PostSection
                                          key={post.id}
                                          post={post}
                                          setPosts={setPosts}
                                          setOpen={setOpen}
                                          setStudentInfo={setStudentInfo}
                                      />
                                  ))}
                        </PostList>
                        {totalPages > 0 && (
                            <PaginateContainer>
                                <Pagination
                                    pageSize={pageSize}
                                    totalPages={totalPages}
                                    setPageNum={setPageNum}
                                    currentPage={pageNum}
                                />
                            </PaginateContainer>
                        )}
                    </Column>
                    <Column>
                        <span style={{ visibility: 'hidden' }}>Top Contributors</span>
                        <TopActivities arr={topMember} />
                    </Column>
                </StyledBody>
            </StyledContainer>
        </>
    );
};

export default DiscussionList;

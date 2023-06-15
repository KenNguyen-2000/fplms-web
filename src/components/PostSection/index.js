/* eslint-disable no-unused-vars */
import { useState } from 'react';

import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

import { getTokenInfo } from '../../utils/account';
import { error, success } from '../../utils/toaster';
import ConfirmModal from '../ConfirmModal';
import {
    Container,
    Row,
    Title,
    Course,
    PostFeature,
    Divider,
    Author,
    Answers,
    FeatureList,
    Vote,
    Dropdown,
    DropdownMenu,
} from './style';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

// eslint-disable-next-line no-unused-vars
const PostSection = ({ post, setOpen, setPosts, setStudentInfo, setRefresh }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    const { title, student, subject, createdDate, removed, removedBy } = post;
    const pathname = useLocation().pathname;
    const userInfo = JSON.parse(localStorage.getItem('user'));
    // const user = getTokenInfo();
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/questions/${post.id}`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const deleteQuestion = () => {
        axios
            .delete(URL, { headers: header })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    success(`Delete question successfully!`);
                    setRefresh((prev) => prev - 1);
                    setIsOpen(false);
                } else {
                    error(`${res.message}`);
                    setIsOpen(false);
                }
            })
            .finally(() => setIsOpen(false));
    };

    const handleVote = () => {
        const handleUpvote = () => {
            setPosts((prev) =>
                prev.map((item) =>
                    item.id === post.id
                        ? {
                              ...item,
                              upvotes: post.upvoted ? post.upvotes - 1 : post.upvotes + 1,
                              upvoted: post.upvoted ? false : true,
                          }
                        : item
                )
            );
        };
        axios
            .patch(
                URL + `/upvote`,
                {
                    upvotes: post.upvotes + 1,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.status == 204) {
                    handleUpvote();
                }
            });
    };

    const displayAuthorInfo = (studentId) => {
        const URL = process.env.REACT_APP_DISCUSSION_URL + `/students/${studentId}`;
        axios
            .get(URL, { headers: header })
            .then((res) => {
                if (res.status >= 200 && res.status < 300) {
                    setOpen(true);
                    setStudentInfo(res.data);
                } else {
                    error(res.message);
                }
            })
            .catch((err) => error(err));
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={deleteQuestion} />
            <Row>
                <Container>
                    <Row>
                        <Title
                            onClick={() => {
                                navigate(`/discussion-view/${post.id}`);
                            }}
                        >
                            {title}
                        </Title>
                        <Course>{subject?.name}</Course>
                    </Row>
                    <Row>
                        <FeatureList>
                            <PostFeature>SWP391</PostFeature>
                            <PostFeature>.Net</PostFeature>
                            <PostFeature>C#</PostFeature>
                            <PostFeature>MongoDB</PostFeature>
                        </FeatureList>
                    </Row>
                    <Divider />
                    <Row>
                        <Author onClick={() => displayAuthorInfo(student?.id)}>
                            <img src={student?.picture} alt="Student Avatar" />
                            <p>
                                Posted by <span>{student?.name} </span>
                                <ReactTimeAgo date={Date.parse(createdDate)} locale="en-US" />
                            </p>
                        </Author>

                        {(!removed &&
                            userInfo.email == post.student.email &&
                            pathname == '/my-questions') ||
                        (!removed && userInfo.email.includes('fe@')) ? (
                            <>
                                <Dropdown>
                                    <button
                                        className="sub-option"
                                        onClick={(e) => e.stopPropagation}
                                    >
                                        <MoreVertIcon />
                                    </button>
                                    <DropdownMenu className="dropdown-menu">
                                        <DeleteIcon onClick={() => setIsOpen(true)} />
                                        {userInfo.email.includes('fe@') && (
                                            <EditIcon
                                                onClick={() =>
                                                    navigate(`/add-question?id=${post?.id}`)
                                                }
                                            />
                                        )}
                                    </DropdownMenu>
                                </Dropdown>
                            </>
                        ) : null}
                    </Row>
                    {removed && <Answers>Removed by {removedBy}</Answers>}
                </Container>
                {!removed ? (
                    <Vote upvoted={post.upvoted}>
                        <ArrowDropUpIcon onClick={() => handleVote()} />
                        <div>{post.upvotes}</div>
                    </Vote>
                ) : (
                    <div style={{ width: '87px' }}></div>
                )}
            </Row>
        </>
    );
};

export default PostSection;

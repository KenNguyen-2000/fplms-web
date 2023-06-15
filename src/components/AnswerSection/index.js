import { useState, useRef } from 'react';

import axios from 'axios';
import TimeAgo from 'javascript-time-ago';
import ReactTimeAgo from 'react-time-ago';

import interceptor from '../../routes/interceptor';
import { error } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
import ConfirmModal from '../ConfirmModal';
import {
    Container,
    CommentInput,
    Comment,
    Answers,
    Col,
    Row,
    Action,
    Vote,
    Dropdown,
    DropdownMenu,
} from './style';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import AttachmentIcon from '@mui/icons-material/Attachment';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

const AnswerSection = ({ questionId, answers, setRefresh, setStudent, setOpenStudentInfo }) => {
    TimeAgo.addLocale(en);
    TimeAgo.addLocale(ru);
    const [answer, setAnswer] = useState();
    const [isLoading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [deleteData, setDeleteDate] = useState();
    const refs = useRef(new Array());
    const dropdownRefs = useRef(new Array());
    const userInfo = JSON.parse(localStorage.getItem('user'));

    const URL = process.env.REACT_APP_DISCUSSION_URL + `/answers`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };
    const handlePostAnswer = () => {
        setLoading(true);
        axios
            .post(
                URL,
                {
                    content: answer,
                    questionId: questionId,
                },
                { headers: header }
            )
            .then(() => {
                setAnswer('');
                setLoading(false);
            })
            .catch((err) => {
                error(`${err}`);
                setLoading(false);
            })
            .finally(() => {
                setRefresh((prev) => prev + 1);
            });
    };

    const handleDeleteAnswer = () => {
        interceptor.delete(`${URL}/${deleteData.id}`).then((res) => {
            if (res.status >= 200 && res.status < 300) {
                setRefresh((prev) => prev - 1);
                setIsOpen(false);
            } else {
                error(`An error occured!`);
                setRefresh((prev) => prev - 1);
                setIsOpen(false);
            }
        });
    };

    const handleAcceptAnswer = async (data, e) => {
        e.preventDefault();
        try {
            const acceptData = answers.find((item) => item.accepted === true);
            if (acceptData && acceptData.id !== data.id) {
                const res = await interceptor.put(`${URL}/${acceptData.id}/accept`, {});

                if (res.status >= 200 && res.status < 300) {
                    const res2 = await interceptor.put(`${URL}/${data.id}/accept`, {});
                    if (res2.status >= 200 && res2.status < 300) {
                        e.target.checked = true;
                        setRefresh((prev) => prev - 1);
                    } else {
                        error(`Error occured`);
                    }
                } else {
                    error(`Error occured`);
                }
            } else {
                const res = await axios.put(`${URL}/${data.id}/accept`, {}, { headers: header });

                if (res.status >= 200 && res.status < 300) {
                    e.target.checked = true;
                    setRefresh((prev) => prev - 1);
                } else {
                    error(`Error occured`);
                }
            }

            if (e.target.checked) {
                e.target.checked = false;
            }
        } catch (err) {
            error(err);
        }
    };

    const handleVote = (data) => {
        interceptor
            .patch(
                URL + `/${data.id}/upvote`,
                {
                    upvotes: data.upvoted + 1,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.status == 204) {
                    setRefresh((prev) => prev - 1);
                }
            });
    };
    const handleEditAnswer = (index) => {
        refs.current[index].disabled = false;
        refs.current[index].focus();
        document.querySelector(`.save-btn-${index}`).style.display = 'block';
    };

    const handleSaveAnswer = (id, index) => {
        axios
            .put(
                URL + `/${id}`,
                {
                    content: refs.current[index].value,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.status == 204) {
                    document.querySelector(`.save-btn-${index}`).style.display = 'none';
                    refs.current[index].disabled = true;
                    setRefresh((prev) => prev + 1);
                } else {
                    error(`An error occured`);
                }
            })
            .catch((err) => {
                error(err);
            });
    };

    return (
        <>
            <ConfirmModal isOpen={isOpen} setIsOpen={setIsOpen} action={handleDeleteAnswer} />
            <Container>
                <Answers>
                    <img src={userInfo?.imageUrl} />
                    <Comment isLoading={isLoading}>
                        <ButtonLoader isLoading={isLoading} />
                        <CommentInput onChange={(e) => setAnswer(e.target.value)} value={answer} />

                        {/* <AttachmentIcon /> */}
                        <SendIcon onClick={handlePostAnswer} />
                    </Comment>
                </Answers>

                {answers?.map((data, index) => (
                    <Answers key={data.id}>
                        <Col>
                            <img src={data.student?.picture} alt="Student Avatar" />
                        </Col>
                        <Col>
                            <Row>
                                <Comment>
                                    <CommentInput
                                        disabled
                                        defaultValue={data.content}
                                        ref={(el) => refs.current.push(el)}
                                        onChange={(e) =>
                                            (refs.current[index].value = e.target.value)
                                        }
                                    />
                                    {userInfo.email === data.student.email && (
                                        <Dropdown>
                                            <button
                                                className="sub-option"
                                                ref={(el) => dropdownRefs.current.push(el)}
                                                onClick={(e) => e.stopPropagation}
                                            >
                                                <MoreVertIcon />
                                            </button>
                                            <DropdownMenu className="dropdown-menu">
                                                <DeleteIcon
                                                    onClick={() => {
                                                        setIsOpen(true);
                                                        setDeleteDate(data);
                                                    }}
                                                />
                                                <EditIcon onClick={() => handleEditAnswer(index)} />
                                            </DropdownMenu>
                                        </Dropdown>
                                    )}

                                    <SaveIcon
                                        sx={{ display: 'none' }}
                                        className={`save-btn-${index}`}
                                        onClick={() => handleSaveAnswer(data.id, index)}
                                    />
                                </Comment>
                            </Row>
                            <Row>
                                <Action checked={data.accepted}>
                                    <input
                                        type={'radio'}
                                        name="Like"
                                        id={data.id}
                                        onClick={(e) => handleAcceptAnswer(data, e)}
                                        defaultChecked={data.accepted}
                                    />
                                    <label htmlFor={data.id}>
                                        <DoneIcon className="check-icon" />
                                    </label>
                                </Action>
                                <Action>
                                    <span
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            setStudent(data.student);
                                            setOpenStudentInfo(true);
                                        }}
                                    >
                                        {data.student.name}
                                    </span>
                                </Action>
                                <Action>
                                    <ReactTimeAgo
                                        date={Date.parse(data.createdDate)}
                                        locale="en-US"
                                    />
                                </Action>
                            </Row>
                        </Col>
                        <Vote upvoted={data.upvoted}>
                            <ArrowDropUpIcon onClick={() => handleVote(data)} />
                            <div>{data.upvotes}</div>
                        </Vote>
                    </Answers>
                ))}
            </Container>
        </>
    );
};

export default AnswerSection;

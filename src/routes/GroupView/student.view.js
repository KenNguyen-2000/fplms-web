import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import {
    Calendar,
    Overlay,
    Selection,
    Skeleton,
    NoResult,
    AdvanceEditor,
    Table,
    Row,
    TableHeader,
    Avatars,
    ConfirmModal,
} from '../../components';
import { getTokenInfo } from '../../utils/account';
import { COLOR } from '../../utils/color';
import { fromHTML } from '../../utils/draft';
import { getRndInteger } from '../../utils/random';
import { get, put, post } from '../../utils/request';
import { success, error } from '../../utils/toaster';
import {
    Container,
    TableContainer,
    Title,
    SideBar,
    CommingContainer,
    Icon,
    CommingSection,
    RightSide,
    StyledH4,
    CommingTitle,
    GoalContainer,
    Status,
    Round,
    ExitButton,
    NeResultContainer,
    GoalCounter,
    GoalDes,
    StatusBar,
    SendBtn,
    Input,
    Type,
    StudentViewContainer,
} from './style';

import AssignmentIcon from '@mui/icons-material/Assignment';

const TopicList = ({
    isOpen,
    closeFn,
    avatars,
    editorState,
    topicList,
    viewTopic,
    pickTopic,
    setEditorState,
}) => {
    return (
        <Overlay isOpen={isOpen} fullFill={true}>
            <AdvanceEditor
                avatars={avatars}
                closeFn={closeFn}
                editorState={editorState}
                setEditorState={setEditorState}
                readOnly
            >
                {topicList.length > 0 ? (
                    topicList.map((item) => (
                        <GoalContainer
                            data-type="topic"
                            key={item.id}
                            onClick={() => viewTopic(item)}
                        >
                            <GoalDes>
                                {item.name || (
                                    <Skeleton style={{ width: `${getRndInteger(20, 40)}ch` }} />
                                )}
                            </GoalDes>
                            {item.name ? (
                                <button onClick={() => pickTopic(item)}>Select</button>
                            ) : (
                                <Skeleton style={{ width: '6ch' }} />
                            )}
                        </GoalContainer>
                    ))
                ) : (
                    <NeResultContainer>
                        <NoResult>
                            <h4>There is no topic for now</h4>
                        </NoResult>
                    </NeResultContainer>
                )}
            </AdvanceEditor>
        </Overlay>
    );
};

const TEMPLATE =
    '<h1>Pick a topic for your team:</h1>' +
    '<h2>Choose your own topic on the pannel on the right</h2>' +
    '<p>Once you picked, the topic will apply to all of your team member</p>' +
    "<p>Be carefully because this action can't be undone</p>";

const TEMPLATE2 = `
<h1>Reports agenda</h1>
<p>
Whether you’re meeting in-person or meeting asynchronously, these four agenda items will keep you and your team on top of your sprint.
</p>
<ol>
	<h2>1. Blockers</h2>
    <p>Is there anything preventing contributors from getting work done? Things to bring up here might be technical limitations, departmental and team dependencies, and personal limitations (like vacations booked, people out sick, etc.).</p>
    <h2>2. What you have done?</h2>
    <p>This is a quick rundown of what got done (and if anything didn’t get done, then why). This isn’t the time for each person to run down their whole to-do list – they should focus on the large chunks of work that made up their deep focus time, and the activities that are relevant to your team as a whole.</p>
    <h2>3. What are your goals?</h2>
    <p>Here, each team member will say what they want to accomplish – in other words, what they can be held accountable for in tomorrow’s daily scrum meeting.</p>
    <h2>4. How close are we to hitting our sprint goals? What’s your comfort level?</h2>
    <p>This agenda item will help the scrum master get an idea of how the team is feeling about how their day-to-day activities are impacting overall goals for the team, and how contributors are feeling about the pace of the sprint.</p>
</ol>
`;

const SubmitEdtior = ({ isOpen, setOpen, type, groupId }) => {
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(fromHTML(TEMPLATE2))
    );
    const [title, setTitle] = useState('');
    const [resourceLink, setResourceLink] = useState('');

    useEffect(() => {
        setEditorState(EditorState.createWithContent(fromHTML(TEMPLATE2)));
        setTitle('');
    }, [isOpen]);

    const submitCycle = () => {
        const data = {
            title: title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            resourceLink: resourceLink,
            groupId: parseInt(groupId),
        };
        console.log(data);
        post('/' + type + '-reports', data)
            .then((res) => {
                if (res.data.code == 200) {
                    success(res.data.message);
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error('An error occured');
            });
    };

    return (
        <Overlay isOpen={isOpen} fullFill={true}>
            <AdvanceEditor
                closeFn={() => setOpen(false)}
                editorState={editorState}
                setEditorState={setEditorState}
            >
                {/* <GoalContainer>
                    <GoalDes>Reports Stats:</GoalDes>
                    <StatusBar progress={progress} />
                    <GoalCounter>
                        <span>{progress[0]}</span> / {progress[1]}
                    </GoalCounter>
                </GoalContainer> */}
                <GoalContainer>
                    <GoalDes>Report Title</GoalDes>
                    <Input
                        placeholder={"Report's Title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value || '')}
                    />
                    <GoalDes>Resource Link</GoalDes>
                    <Input
                        placeholder={'References,...'}
                        value={resourceLink}
                        onChange={(e) => setResourceLink(e.target.value || '')}
                    />
                </GoalContainer>
                <SendBtn onClick={() => submitCycle(type)}>Send Report</SendBtn>
            </AdvanceEditor>
        </Overlay>
    );
};

const TextEditor = ({ report, close, progress }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [title, setTitle] = useState('');

    const avts = ['TP', 'NK', 'TN', 'TT', 'NH'];

    useEffect(() => {
        if (report) {
            try {
                setEditorState(
                    report.content
                        ? EditorState.createWithContent(convertFromRaw(JSON.parse(report.content)))
                        : EditorState.createEmpty()
                );
            } catch (err) {
                setEditorState(EditorState.createEmpty());
            }
            setTitle(report.title || '');
        }
    }, [report]);

    const submitCycle = () => {
        const data = {
            title: title,
            content: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            resourceLink: '',
            groupId: parseInt(report.groupId),
        };
        post('/' + report.type + '-reports', data)
            .then((res) => {
                if (res.data.code == 200) {
                    success(res.data.message);
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error('An error occured');
            });
    };

    return (
        <Overlay isOpen={report?.isOpen} fullFill={true}>
            <AdvanceEditor
                closeFn={close}
                avatars={avts}
                editorState={editorState}
                setEditorState={setEditorState}
                headColor={report && report.type == 'cycle' ? COLOR.blue[0] : COLOR.green[0]}
            >
                <GoalContainer>
                    <GoalDes>Reports Stats:</GoalDes>
                    <StatusBar progress={progress} />
                    <GoalCounter>
                        <span>{progress[0]}</span> / {progress[1]}
                    </GoalCounter>
                </GoalContainer>
                <GoalContainer>
                    <GoalDes>Report Title</GoalDes>
                    <Input
                        placeholder={"Report's Title"}
                        value={title}
                        onChange={(e) => setTitle(e.target.value || '')}
                    />
                </GoalContainer>
                <SendBtn onClick={submitCycle}>Send Report</SendBtn>
            </AdvanceEditor>
        </Overlay>
    );
};

const FeedBack = ({ list, setList, progress }) => {
    const open = (report) => {
        setList((list) => {
            let _list = [...list];
            _list.forEach((item, index) => {
                if (item.displayId == report.displayId) {
                    _list[index].isOpen = true;
                    return _list;
                }
            });
            return _list;
        });
    };

    const close = (report) => {
        setList((list) => {
            let _list = [...list];
            _list.forEach((item, index) => {
                if (item.displayId == report.displayId) {
                    _list[index].isOpen = false;
                    return _list;
                }
            });
            return _list;
        });
    };

    return (
        <Table columns="200px 1fr 200px 200px">
            <tbody>
                <TableHeader>
                    <td>
                        <b>Type</b>
                    </td>
                    <td>
                        <b>Report Title</b>
                    </td>
                    <td>
                        <b>Report Time</b>
                    </td>
                    <td>
                        <b>Write by</b>
                    </td>
                </TableHeader>
                {list.map((report) => {
                    return (
                        <React.Fragment key={report.displayId}>
                            <TextEditor
                                progress={[report.cycleNumber, progress]}
                                report={report}
                                close={() => close(report)}
                            />
                            <Row feedback={report.type} onClick={() => open(report)}>
                                <td>
                                    <Type type={report.type}>
                                        {report.type == 'cycle'
                                            ? 'Cycle Report'
                                            : 'Progress Report'}
                                    </Type>
                                </td>
                                <td>
                                    <Title>{report.title}</Title>
                                </td>
                                <td>
                                    <Title>{report.reportTime}</Title>
                                </td>
                                <td>
                                    {' '}
                                    <Avatars list={['TP', 'NK', 'TN', 'TT', 'NH']} />
                                </td>
                            </Row>
                        </React.Fragment>
                    );
                })}
            </tbody>
        </Table>
    );
};

const StudentView = ({ groupId, classId }) => {
    const navigate = useNavigate();
    const [isPicked, setPicked] = useState(false);

    const [cycleOpen, setCycleOpen] = useState(false);
    const [progressOpen, setProgressOpen] = useState(false);

    const [isTopicOpen, setTopicOpen] = useState(false);
    const [topicState, setTopicState] = useState(EditorState.createWithContent(fromHTML(TEMPLATE)));
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [reportType, setReportType] = useState([
        {
            value: 2,
            content: 'Progress report',
        },
    ]);
    const [progress, setProgress] = useState(1);
    const [list, setList] = useState([]);
    const [events, setEvents] = useState([]);

    const [topicList, setTopicList] = useState(
        new Array(20).fill('').map((k, i) => ({
            name: '',
            id: i,
        }))
    );

    const user = getTokenInfo();

    const calendarChange = (date) => {
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(date).add(1, 'd').format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(date).format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => ({
                    link: event.link,
                    id: event.id,
                    icon: <AssignmentIcon />,
                    title: event.title,
                    status: moment(new Date()).isAfter(event.scheduleTime) ? 'Done' : 'Incoming',
                    time: moment(event.scheduleTime).fromNow(),
                }));
                setEvents(data);
            }
        });
    };

    const onChange = (e) => {
        if (e.value == 1) {
            setCycleOpen(true);
            setProgressOpen(false);
        } else {
            setCycleOpen(false);
            setProgressOpen(true);
        }
    };

    const getReports = () => {
        get('/cycle-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => {
                            return {
                                ...data,
                                type: 'cycle',
                                displayId: 'cycle' + data.id,
                                isOpen: false,
                            };
                        })
                    )
                );
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => {
                            return {
                                ...data,
                                type: 'progress',
                                displayId: 'progress' + data.id,
                                isOpen: false,
                            };
                        })
                    )
                );
            }
        });
        // Promise.all([cycleReport, progressReport]).then(([cycleReport, progressReport]) => {
        //     setList(cycleReport.data.data.concat(progressReport.data.data));
        // });
    };

    useEffect(() => {
        // loadOverlay.setText('Looking for your group...');
        // loadOverlay.setActive(true);
        get(`/classes/${classId}`, { classId: classId }).then((res) => {
            if (res.data.code == 200) {
                setProgress(res.data.data.cycleDuration);
            }
        });
        get('/meetings', {
            classId: parseInt(classId),
            endDate: moment(new Date())
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .add(1, 'd')
                .format('yyyy-MM-DD HH:mm:ss.SSS'),
            startDate: moment(new Date())
                .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
                .format('yyyy-MM-DD HH:mm:ss.SSS'),
            groupId: parseInt(groupId),
        }).then((res) => {
            if (res.data.code == 200) {
                const data = res.data.data.map((event) => ({
                    link: event.link,
                    id: event.id,
                    icon: <AssignmentIcon />,
                    title: event.title,
                    status: moment(new Date()).isAfter(event.scheduleTime) ? 'Done' : 'Incoming',
                    time: moment(event.scheduleTime).fromNow(),
                }));
                setEvents(data);
            }
        });
        get(`/classes/${classId}/groups/details`, { classId: classId }).then((res) => {
            const data = res.data.data;
            if (res.data.code == 200) {
                if (data.projectDTO == null) {
                    const student = data.studentDtoSet.filter(
                        (student) => student.email == user.email
                    )[0];
                    if (student && student.id == data.leaderId) {
                        setTopicOpen(true);
                        setPicked(false);
                        setReportType((reportType) => {
                            return reportType.concat({
                                value: 1,
                                content: 'Cycle report',
                            });
                        });
                        get('/projects', { classId }).then((res) => {
                            const data = res.data;
                            if (data.code == 200) setTopicList(data.data);
                        });
                    }
                    // loadOverlay.setActive(false);
                } else {
                    const student = data.studentDtoSet.filter(
                        (student) => student.email == user.email
                    )[0];
                    if (student && student.id == data.leaderId) {
                        setReportType((reportType) => {
                            return reportType.concat({
                                value: 1,
                                content: 'Cycle report',
                            });
                        });
                    }
                    setPicked(true);
                    // loadOverlay.setActive(false);
                    getReports();
                }
            } else {
                error('An error occurred');
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const pickTopic = (topic) => {
        console.log(classId);
        put(`/projects/${topic.id}`, {}, { params: { classId } })
            .then((res) => {
                if (res.data.code == 200) {
                    setPicked(true);
                    success(`Choose project successfully!`);
                } else {
                    error('An error occurred while picking project. Please try agian');
                }
            })
            .catch(() => {
                error('An error occurred while picking project. Please try agian');
            });
    };

    const viewTopic = (item) => {
        try {
            const raw = convertFromRaw(JSON.parse(item.requirements));
            setTopicState(EditorState.createWithContent(raw));
        } catch (err) {
            setTopicState(EditorState.createEmpty());
        }
    };

    const unPickError = () => {
        if (!isPicked) {
            error("Your leader hasn't picked a project yet");
        }
    };

    const toggleModal = () => {
        setConfirmOpen((e) => !e);
    };

    const unEnroll = () => {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/classes/${classId}/groups/leave`, {
                headers: { Authorization: `${localStorage.getItem('token')}` },
            })
            .then((res) => {
                if (res.data.code == 200) {
                    success('Unenroll success');
                    navigate(`/class/${classId}`);
                }
            });
    };

    return (
        <StudentViewContainer>
            <SubmitEdtior
                setOpen={setCycleOpen}
                isOpen={cycleOpen}
                type="cycle"
                groupId={groupId}
            />
            <SubmitEdtior
                setOpen={setProgressOpen}
                isOpen={progressOpen}
                type="progress"
                groupId={groupId}
            />
            <Container>
                {list.length ? (
                    <TableContainer>
                        <FeedBack list={list} setList={setList} progress={progress} />
                    </TableContainer>
                ) : (
                    <NeResultContainer>
                        <NoResult>
                            <h2>You have no reports</h2>
                        </NoResult>
                    </NeResultContainer>
                )}
                <TopicList
                    isOpen={isTopicOpen}
                    avatars={['TP', 'NK', 'TN', 'TT', 'NH']}
                    editorState={topicState}
                    topicList={topicList}
                    viewTopic={viewTopic}
                    pickTopic={pickTopic}
                    closeFn={() => setTopicOpen(false)}
                    setTopicState={setTopicState}
                />
                <SideBar>
                    <Selection
                        disable={!isPicked}
                        options={reportType}
                        placeholder="Write Report"
                        fixed
                        reset={true}
                        onChange={onChange}
                        onClick={unPickError}
                    />
                    <Calendar onChange={calendarChange} />
                    <StyledH4>
                        UP COMMING TASKS <Round>{events.length}</Round>
                    </StyledH4>
                    <CommingContainer>
                        {events.map(({ icon, title, status, time, id }) => (
                            <CommingSection key={id}>
                                <Icon>{icon}</Icon>
                                <RightSide>
                                    <CommingTitle>{title}</CommingTitle>
                                    <Status status={status}>{time}</Status>
                                </RightSide>
                            </CommingSection>
                        ))}
                    </CommingContainer>
                    <ConfirmModal
                        isOpen={confirmOpen}
                        setIsOpen={setConfirmOpen}
                        action={unEnroll}
                    />
                    <ExitButton onClick={toggleModal}>UNENROLL FROM CLASS</ExitButton>
                </SideBar>
            </Container>
        </StudentViewContainer>
    );
};

export default StudentView;

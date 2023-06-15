import React, { useState, useEffect } from 'react';

import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import moment from 'moment';

import {
    Calendar,
    DraftEditor,
    Overlay,
    Avatars,
    Button,
    CreateMeetingForm,
    AdvanceEditor,
    Table,
    Row,
    TableHeader,
} from '../../components';
import { get, put } from '../../utils/request';
import { COLOR } from '../../utils/style';
import { error, success } from '../../utils/toaster';
import {
    Container,
    Title,
    SideBar,
    CommingContainer,
    TableContainer,
    Icon,
    CommingSection,
    RightSide,
    StyledH4,
    CommingTitle,
    GoalContainer,
    Status,
    Round,
    FeedBackView,
    FeedBackContainer,
    ScoreBar,
    GoalCounter,
    GoalDes,
    SendBtn,
    Type,
    StatusBar,
} from './style';

import AddIcon from '@mui/icons-material/Add';
import AssignmentIcon from '@mui/icons-material/Assignment';

const TextEditor = ({ report, close, progress }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [viewState, setViewState] = useState(EditorState.createEmpty());
    const [mark, setMark] = useState(0);

    useEffect(() => {
        if (report) {
            try {
                setEditorState(
                    report.content
                        ? EditorState.createWithContent(convertFromRaw(JSON.parse(report.feedback)))
                        : EditorState.createEmpty()
                );
            } catch (err) {
                setEditorState(EditorState.createEmpty());
            }
            try {
                setViewState(
                    report.content
                        ? EditorState.createWithContent(convertFromRaw(JSON.parse(report.content)))
                        : EditorState.createEmpty()
                );
            } catch (err) {
                setViewState(EditorState.createEmpty());
            }
        }
    }, [report]);

    const onMarkChange = (e) => {
        setMark(e.target.value);
    };

    const sendFeedback = () => {
        const API =
            report.type == 'cycle' ? '/cycle-reports/feedback' : '/progress-reports/feedback';
        put(
            API,
            {
                feedback: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
                groupId: parseInt(report.groupId),
                mark: parseInt(mark),
                reportId: parseInt(report.id),
            },
            {}
        )
            .then((res) => {
                if (res.data.code == 200) {
                    success('Feedback success');
                } else {
                    error('Feedback error');
                }
            })
            .catch(() => {
                error('An error occured while processing feedback');
            });
    };

    return (
        <Overlay isOpen={report.isOpen} fullFill={true}>
            <AdvanceEditor
                closeFn={close}
                editorState={viewState}
                setEditorState={setViewState}
                avatars={['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']}
                readOnly
                headColor={report && report.type == 'cycle' ? COLOR.blue[0] : COLOR.green[0]}
            >
                <GoalContainer>
                    <GoalDes>Report Title</GoalDes>
                    <span>{report.title}</span>
                </GoalContainer>

                {report.type == 'cycle' && (
                    <>
                        <FeedBackContainer>
                            <GoalDes>Reports Stats:</GoalDes>
                            <StatusBar progress={[report.cycleNumber, progress]} />
                            <GoalCounter>
                                <span>{report.cycleNumber}</span> / {progress}
                            </GoalCounter>
                            <GoalDes>Reports Feedback:</GoalDes>
                            <FeedBackView>
                                <DraftEditor
                                    id={`feedback_${report.groupId}_${report.type}`}
                                    placeholder="Write your feedback..."
                                    editorState={editorState}
                                    setEditorState={setEditorState}
                                />
                            </FeedBackView>
                            <GoalCounter>Cycle Reports need to be feedback</GoalCounter>
                            <GoalDes>Reports Score:</GoalDes>
                            <ScoreBar placeholder="Score" value={mark} onChange={onMarkChange} />
                            <GoalCounter>Cycle Reports need to be scored</GoalCounter>
                        </FeedBackContainer>
                    </>
                )}
                {report.type == 'cycle' ? (
                    <SendBtn onClick={sendFeedback}>Send Feedback</SendBtn>
                ) : null}
            </AdvanceEditor>
        </Overlay>
    );
};

const TopicPickedView = ({ list, setList, progress }) => {
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
                    <td>Type</td>
                    <td>Report Title</td>
                    <td>Report Time</td>
                    <td>Write by</td>
                </TableHeader>
                {list &&
                    list.map((item) => (
                        <React.Fragment key={item.displayId}>
                            <TextEditor
                                report={item}
                                close={() => close(item)}
                                progress={progress}
                            />
                            <Row feedback={item.type} onClick={() => open(item)}>
                                <td>
                                    <Type type={item.type}>
                                        {item.type == 'cycle' ? 'Cycle Report' : 'Progress Report'}
                                    </Type>
                                </td>
                                <td>
                                    <Title>{item.title}</Title>
                                </td>
                                <td>
                                    <Title>{item.reportTime}</Title>
                                </td>
                                <td>
                                    <Avatars list={['TP', 'NK', 'TN', 'TT', 'NH']} />
                                </td>
                            </Row>
                        </React.Fragment>
                    ))}
            </tbody>
        </Table>
    );
};

const LecturerView = ({ groupId, classId }) => {
    const [events, setEvents] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [form, setForm] = useState({
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm'),
        groupId: groupId,
        link: '',
        scheduleTime: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}:00.000`,
        title: '',
    });
    const [progress, setProgress] = useState(0);
    const [list, setList] = useState([]);

    const getReports = () => {
        get('/cycle-reports', { groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => ({
                            ...data,
                            type: 'cycle',
                            displayId: 'cycle' + data.id,
                            isOpen: false,
                        }))
                    )
                );
            }
        });
        get('/progress-reports', { classId, groupId }).then((res) => {
            if (res.data.code == 200) {
                setList((list) =>
                    list.concat(
                        res.data.data.map((data) => ({
                            ...data,
                            type: 'progress',
                            displayId: 'progress' + data.id,
                            isOpen: false,
                        }))
                    )
                );
            }
        });
    };

    useEffect(() => {
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
        getReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const closeFn = () => {
        setOpen(false);
    };

    const onDateChange = (date) => {
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
                    date: moment(event.scheduleTime).format('YYYY-MM-DD'),
                    title: event.title,
                    isAdd: false,
                    status: moment(event.scheduleTime).fromNow(),
                    time: moment(event.scheduleTime).fromNow(),
                    ...event,
                }));
                setEvents(data);
            }
        });
    };

    const openModal = () => {
        setOpen(() => {
            setForm({
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm'),
                groupId: groupId,
                link: '',
                scheduleTime: `${moment().format('YYYY-MM-DD')} ${moment().format('HH:mm')}:00.000`,
                title: '',
                isAdd: true,
            });
            return true;
        });
    };

    const openUpdate = (event) => {
        console.log(event.scheduleTime);
        setOpen(() => {
            setForm({
                id: event.id,
                date: moment(event.scheduleTime).format('YYYY-MM-DD'),
                time: moment(event.scheduleTime).format('HH:mm'),
                groupId: groupId,
                link: event.link,
                feedback: '',
                scheduleTime: `${moment(event.scheduleTime).format('YYYY-MM-DD')} ${moment(
                    event.scheduleTime
                ).format('HH:mm')}:00.000`,
                title: event.title,
                isAdd: false,
            });
            return true;
        });
    };

    return (
        <>
            <CreateMeetingForm
                showing={isOpen}
                setForm={setForm}
                closeFn={closeFn}
                groupId={groupId}
                form={form}
                setEvents={setEvents}
            />
            <Container>
                <TableContainer>
                    <TopicPickedView list={list} setList={setList} progress={progress} />
                </TableContainer>
                <SideBar>
                    <Calendar onChange={onDateChange} />
                    <StyledH4>
                        UP COMMING TASKS <Round>{events.length}</Round>
                    </StyledH4>
                    <CommingContainer>
                        {events.map((event, index) => (
                            <CommingSection key={index} onClick={() => openUpdate(event)}>
                                <Icon>{event.icon}</Icon>
                                <RightSide>
                                    <CommingTitle>{event.title}</CommingTitle>
                                    <Status>{event.status}</Status>
                                </RightSide>
                            </CommingSection>
                        ))}
                        <Button icon={<AddIcon />} onClick={openModal} />
                    </CommingContainer>
                </SideBar>
            </Container>
        </>
    );
};

export default LecturerView;

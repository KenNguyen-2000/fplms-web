import { useState } from 'react';

import axios from 'axios';
import moment from 'moment';

import { COLOR } from '../../utils/style';
import { error, success } from '../../utils/toaster';
import Overlay from '../Overlay';
import { Spinner } from '../Spinner';
import {
    Container,
    StyledHeader,
    StyledJumbotron,
    Title,
    SubTitle,
    Col,
    Row,
    StyledInput,
    StyledBody,
    StyledButton,
} from './style';

import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';

const CreateMeetingForm = ({ showing, closeFn, groupId, form, setForm, setEvents }) => {
    const [isLoad] = useState(false);

    const [disable, setDisable] = useState(false);

    const submit = () => {
        console.log(form);

        if (disable) return;

        setDisable(true);

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/meetings';
        if (form.isAdd) {
            axios
                .post(
                    API,
                    {
                        groupId: parseInt(groupId),
                        link: form.link,
                        scheduleTime: `${form.date} ${form.time}:00.000`,
                        title: form.title,
                    },
                    { headers: header }
                )
                .then((res) => {
                    if (res.data.code == 200) {
                        success(`Create meeting successfully!`);
                        setDisable(false);
                        closeFn();
                        setEvents((events) => {
                            return events.concat({
                                ...res.data.data,
                                icon: <AssignmentIcon />,
                                status: moment(res.data.data.scheduleTime).fromNow(),
                            });
                        });
                    } else {
                        error(res.data.message);
                        setDisable(false);
                        closeFn();
                    }
                })
                .catch(() => {
                    error(`An error occured!`);
                    setDisable(false);
                    closeFn();
                });
        } else {
            axios
                .put(
                    API,
                    {
                        ...form,
                        groupId: parseInt(groupId),
                    },
                    { headers: header }
                )
                .then((res) => {
                    if (res.data.code == 200) {
                        success(`Update meeting successfully!`);
                        setDisable(false);
                        closeFn();
                    } else {
                        error(res.data.message);
                        setDisable(false);
                        closeFn();
                    }
                })
                .catch(() => {
                    error(`An error occured!`);
                    setDisable(false);
                    closeFn();
                });
        }
    };

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
        });
    };

    const handleDateChange = (e) => {
        setForm({
            ...form,
            date: e.target.value,
        });
    };

    const handleTimeChange = (e) => {
        setForm({
            ...form,
            time: e.target.value,
        });
    };

    return (
        <Overlay isOpen={showing} closeFn={closeFn}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>{form.isAdd ? 'CREATE NEW MEETING' : 'UPDATE MEETING'}</Title>
                        <SubTitle>{form.isAdd ? 'New Meeting' : 'Update Meeting'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={closeFn} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Title</small>
                            <StyledInput
                                type="text"
                                placeholder="Meeting Title"
                                defaultValue={form.isAdd ? form.title : ''}
                                onChange={(e) => {
                                    handleChange(e, 'title');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Meeting url</small>
                            <StyledInput
                                type="url"
                                placeholder="Meeting Link"
                                defaultValue={form.isAdd ? form.link : ''}
                                onChange={(e) => {
                                    handleChange(e, 'link');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Date</small>
                            <StyledInput
                                type="date"
                                value={form.date}
                                onChange={(e) => {
                                    handleDateChange(e);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Time</small>
                            <StyledInput
                                type="time"
                                value={form.time}
                                onChange={(e) => {
                                    handleTimeChange(e);
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit}>
                                {disable || isLoad ? (
                                    <Spinner radius={24} color={COLOR.primary02} />
                                ) : form.isAdd ? (
                                    'CREATE MEETING'
                                ) : (
                                    'UPDATE MEETING'
                                )}
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateMeetingForm;

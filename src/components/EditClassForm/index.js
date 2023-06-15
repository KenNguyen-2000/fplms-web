import { useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
import Overlay from '../Overlay';
import Selection from '../Selection';
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

import CloseIcon from '@mui/icons-material/Close';

const EditClassForm = ({ showing, setCreate, classItem }) => {
    const [form, setForm] = useState({
        id: classItem.id,
        enrollKey: '',
        name: '',
        subjectId: 1,
        semester: 'SPRING',
    });

    const close = () => {
        setCreate(false);
    };

    const [disable, setDisable] = useState(false);

    const handleChange = (e, field, parser = String) => {
        setForm({
            ...form,
            [field]: parser(e.target.value),
        });
    };

    const update = () => {
        setDisable(true);
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/classes';

        axios
            .put(API, form, {
                headers: header,
            })
            .then((res) => {
                const data = res.data;
                if (data.code == 200) {
                    setDisable(false);
                    success(`Class ${form.name} created successfully`);
                    close();
                } else {
                    error(data.message);
                }
            })
            .catch(() => {
                error(`An error occured!`);
                setDisable(false);
            });
    };

    const handleSelection = (val) => {
        setForm({
            ...form,
            subjectId: val.value,
        });
    };

    const [subjects] = useState([
        {
            value: 1,
            content: 'OSG202',
        },
        {
            value: 2,
            content: 'PRN211',
        },
        {
            value: 3,
            content: 'SWP391',
        },
        {
            value: 4,
            content: 'SWR302',
        },
        {
            value: 5,
            content: 'SWT301',
        },
        {
            value: 6,
            content: 'PRJ301',
        },
        {
            value: 7,
            content: 'DBI202',
        },
    ]);

    const [semester] = useState([
        {
            value: 1,
            content: 'Spring',
        },
        {
            value: 2,
            content: 'Summer',
        },
        {
            value: 3,
            content: 'Fall',
        },
        {
            value: 4,
            content: 'Winter',
        },
    ]);

    return (
        <Overlay showing={showing} setOpen={setCreate}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>CREATE NEW CLASS</Title>
                        <SubTitle>{form.name || 'Course name'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <small>Classname</small>
                            <StyledInput
                                placeholder={classItem.className}
                                onChange={(e) => {
                                    handleChange(e, 'name');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Enroll Key</small>
                            <StyledInput
                                type="text"
                                placeholder={classItem.enrollKey}
                                onChange={(e) => {
                                    handleChange(e, 'enrollKey');
                                }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Subject Code</small>
                            <Selection
                                options={subjects}
                                placeholder="Subject Code"
                                onChange={handleSelection}
                            />
                        </Col>
                        <Col>
                            <small>Semester</small>
                            <Selection
                                options={semester}
                                placeholder="Semester"
                                onChange={handleSelection}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={update} disable={disable}>
                                Create Class
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default EditClassForm;

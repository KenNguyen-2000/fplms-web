import { useState, useEffect } from 'react';

import axios from 'axios';

import { get } from '../../utils/request';
import { COLOR } from '../../utils/style';
import { error, success } from '../../utils/toaster';
import Selection from '../Selection';
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
    DataHeader,
    Error,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateClassForm = ({ setCreate, setClass }) => {
    const [form, setForm] = useState({
        cycleDuration: 7,
        name: '',
        enrollKey: '',
        subjectId: 1,
        semesterCode: 0,
        join: true,
    });

    const [isLoad, setLoad] = useState(true);
    const [subjects, setSubjects] = useState([]);

    const [validError, setError] = useState({
        name: '',
        enrollKey: '',
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

    const submit = () => {
        let errors = 0;

        if (disable) return;

        if (form.enrollKey.trim().length < 3) {
            setError((err) => ({ ...err, enrollKey: 'Enroll Key length must be longer than 3!' }));
            errors++;
        } else {
            setError((err) => ({ ...err, enrollKey: '' }));
        }

        if (form.name.trim().length < 5) {
            setError((err) => ({ ...err, name: 'Class Name length must be longer than 5!' }));
            errors++;
        } else {
            setError((err) => ({ ...err, name: '' }));
        }

        if (errors > 0) return;

        setDisable(true);

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        const API = process.env.REACT_APP_API_URL + '/classes';

        axios
            .post(API, form, {
                headers: header,
            })
            .then((res) => {
                const data = res.data;
                if (data.code == 200) {
                    setClass((classes) =>
                        classes.concat({
                            id: data.data,
                            name: form.name,
                            semester: form.semester,
                            enrollKey: form.enrollKey,
                            subjectId: form.subjectId,
                            semesterCode: form.semesterCode,
                            join: false,
                        })
                    );
                    success(`Class ${form.name} created successfully`);
                    close();
                } else {
                    error(data.message);
                }
                setDisable(false);
            })
            .catch(() => {
                error(`An error occured!`);
                setDisable(false);
            });
    };

    const handleSelection = (field, e) => {
        setForm({
            ...form,
            [field]: e.value,
        });
    };

    const [semester, setSemester] = useState([]);

    useEffect(() => {
        const sems = get('/semesters');
        const subs = get('/subjects');
        Promise.all([sems, subs]).then(([sems, subs]) => {
            if (Array.isArray(sems.data.data))
                setSemester(
                    sems.data.data.map((semester) => ({
                        value: semester.code,
                        content: semester.code,
                    }))
                );
            if (Array.isArray(subs.data.data))
                setSubjects(
                    subs.data.data.map((subject) => ({
                        value: subject.id,
                        content: subject.name,
                    }))
                );
            if (sems.data.code == 200 && subs.data.code == 200) setLoad(false);
        });
    }, []);

    return (
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
                        <DataHeader>
                            <small>Classname</small>
                            <Error>{validError.name}</Error>
                        </DataHeader>
                        <StyledInput
                            placeholder="Software Development"
                            onChange={(e) => {
                                handleChange(e, 'name');
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <DataHeader>
                            <small>Enroll Key</small>
                            <Error>{validError.enrollKey}</Error>
                        </DataHeader>
                        <StyledInput
                            placeholder="123456"
                            type="password"
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
                            onChange={(e) => handleSelection('subjectId', e)}
                            maxHeight="200px"
                            isLoad={isLoad}
                        />
                    </Col>
                    <Col>
                        <small>Semester</small>
                        <Selection
                            options={semester}
                            placeholder="Semester"
                            isLoad={isLoad}
                            maxHeight="200px"
                            onChange={(e) => handleSelection('semesterCode', e)}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <StyledButton onClick={submit}>
                            {disable || isLoad ? (
                                <Spinner radius={24} color={COLOR.primary02} />
                            ) : (
                                'CREATE CLASS'
                            )}
                        </StyledButton>
                    </Col>
                </Row>
            </StyledBody>
        </Container>
    );
};

export default CreateClassForm;

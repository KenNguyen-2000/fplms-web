import { useState, useEffect } from 'react';

import { COLOR } from '../../utils/style';
import Overlay from '../Overlay';
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
    Textarea,
} from './style';

import CloseIcon from '@mui/icons-material/Close';

const CreateTopicForm = ({ showing, item, setOpen, save, disable, subjects }) => {
    const [form, setForm] = useState({
        actor: '',
        context: '',
        name: '',
        problem: '',
        requirements: '',
        subjectId: 0,
        theme: '',
        ...item,
    });

    useEffect(() => {
        setForm({
            ...form,
            name: item?.name || '',
            requirements: item?.requirements || '',
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [item?.id]);

    const submit = () => {
        save(item?.id, form);
    };
    const close = () => {
        setOpen(false);
    };

    const changeHandler = (field, e) => {
        setForm({
            ...form,
            [field]: e.target.value,
        });
    };

    const onSelectSubject = (e) => {
        setForm({
            ...form,
            subjectId: e.value,
        });
    };

    return (
        <Overlay isOpen={showing}>
            <Container>
                <StyledHeader>
                    <StyledJumbotron>
                        <Title>TOPIC UPDATE</Title>
                        <SubTitle>{form.name || 'Untitled'}</SubTitle>
                    </StyledJumbotron>
                    <CloseIcon onClick={close} />
                </StyledHeader>
                <StyledBody>
                    <Row>
                        <Col>
                            <DataHeader>
                                <small>Topic name</small>
                                <Error></Error>
                            </DataHeader>
                            <StyledInput
                                placeholder="Topic name"
                                value={form.name}
                                onChange={(e) => changeHandler('name', e)}
                            />
                        </Col>
                        <Col>
                            <DataHeader>
                                <small>Context</small>
                                <Error></Error>
                            </DataHeader>
                            <StyledInput
                                placeholder="Context"
                                onChange={(e) => changeHandler('context', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <small>Subject</small>
                            <Selection
                                options={subjects.slice(1)}
                                onChange={onSelectSubject}
                                placeholder="Pick a subject"
                            ></Selection>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <DataHeader>
                                <small>Requirement</small>
                                <Error></Error>
                            </DataHeader>
                            <Textarea
                                maxRows={14}
                                minRows={7}
                                aria-label="maximum height"
                                placeholder="Project Requirement"
                                defaultValue={item?.requirements}
                                style={{ width: '100%' }}
                                onChange={(e) => changeHandler('requirements', e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <StyledButton onClick={submit} disable={disable}>
                                {disable ? (
                                    <Spinner radius={32} color={COLOR.primary02} />
                                ) : (
                                    'SAVE TOPIC'
                                )}
                            </StyledButton>
                        </Col>
                    </Row>
                </StyledBody>
            </Container>
        </Overlay>
    );
};

export default CreateTopicForm;

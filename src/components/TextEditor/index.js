import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { useNavigate } from 'react-router-dom';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
import Selection from '../Selection';
import { Container, SubTitle, Wrapper, TitleBlock, Title, CreateBtn } from './style';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const TextEditor = () => {
    const [editorState, setEditorState] = useState({
        editorState: EditorState.createEmpty(),
    });
    const [isLoading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [subjects, setSubjects] = useState();
    const [title, setTitle] = useState('');
    const [subjectName, setSubjectName] = useState();
    const navigate = useNavigate();
    const editor = useRef(null);
    const questionId = new URLSearchParams(location.search).get('id');
    const URL = process.env.REACT_APP_DISCUSSION_URL + `/questions`;
    const header = {
        Authorization: `${localStorage.getItem('token')}`,
    };

    const focus = () => {
        console.log(editor.current);
    };

    useEffect(() => {
        const getSubjects = () => {
            const URL = process.env.REACT_APP_DISCUSSION_URL + `/subjects`;
            axios
                .get(URL, { headers: header })
                .then((res) => {
                    const datas = res.data.map((item) => ({
                        value: item.id,
                        content: item.name,
                    }));
                    setSubjects(datas);
                })
                .catch((err) => {
                    error(err);
                    return;
                });
        };
        getSubjects();
        if (questionId != null) {
            const URL = process.env.REACT_APP_DISCUSSION_URL + `/questions/${questionId}`;
            const header = {
                Authorization: `${localStorage.getItem('token')}`,
            };
            const getQuestion = () => {
                axios
                    .get(URL, {
                        headers: header,
                    })
                    .then((res) => {
                        if (res.status >= 200 && res.status < 300) {
                            setTitle(res.data.title);
                            setSubjectName(res.data.subject.name);
                            setEditorState({
                                editorState: EditorState.createWithContent(
                                    convertFromRaw(JSON.parse(res.data.content))
                                ),
                            });
                        } else {
                            error(`An error occured!`);
                        }
                    })
                    .catch((err) => error(err));
            };

            getQuestion();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onEditorStateChange = (editorState) => {
        setEditorState({
            editorState,
        });
        setContent(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    };

    const handleAddQuestion = () => {
        setLoading(true);
        axios
            .post(
                URL,
                {
                    title: title,
                    content: content,
                    subjectName: subjectName.content,
                },
                { headers: header }
            )
            .then((res) => {
                setLoading(false);
                if (res.status >= 200 && res.status < 400) {
                    success(`Create question successfully!`);
                    navigate('/discussion-list');
                } else {
                    error(res.message);
                }
            })
            .catch(() => {
                setLoading(false);
                error(`An error occured!`);
            });
    };

    const handleEditQuestion = () => {
        setLoading(true);
        axios
            .put(
                URL + `/${questionId}`,
                {
                    title: title,
                    subjectName: subjectName.content,
                    content: content,
                },
                { headers: header }
            )
            .then(() => {
                setLoading(false);
                navigate('/discussion-list');
            })
            .catch(() => {
                setLoading(false);
                error(`An error occured!`);
            });
    };

    return (
        <Container>
            <div>
                <Title sz={'28px'} mg={`0 0 20px 20px`}>
                    Adding new question
                </Title>
                <Wrapper>
                    <Title>Title</Title>
                    <SubTitle>Main idea of the question which it describes for</SubTitle>
                    {questionId != null ? (
                        <TitleBlock
                            value={title || ''}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    ) : (
                        <TitleBlock
                            placeholder={'A title will briefly describe the issue'}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    )}
                    <Title>Subject</Title>
                    <div style={{ width: 'fit-content' }}>
                        <Selection
                            options={subjects || [{}]}
                            placeholder={subjectName || 'Subject'}
                            onChange={setSubjectName}
                        />
                    </div>
                    <Title>Body</Title>
                    <SubTitle>Describe the issue</SubTitle>
                    <div className="editor" onClick={focus}>
                        <Editor
                            editorState={editorState.editorState}
                            toolbar={{
                                inline: { inDropdown: true },
                                list: { inDropdown: true },
                                textAlign: { inDropdown: true },
                                link: { inDropdown: true },
                                history: { inDropdown: true },
                            }}
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            onEditorStateChange={onEditorStateChange}
                            ref={editor}
                        />
                    </div>
                </Wrapper>
                {questionId == null ? (
                    <CreateBtn onClick={handleAddQuestion} isLoading={isLoading}>
                        <ButtonLoader isLoading={isLoading} />
                        <span>CREATE QUESTION</span>
                    </CreateBtn>
                ) : (
                    <CreateBtn
                        style={{ justifyContent: 'center' }}
                        onClick={handleEditQuestion}
                        isLoading={isLoading}
                    >
                        <ButtonLoader isLoading={isLoading} />
                        <span>SAVE</span>
                    </CreateBtn>
                )}
            </div>
        </Container>
    );
};

export default TextEditor;

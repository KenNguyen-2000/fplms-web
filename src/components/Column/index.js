/* eslint-disable no-unused-vars */

/* eslint-disable prettier/prettier */
import { useState, useRef } from 'react';

import axios from 'axios';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

import interceptor from '../../routes/interceptor';
import { fromHTML } from '../../utils/draft';
import { success, error } from '../../utils/toaster';
import AdvanceEditor from '../AdvanceEditor';
import Overlay from '../Overlay';
import Selection from '../Selection';
import Skeleton from '../Skeleton';
import {
    Container,
    Header,
    Item,
    DropContainer,
    ItemContainer,
    Title,
    Footer,
    DetailText,
    DropableContainer,
    SendBtn,
    GoalContainer,
    GoalDes,
    ScoreBar,
} from './style';

import AddIcon from '@mui/icons-material/Add';

const header = {
    Authorization: `${localStorage.getItem('token')}`,
};

const TEMPLATE = '<b>(Project has no requirement)</b>';

const Column = ({ list, droppableId, name, type, setColumns, subjects, semesters }) => {
    const [isScroll] = useState(false);
    const ref = useRef();
    const [isOpen, setOpen] = useState(false);
    const [title, setTitle] = useState();
    const [item, setItem] = useState({});
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const saveItem = (id, newId) => {
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((item) => item.id === id);
            clone[index].needAdd = false;
            if (newId) clone[index].id = newId;
            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: clone,
                },
            };
        });
    };

    const save = () => {
        setColumns((col) => {
            const clone = col[droppableId].items;
            const index = clone.findIndex((_item) => _item.id === item.id);
            clone[index] = {
                ...clone[index],
            };
            clone[index].name = title || 'Untitled';
            clone[index].requirements =
                JSON.stringify(convertToRaw(editorState.getCurrentContent())) ||
                JSON.stringify(convertToRaw(fromHTML(TEMPLATE)));
            clone[index].subjectId = item.subjectId;

            const API = '/management/projects';

            const req = {
                actors: 'string',
                context: '',
                name: title,
                problem: '',
                requirements: clone[index].requirements,
                subjectId: item.subjectId,
                semesterCode: item.semesterCode,
                theme: 'string',
                id: item.id,
            };

            if (item.needAdd) {
                delete req.id;
            }

            interceptor[item.needAdd ? 'post' : 'put'](API, req)
                .then((res) => {
                    const data = res.data;
                    if (data.code == 200) {
                        // setProjects((projects) => projects.concat(clone[index]));
                        success(`Topic \`${item.name}\` ${item.needAdd ? 'added' : 'updated'}`);
                        saveItem(item.id, item.needAdd ? data.data : null);
                        setOpen(false);
                    } else {
                        error(data.message);
                        setOpen(false);
                    }
                })
                .catch(() => {
                    error(`Topic \`${item.name}\` save error`);
                });

            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: clone,
                },
            };
        });
    };

    const add = () => {
        setColumns((col) => {
            return {
                ...col,
                [droppableId]: {
                    ...col[droppableId],
                    items: [
                        ...col[droppableId].items,
                        {
                            id: uuidv4(),
                            requirements: JSON.stringify(convertToRaw(fromHTML(TEMPLATE))),
                            name: `Topic title`,
                            subjectId: 1,
                            needAdd: true,
                        },
                    ],
                },
            };
        });
    };

    const change = (e, field) => {
        setItem((item) => ({
            ...item,
            [field]: e.value,
        }));
    };

    return (
        <>
            <Overlay isOpen={isOpen} fullFill={true}>
                <AdvanceEditor
                    avatars={[]}
                    editorState={editorState}
                    setEditorState={setEditorState}
                    closeFn={() => setOpen(false)}
                >
                    <GoalContainer>
                        <GoalDes>Topic Title</GoalDes>
                        <ScoreBar
                            placeholder={"Topic's Title"}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </GoalContainer>
                    <GoalContainer>
                        <GoalDes>Subject</GoalDes>
                        <Selection
                            onChange={(e) => change(e, 'subjectId')}
                            options={subjects.slice(1)}
                            placeholder={
                                subjects.reduce((pre, cur) => {
                                    pre[cur.value] = cur.content;
                                    return pre;
                                }, [])[item.subjectId] || null
                            }
                        />
                        <GoalDes>Semester</GoalDes>
                        <Selection
                            onChange={(e) => change(e, 'semesterCode')}
                            options={semesters.slice(1)}
                            placeholder={
                                semesters.reduce((pre, cur) => {
                                    pre[cur.value] = cur.content;
                                    return pre;
                                }, [])[item.semesterCode] || 'Pick a semester'
                            }
                        />
                    </GoalContainer>
                    <SendBtn onClick={save}>Save Topic</SendBtn>
                </AdvanceEditor>
            </Overlay>
            <Container type={type}>
                <Header isScroll={isScroll}>
                    {name} - {list.length} topics
                </Header>
                <DropableContainer>
                    <Droppable droppableId={droppableId}>
                        {(provided, snapshot) => (
                            <DropContainer
                                onScroll={scroll}
                                {...provided.droppableProps}
                                ref={(div) => {
                                    ref.current = div;
                                    provided.innerRef(div);
                                }}
                                isDragging={snapshot.isDragging}
                            >
                                {list.map((item, index) => (
                                    <Draggable
                                        key={item.id}
                                        draggableId={item.id + ''}
                                        index={index}
                                    >
                                        {(provided, snapshot) => (
                                            <ItemContainer
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    pointerEvents:
                                                        item.onLoad == -1 ? 'none' : 'auto',
                                                }}
                                            >
                                                <Item
                                                    isDragging={snapshot.isDragging}
                                                    onDoubleClick={() => {
                                                        setOpen(() => {
                                                            setItem((_item) => ({
                                                                ..._item,
                                                                ...item,
                                                            }));
                                                            setTitle(item.name || '');
                                                            try {
                                                                setEditorState(
                                                                    item.requirements
                                                                        ? EditorState.createWithContent(
                                                                              convertFromRaw(
                                                                                  JSON.parse(
                                                                                      item.requirements
                                                                                  )
                                                                              )
                                                                          )
                                                                        : EditorState.createEmpty()
                                                                );
                                                            } catch (err) {
                                                                setEditorState(
                                                                    EditorState.createEmpty()
                                                                );
                                                            }
                                                            return true;
                                                        });
                                                    }}
                                                >
                                                    {item.subjectId ? (
                                                        <DetailText>
                                                            {
                                                                subjects.reduce((pre, cur) => {
                                                                    pre[cur.value] = cur.content;
                                                                    return pre;
                                                                }, [])[item.subjectId]
                                                            }
                                                        </DetailText>
                                                    ) : (
                                                        <Skeleton style={{ padding: '0.5rem' }} />
                                                    )}
                                                    {item.needAdd ? (
                                                        <DetailText red>UNSAVED</DetailText>
                                                    ) : null}
                                                    <Title>
                                                        {item.name || (
                                                            <Skeleton
                                                                style={{
                                                                    width: `40ch`,
                                                                }}
                                                            />
                                                        )}
                                                    </Title>
                                                </Item>
                                            </ItemContainer>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </DropContainer>
                        )}
                    </Droppable>
                </DropableContainer>
                <Footer onClick={add}>
                    <AddIcon /> Add topic
                </Footer>
            </Container>
        </>
    );
};

export default Column;

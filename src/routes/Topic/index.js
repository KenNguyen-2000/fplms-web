import { useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import { Column, Selection } from '../../components';
import { get } from '../../utils/request';
import { Container, SelectContainer, Header } from './style';

const Topic = () => {
    const [projects, setProjects] = useState(
        new Array(10).fill('').map((i, k) => ({
            actors: null,
            context: null,
            id: k,
            name: null,
            problem: null,
            requirements: null,
            semesterCode: null,
            subjectId: null,
            theme: null,
            onLoad: -1,
        }))
    );
    const [isLoad, setLoad] = useState(true);
    const [subjects, setSubjects] = useState([
        {
            value: -1,
            content: 'All Subjects',
        },
    ]);
    const [semesters, setSemesters] = useState([
        {
            value: -1,
            content: 'All Semesters',
        },
    ]);
    const [filter, setFilter] = useState({
        subject: {
            value: -1,
            content: 'All Subjects',
        },
        semester: {
            value: -1,
            content: 'All Semesters',
        },
    });
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const subjects = get('/subjects');
        const projects = get('/projects');
        const semester = get('/semesters');

        Promise.all([subjects, projects, semester]).then(([subjects, projects, semester]) => {
            subjects = subjects.data;
            projects = projects.data;
            semester = semester.data;
            if (subjects.code == 200) {
                setSubjects((subs) =>
                    subs.concat(subjects.data.map(({ id, name }) => ({ value: id, content: name })))
                );
            }
            if (semester.code == 200) {
                setSemesters((sems) =>
                    sems.concat(
                        semester.data.map((semester) => ({
                            value: semester.code,
                            content: semester.code,
                        }))
                    )
                );
            }
            if (projects.code == 200) {
                setProjects(projects.data);
            } else {
                setProjects([]);
            }
            setLoad(false);
        });
    }, []);

    useEffect(() => {
        setColumns((col) => ({
            ...col,
            all: {
                name: `${filter.subject.content} of ${filter.semester.content}`,
                items: (() => {
                    let list = projects;
                    console.log(list);
                    if (filter.semester.value != -1) {
                        list = list.filter(
                            (project) => project.semesterCode == filter.semester.value
                        );
                    }
                    if (filter.subject.value != -1) {
                        list = list.filter((project) => project.subjectId == filter.subject.value);
                    }
                    return list;
                })(),
                type: 1,
            },
        }));
    }, [projects, filter]);

    const onSelectionChange = (e, key) => {
        setFilter({
            ...filter,
            [key]: e,
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            const sourceCol = columns[source.droppableId];
            const destCol = columns[destination.droppableId];
            const sourceItems = [...sourceCol.items];
            const destItems = [...destCol.items];

            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceItems,
                },
                [destination.droppableId]: {
                    ...destCol,
                    items: destItems,
                },
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems,
                },
            });
        }
    };

    return (
        <>
            <Container>
                <Header>
                    <SelectContainer>
                        <Selection
                            options={subjects}
                            placeholder="Subject"
                            onChange={(e) => onSelectionChange(e, 'subject')}
                            maxHeight="200px"
                            isLoad={isLoad}
                        />
                    </SelectContainer>
                    <SelectContainer>
                        <Selection
                            options={semesters}
                            placeholder="Semesters"
                            onChange={(e) => onSelectionChange(e, 'semester')}
                            maxHeight="200px"
                            isLoad={isLoad}
                        />
                    </SelectContainer>
                </Header>
                <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                    {Object.entries(columns).map(([id, data]) => (
                        <Column
                            type={data.type}
                            name={data.name}
                            list={data.items}
                            key={id}
                            subjects={subjects}
                            semesters={semesters}
                            setColumns={setColumns}
                            droppableId={id}
                            setProjects={setProjects}
                        ></Column>
                    ))}
                </DragDropContext>
            </Container>
        </>
    );
};

export default Topic;

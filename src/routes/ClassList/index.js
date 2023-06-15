/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

import axios from 'axios';

import {
    ClassSection as Section,
    CreateClassForm,
    Button,
    Selection,
    Overlay,
    NoResult,
} from '../../components';
import { getTokenInfo } from '../../utils/account';
import { error } from '../../utils/toaster';
import interceptor from '../interceptor';
import {
    Container,
    StyledList,
    StyledInput,
    ToolBar,
    SelectionContainer,
    SearchBar,
    NoResultContainer,
} from './style';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';

const ClassList = () => {
    const [classList, setList] = useState(
        new Array(10).fill('').map((item, index) => ({
            name: '',
            email: null,
            enrollKey: null,
            lecture: null,
            subjectId: null,
            semesterCode: null,
            id: index,
            join: null,
        }))
    );
    const [filter, setFilter] = useState({
        name: '',
        subjectId: -1,
    });
    const [isModalOpen, setModalOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const API_LECTURER = process.env.REACT_APP_API_URL + '/classes';
        const API_STUDENT = process.env.REACT_APP_API_URL + `/classes/student`;
        // const CLASS_API = user.role == 'Lecturer' ? API_LECTURER : API_STUDENT;

        interceptor
            .get('/management/subjects')
            .then((subs) => {
                if (subs.data.code == 200) {
                    setSubjects(
                        subs.data.data.reduce((pre, cur) => {
                            pre[cur.id] = cur.name;
                            return pre;
                        }, [])
                    );
                }
            })
            .catch(() => {
                error('An error occured while processing subjects list');
            });
        interceptor
            .get(user.email.includes('fe@') ? API_LECTURER : API_STUDENT)
            .then((list) => {
                if (list.data.code == 200) {
                    setList(list.data.data);
                }
            })
            .catch(() => {
                error('An error occured while processing class list');
            });

        // Promise.all([subs, list]).then(([subs, list]) => {
        //     setSubjects(
        //         subs?.data.data.reduce((pre, cur) => {
        //             pre[cur.id] = cur.name;
        //             return pre;
        //         }, [])
        //     );
        //     setList(list.data.data);
        // });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const open = () => {
        setModalOpen(true);
    };

    const search = (e) => {
        console.log('search');
        setFilter((filter) => ({
            ...filter,
            name: e.target.value.toLowerCase() || '',
        }));
    };

    const subjectFilter = (e) => {
        setFilter((filter) => ({
            ...filter,
            subjectId: e.value || -1,
        }));
    };

    const handleSearch = () => {
        //asd
    };

    return (
        <>
            <Overlay isOpen={isModalOpen} closeFn={setModalOpen}>
                <CreateClassForm
                    showing={isModalOpen}
                    setCreate={setModalOpen}
                    // setClass={setList}
                />
            </Overlay>
            <Container>
                <ToolBar>
                    <SearchBar>
                        <Button icon={<SearchIcon />}></Button>
                        <StyledInput
                            type="text"
                            placeholder="Search for class by name..."
                            spellcheck="false"
                            onChange={search}
                            // onKeyUp={handleSearch}
                        />
                    </SearchBar>
                    <SelectionContainer>
                        <Selection
                            options={[{ value: -1, content: 'All' }].concat(
                                subjects.map((subject, index) => ({
                                    value: index,
                                    content: subject,
                                }))
                            )}
                            placeholder="Filter by subject"
                            maxHeight="600px"
                            arrow={false}
                            icon={<FilterAltIcon />}
                            onChange={subjectFilter}
                        />
                    </SelectionContainer>
                    {user.email.includes('fe@') && (
                        <Button onClick={open} icon={<AddCircleIcon />}></Button>
                    )}
                </ToolBar>
                {classList && classList.length ? (
                    <StyledList>
                        {classList
                            .filter((item) => item.name.toLowerCase().includes(filter.name))
                            .filter((item) =>
                                filter.subjectId != -1 ? item.subjectId == filter.subjectId : true
                            )
                            .map((item) => (
                                <Section
                                    key={item.id}
                                    name={item.name}
                                    lecture={item.lecturerDto && item.lecturerDto.name}
                                    enrollKey={item && item.enrollKey}
                                    email={item.lecturerDto && item.lecturerDto.email}
                                    subjectId={subjects[item.subjectId]}
                                    semesterCode={item.semesterCode}
                                    id={item.id}
                                    join={item.join}
                                />
                            ))}
                    </StyledList>
                ) : (
                    <NoResultContainer>
                        <NoResult>
                            <h4>There is no class for now</h4>
                        </NoResult>
                    </NoResultContainer>
                )}
            </Container>
        </>
    );
};

export default ClassList;

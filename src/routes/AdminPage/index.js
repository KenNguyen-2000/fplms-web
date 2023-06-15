/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { Header, Selection } from '../../components';
import { error, success } from '../../utils/toaster';
import SemesterForm from './SemesterForm';
import { ButtonList, InputDate, SemsterCode } from './SemesterForm/style';
import {
    AddingCard,
    AddingLoader,
    Button,
    CardTitle,
    Container,
    Dropdown,
    DropdownMenu,
    LeftSetting,
    Loader,
    RightSetting,
    SemesterCard,
    SettingBody,
    SettingLabel,
    SettingTitle,
    Wrapper,
    DropdownItem,
} from './style';

import { faArrowDownLong, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SaveIcon from '@mui/icons-material/Save';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const AdminPage = () => {
    const [loading, setLoading] = useState(true);
    const [loadingAdd, setLoadingAdd] = useState(false);
    const [semesters, setSemesters] = useState();
    const [subjects, setSubjects] = useState();
    const [subject, setSubject] = useState();
    const [newSubjectName, setNewSubjectName] = useState('');
    const [show, setShow] = useState(true);
    const [isAddingSubject, setIsAdding] = useState(false);
    const [showSemsterForm, setShowSemesterForm] = useState(false);
    const [showTransfer, setShowTransfer] = useState(false);
    const [newSemesterCode, setNewSemesterCode] = useState();

    const [semester, setSemester] = useState();

    const [semesterCode, setSemesterCode] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    //Set form position
    const [from, setFrom] = useState();
    const [to, setTo] = useState();
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [open, setOpen] = useState(false);

    const semesterRef = useRef();
    const subjectRef = useRef();

    const getPos = async (item, index) => {
        var el = document.querySelector(`.semester-card-${item.code}-${index}`);
        setWidth(el.clientWidth);
        setHeight(el.clientHeight);
        setSemester(item);
        let bodyRef = document.getElementById('setting-body');
        var tx = bodyRef.offsetLeft + bodyRef.clientWidth / 4;
        var ty = bodyRef.offsetTop + bodyRef.clientHeight / 4;
        setTo({ x: tx, y: ty });
        for (
            var fx = 0, fy = 0;
            el != null;
            fx += el.offsetLeft, fy += el.offsetTop, el = el.offsetParent
        );

        setFrom({ x: fx, y: fy });

        setOpen(true);
    };

    //Manage Semester Setting
    const showSemesterSetting = () => {
        if (semesterRef.current.classList.contains('active')) {
            return;
        } else {
            setLoading(true);
            semesterRef.current.classList.add('active');
            subjectRef.current.classList.remove('active');
            setTimeout(() => {
                setLoading(false);
                setShow(true);
            }, 1000);
        }
    };

    const createSemester = () => {
        setLoadingAdd(true);
        if (startDate > endDate) {
            error(`Bengin date cannot greater than end date!`);
            setLoadingAdd(false);
            return;
        }
        axios
            .post(
                `${process.env.REACT_APP_API_URL}/semesters`,
                {
                    code: semesterCode,
                    endDate: endDate,
                    startDate: startDate,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((res) => {
                if (res.data.code === 200) {
                    success(`Add semester successfully!`);

                    setSemesters((prev) =>
                        prev.concat([
                            {
                                value: semesterCode,
                                content: semesterCode,
                                code: semesterCode,
                                endDate: `${endDate.getFullYear()}-${(
                                    '0' +
                                    (endDate.getMonth() + 1)
                                ).slice(-2)}-${('0' + endDate.getDate()).slice(-2)}`,
                                startDate: `${startDate.getFullYear()}-${(
                                    '0' +
                                    (startDate.getMonth() + 1)
                                ).slice(-2)}-${('0' + startDate.getDate()).slice(-2)}`,
                            },
                        ])
                    );
                    setSemesterCode('');
                    setEndDate('');
                    setStartDate('');
                    setShowSemesterForm(false);
                    setLoadingAdd(false);
                } else {
                    error(`${res.data.message}`);
                    setLoadingAdd(false);
                }
            });
    };

    const transferSemester = (oldSemesterCode) => {
        axios
            .put(
                `${process.env.REACT_APP_API_URL}/semesters/changeSemester/${oldSemesterCode}/${newSemesterCode.value}`,
                {},
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                }
            )
            .then((res) => {
                console.log(res);
            });
    };

    // Manage Subject
    const showSubjectSetting = () => {
        if (subjectRef.current.classList.contains('active')) {
            return;
        } else {
            setLoading(true);
            semesterRef.current.classList.remove('active');
            subjectRef.current.classList.add('active');
            setTimeout(() => {
                setLoading(false);
                setShow(false);
            }, 1000);
        }
    };

    const updateSubject = () => {
        if (newSubjectName !== '' && subject) {
            axios
                .put(
                    `${process.env.REACT_APP_API_URL}/subjects`,
                    {
                        id: subject.value,
                        name: newSubjectName,
                    },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('token')}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.code == 200) {
                        setSubjects((prev) => {
                            return prev
                                .filter((item) => item.value !== subject.value)
                                .concat([{ value: subject.value, content: newSubjectName }]);
                        });
                        success(`Edit subject successfully!`);
                    }
                });
        } else {
            error(`Please input valid subject name`);
        }
    };

    const createSubject = () => {
        if (newSubjectName !== '') {
            axios
                .post(
                    `${process.env.REACT_APP_API_URL}/subjects`,
                    {
                        name: newSubjectName,
                    },
                    {
                        headers: {
                            Authorization: `${localStorage.getItem('token')}`,
                        },
                    }
                )
                .then((res) => {
                    if (res.data.code === 200) {
                        success(`Add subject ${newSubjectName} successfully!`);
                        setIsAdding(false);
                        setNewSubjectName('');
                    }
                });
        }
    };

    const deleteSubject = () => {
        if (subject) {
            axios
                .delete(`${process.env.REACT_APP_API_URL}/subjects/${subject.value}`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                })
                .then((res) => {
                    if (res.data.code == 200) {
                        setSubjects((prev) => {
                            return prev.filter((item) => item.value !== subject.value);
                        });
                        success(`Delete subject ${subject.content} successfully!`);
                        location.reload();
                    }
                });
        } else {
            error(`Something wrong happens when deleting subject!`);
        }
    };

    const renderSemesterSetting = () => {
        return (
            <>
                <SettingTitle>Semester</SettingTitle>
                <SettingBody id="setting-body">
                    {semesters?.map((item, index) => {
                        return (
                            <SemesterCard
                                key={item.code}
                                className={`semester-card-${item.code}-${index}`}
                            >
                                <CardTitle>
                                    {item.code}
                                    <Dropdown>
                                        <button
                                            className="sub-option"
                                            onClick={(e) => e.stopPropagation}
                                        >
                                            <MoreVertIcon />
                                        </button>
                                        <DropdownMenu className="dropdown-menu">
                                            <DropdownItem onClick={() => getPos(item, index)}>
                                                <EditIcon />
                                            </DropdownItem>
                                            <DropdownItem onClick={() => setShowTransfer(true)}>
                                                <FontAwesomeIcon
                                                    style={{ fontSize: '20px' }}
                                                    icon={faArrowRightArrowLeft}
                                                />
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </CardTitle>
                                {showTransfer ? (
                                    <>
                                        <FontAwesomeIcon
                                            style={{
                                                alignSelf: 'flex-start',
                                                cursor: 'pointer',
                                            }}
                                            icon={faArrowDownLong}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                transferSemester(item.code);
                                            }}
                                        />

                                        <Selection
                                            options={semesters}
                                            placeholder={'Semester'}
                                            onChange={setNewSemesterCode}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InputDate>
                                            Start Date: <span>{item.startDate}</span>
                                        </InputDate>
                                        <InputDate>
                                            End Date: <span>{item.endDate}</span>
                                        </InputDate>{' '}
                                    </>
                                )}
                            </SemesterCard>
                        );
                    })}
                    <AddingCard isShow={showSemsterForm}>
                        {showSemsterForm && (
                            <>
                                {loadingAdd ? (
                                    <AddingLoader />
                                ) : (
                                    <>
                                        {' '}
                                        <CloseIcon
                                            className="close-icon"
                                            onClick={() => setShowSemesterForm(false)}
                                        />
                                        <input
                                            id="semester-input"
                                            placeholder="Semester Code"
                                            value={semesterCode || ''}
                                            onChange={(e) => setSemesterCode(e.target.value)}
                                        />
                                        <InputDate>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="Start date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={startDate || ''}
                                                    onChange={(newValue) => {
                                                        setStartDate(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                            {/* <input
                                                type={'date'}
                                                value={startDate || ''}
                                                onChange={(e) => setStartDate(e.target.value)}
                                            /> */}
                                        </InputDate>
                                        <InputDate>
                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DesktopDatePicker
                                                    label="End date"
                                                    inputFormat="MM/dd/yyyy"
                                                    value={endDate}
                                                    onChange={(newValue) => {
                                                        setEndDate(newValue);
                                                        console.log(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField {...params} />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </InputDate>
                                        <ButtonList>
                                            <Button
                                                disabled={
                                                    semesterCode === '' ||
                                                    startDate === '' ||
                                                    endDate === ''
                                                }
                                                onClick={createSemester}
                                            >
                                                Save
                                            </Button>
                                        </ButtonList>
                                    </>
                                )}
                            </>
                        )}
                        <AddIcon className="add-icon" onClick={() => setShowSemesterForm(true)} />
                    </AddingCard>
                </SettingBody>
            </>
        );
    };

    const renderSubjectSetting = () => {
        return (
            <>
                <SettingTitle>Subject</SettingTitle>
                <SettingBody
                    style={{ gridTemplateColumns: '1fr auto 1fr' }}
                    isAdding={isAddingSubject}
                >
                    <input
                        id="add-subject"
                        placeholder="Subject Name"
                        onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                    <Selection
                        options={subjects}
                        placeholder={'Subject' || newSubjectName}
                        onChange={setSubject}
                    />
                    <TrendingFlatIcon style={{ alignSelf: 'center' }} />
                    <input
                        type="text"
                        id="subject-name-input"
                        onChange={(e) => setNewSubjectName(e.target.value)}
                    />
                    <div></div>
                    <div></div>
                    <div className="subject-icon">
                        <AddIcon onClick={() => setIsAdding(!isAddingSubject)} />
                        <SaveIcon onClick={isAddingSubject ? createSubject : updateSubject} />
                        {subject && <DeleteIcon onClick={deleteSubject} />}
                    </div>
                </SettingBody>
            </>
        );
    };

    const renderForm = () => {
        return (
            <SemesterForm
                semester={semester}
                open={open}
                setOpen={setOpen}
                w={width}
                h={height}
                from={from}
                to={to}
                setSemesters={setSemesters}
            />
        );
    };

    useEffect(() => {
        const fetchSemesters = async () => {
            semesterRef.current.classList.add('active');
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/semesters`, {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                });

                if (res.data.code === 200) {
                    const datas = res.data.data.map((item) => ({
                        ...item,
                        value: item.code,
                        content: item.code,
                    }));
                    setSemesters(datas);
                    setLoading(false);
                }
            } catch (err) {
                error(err);
            }
        };

        const fetchSubjects = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/subjects`, {
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            });

            if (res.data.code === 200) {
                const datas = await res.data.data.map((item) => ({
                    value: item.id,
                    content: item.name,
                }));
                setSubjects(datas);
                setLoading(false);
            }
        };

        fetchSemesters();
        fetchSubjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />
            {open && renderForm()}
            <Wrapper>
                <Container>
                    <RightSetting>
                        <SettingLabel ref={semesterRef} onClick={() => showSemesterSetting()}>
                            Semester Settings
                        </SettingLabel>
                        <SettingLabel ref={subjectRef} onClick={() => showSubjectSetting()}>
                            <span>Subject Settings</span>
                        </SettingLabel>
                    </RightSetting>

                    <LeftSetting>
                        {loading ? (
                            <Loader />
                        ) : show ? (
                            renderSemesterSetting()
                        ) : (
                            renderSubjectSetting()
                        )}
                    </LeftSetting>
                </Container>
            </Wrapper>
        </>
    );
};

export default AdminPage;

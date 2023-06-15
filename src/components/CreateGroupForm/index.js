import { useEffect, useState } from 'react';

import axios from 'axios';

import { error, success } from '../../utils/toaster';
import ButtonLoader from '../ButtonLoader';
import { Overlay } from '../index';
import {
    FormContainer,
    FormHeader,
    FormBody,
    HeaderJumbotron,
    Title,
    SubTitle,
    FormRow,
    FormColumn,
    FormInput,
    CreateBtn,
    TimeInput,
} from './style';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const CreateGroupForm = ({ showing, setCreate, class_ID, setRefresh }) => {
    const currentDate = new Date();

    const [groups, setGroups] = useState(1);
    const [members, setMembers] = useState(1);
    const [date, setDate] = useState(
        `${currentDate.getFullYear()}-${('0' + (currentDate.getMonth() + 1)).slice(-2)}-${(
            '0' + currentDate.getDate()
        ).slice(-2)}`
    );
    const [time, setTime] = useState('12:00:00.000');
    const [enrollTime, setEnrollTime] = useState('');
    const [isLoading, setLoading] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [errorForm, setErrorForm] = useState({ numErr: '', memberQuantityErr: '' });

    const URL = process.env.REACT_APP_API_URL + `/classes/${class_ID}/groups`;
    const TOKEN = localStorage.getItem('token');
    const header = {
        Authorization: TOKEN,
    };
    const handleCreateBtn = () => {
        setLoading(true);
        axios
            .post(
                URL,
                {
                    classId: class_ID,
                    enrollTime: enrollTime,
                    groupQuantity: groups,
                    memberQuantity: members,
                },
                { headers: header }
            )
            .then((res) => {
                if (res.data.code == 200) {
                    success(`Create ${groups} group(s) successfully!`);
                } else {
                    error(res.data.message);
                }
            })
            .catch(() => {
                error(`An error occured!`);
            })
            .finally(() => {
                setRefresh((prev) => prev + 1);
                setLoading(false);
                closeForm();
            });
    };

    const closeForm = () => {
        setCreate(false);
    };

    const preventPropagation = (e) => {
        e.preventPropagation();
    };

    const incrementNumOfGroups = () => {
        setGroups(groups + 1);
        setErrorForm((prev) => ({ ...prev, numErr: '' }));
    };
    const decrementNumOfGroups = () => {
        if (groups > 1) {
            setGroups(groups - 1);
        } else {
            setErrorForm((prev) => {
                return { ...prev, numErr: 'Number of groups must greater or equal 1!' };
            });
        }
    };

    useEffect(() => {
        setEnrollTime(date + ' ' + time);
    }, [date, time]);

    const renderError = (error) => {
        return <span style={{ color: 'red', fontSize: '10px' }}>{error}</span>;
    };

    return (
        <>
            <Overlay isOpen={showing}>
                <FormContainer onclick={preventPropagation}>
                    <FormHeader>
                        <HeaderJumbotron>
                            <Title>Create New Group</Title>
                            <SubTitle>SE1633</SubTitle>
                        </HeaderJumbotron>
                        <CloseIcon sx={{ fontSize: '2rem' }} onClick={closeForm} />
                    </FormHeader>
                    <FormBody>
                        <FormRow>
                            <FormColumn>
                                <small>Number of groups</small>

                                <FormInput>
                                    <ArrowBackIosIcon onClick={decrementNumOfGroups} />
                                    {groups}
                                    <ArrowForwardIosIcon onClick={incrementNumOfGroups} />
                                </FormInput>
                                {renderError(errorForm.numErr)}
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Min number of members</small>

                                <FormInput>
                                    <ArrowBackIosIcon
                                        onClick={() => {
                                            if (members > 1) {
                                                setMembers(members - 1);
                                            } else {
                                                setErrorForm((prev) => {
                                                    return {
                                                        ...prev,
                                                        memberQuantityErr:
                                                            'Min number of students in group must be greater or equal 1!',
                                                    };
                                                });
                                            }
                                        }}
                                    />
                                    {members}
                                    <ArrowForwardIosIcon
                                        onClick={() => {
                                            setMembers(members + 1);
                                            setErrorForm((prev) => ({
                                                ...prev,
                                                memberQuantityErr: '',
                                            }));
                                        }}
                                    />
                                </FormInput>
                                {renderError(errorForm.memberQuantityErr)}
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing date</small>
                                <TimeInput
                                    type={'date'}
                                    defaultValue={date}
                                    onChange={(e) => {
                                        setDate(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                />
                            </FormColumn>
                        </FormRow>
                        <FormRow>
                            <FormColumn>
                                <small>Closing time</small>
                                <TimeInput
                                    type={'time'}
                                    onChange={(e) => {
                                        setTime(e.target.value + ':00.000');
                                        console.log(e.target.value);
                                    }}
                                    defaultValue={time}
                                />
                            </FormColumn>
                        </FormRow>
                        <CreateBtn type="button" onClick={handleCreateBtn} isLoading={isLoading}>
                            <ButtonLoader isLoading={isLoading} />
                            <span>CREATE</span>
                        </CreateBtn>
                    </FormBody>
                </FormContainer>
            </Overlay>
        </>
    );
};

export default CreateGroupForm;

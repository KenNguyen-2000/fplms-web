import { useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { error, success } from '../../../utils/toaster';
import { Wrapper, Container, Overlay, ButtonList, Button, SemsterCode, InputDate } from './style';

import { TextField } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const SemesterForm = ({ open, setOpen, w, h, from, to, semester, setSemesters }) => {
    const formRef = useRef();
    const [startDate, setStartDate] = useState(semester.startDate);
    const [endDate, setEndDate] = useState(semester.endDate);

    const handleDeleteSemester = async () => {
        try {
            const res = await axios.delete(
                `${process.env.REACT_APP_API_URL}/semesters/${semester.code}`,
                {
                    headers: { Authorization: `${localStorage.getItem('token')}` },
                }
            );
            if (res.data.code === 200) {
                setSemesters((prev) => prev.filter((item) => item.code != semester.code));
                success(`Delete semester successfully!`);
                setOpen(false);
            } else {
                error(`${res.data.message}`);
                setOpen(false);
            }
        } catch (err) {
            await error(err);
            setOpen(false);
        }
    };
    const handleEditSemester = async () => {
        try {
            if (startDate > endDate) {
                error(`Begin date must not greater than end date!`);
                return;
            }
            const res = await axios.put(
                `${process.env.REACT_APP_API_URL}/semesters`,
                {
                    code: semester.code,
                    endDate: endDate,
                    startDate: startDate,
                },
                {
                    headers: {
                        Authorization: `${localStorage.getItem('token')}`,
                    },
                }
            );
            console.log(res);
            if (res.data.code === 200) {
                await setSemesters((prev) => {
                    prev.find((item) => item.code === semester.code).code = semester.code;
                    prev.find((item) => item.code === semester.code).endDate = endDate;
                    prev.find((item) => item.code === semester.code).startDate = startDate;
                    return prev;
                });

                success(`Edit semester successfully`);
                setOpen(false);
            } else {
                error(res.data.message);
            }
        } catch (err) {
            await error(err);
            await setOpen(false);
        }
    };

    useEffect(() => {
        if (open) {
            document.querySelector('.form-wrapper').classList.add('show-form');
        }
    }, [open]);

    return (
        <>
            <Overlay
                onClick={() => {
                    setOpen(false);
                    document.querySelector('.form-wrapper').classList.remove('show-form');
                }}
            />
            <Wrapper
                ref={formRef}
                className="form-wrapper"
                open={open}
                w={w}
                from={from}
                to={to}
                h={h}
            >
                <Container>
                    <SemsterCode>{semester.code}</SemsterCode>
                    <InputDate>
                        <span>Start Date:</span>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Start date"
                                inputFormat="MM/dd/yyyy"
                                value={semester.startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </InputDate>
                    <InputDate>
                        <span>End Date:</span>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="Start date"
                                inputFormat="MM/dd/yyyy"
                                value={semester.endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </InputDate>
                    <ButtonList>
                        <Button onClick={handleEditSemester}>Save</Button>
                        <Button onClick={handleDeleteSemester}>Delete</Button>
                    </ButtonList>
                </Container>
            </Wrapper>
        </>
    );
};

export default SemesterForm;

import { useState, useRef } from 'react';

import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useClickOutside } from '../../hooks';
import { getTokenInfo } from '../../utils/account';
import { error } from '../../utils/toaster';
import { isBoolean } from '../../utils/valid';
import Skeleton from '../Skeleton';
import { Spinner } from '../Spinner';
import {
    Container,
    Title,
    Row,
    DetailText,
    StyledButton,
    StyledInput,
    MiniDetails,
    Email,
    JoinButton,
    Front,
    Back,
} from './style';

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const bezier = [0.4, 0, 0.2, 1];

const Motion = ({ children, delay }) => (
    <motion.div
        initial={{ opacity: 0, transform: 'translateX(10px)' }}
        animate={{
            opacity: 1,
            transform: 'translateX(0px)',
            transition: { duration: 1, delay: delay * 0.1, ease: bezier },
        }}
    >
        {children}
    </motion.div>
);

const ClassSection = ({ name, lecture, join, id, subjectId, semesterCode, email, enrollKey }) => {
    const [open, setOpen] = useState(false);
    const [onLoad, setOnLoad] = useState(false);
    const buttonRef = useRef();
    const inputRef = useRef();
    const navigate = useNavigate();

    useClickOutside(buttonRef, () => {
        if (open == true) {
            setOpen(false);
        }
    });

    const openEnroll = () => {
        if (!join) {
            setOpen(true);
        }
    };

    const focus = () => {
        inputRef.current.select();
    };

    const user = getTokenInfo();

    const enroll = () => {
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
            'Content-Type': 'text/plain',
        };
        if (!join && open && !onLoad) {
            if (inputRef.current.value.trim().length) {
                const API = process.env.REACT_APP_API_URL + `/classes/${id}/enroll`;
                const enrollKey = inputRef.current.value;
                setOnLoad(true);
                axios
                    .post(API, enrollKey, {
                        headers: header,
                    })
                    .then((response) => {
                        const data = response.data;
                        setOnLoad(false);
                        if (data.code == 400) {
                            error(data.message);
                            inputRef.current.value = '';
                        } else if (data.code == 200) {
                            navigate(`/class/${id}`);
                        }
                    })
                    .catch(() => {
                        setOnLoad(false);
                    });
            } else {
                error('Enroll key cannot blank');
            }
        }

        // if (!isEnroll && open) {
        //     error('Wrong enroll key!');
        //     inputRef.current.value = '';
        // }
    };

    const joinClass = () => {
        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };
        if (user.email.includes('fe@')) {
            navigate(`/class/${id}`);
        }
        if (join) {
            const API = process.env.REACT_APP_API_URL + `/classes/${id}/groups/details`;
            axios.get(API, { headers: header }).then((res) => {
                const data = res.data.data;
                if (data) {
                    navigate(`/class/${id}/group/${data.id}`);
                } else {
                    navigate(`/class/${id}`);
                }
            });
        }
    };

    let delay = 0;

    return (
        <AnimatePresence>
            <Container
                isenroll={join ? 1 : 0} // special case dont change 'e' into 'E' please
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                animate={{
                    opacity: 1,
                    transform: 'translateY(0px)',
                    transition: { duration: 0.5, ease: bezier },
                }}
            >
                {name && user.email.includes('fe@') && (
                    <span className="view-mark" onClick={() => navigate(`/mark-table/${id}`)}>
                        Mark Table {/* <ArrowRightAltIcon />{' '} */}
                    </span>
                )}
                <Row>
                    {subjectId ? (
                        <Motion>
                            <DetailText>{subjectId} </DetailText>
                        </Motion>
                    ) : (
                        <Skeleton style={{ height: 26 }} />
                    )}
                </Row>
                <MiniDetails>
                    <Row>
                        <Title>
                            {name ? <Motion delay={delay++}>{name}</Motion> : <Skeleton />}
                        </Title>
                    </Row>
                    {lecture != undefined && (
                        <Row>
                            <Email>
                                {lecture ? (
                                    <Motion delay={delay++}>{lecture}</Motion>
                                ) : (
                                    <Skeleton />
                                )}
                            </Email>
                        </Row>
                    )}
                    {email != undefined && (
                        <Row>
                            <Email>
                                {lecture ? <Motion delay={delay++}>{email}</Motion> : <Skeleton />}
                            </Email>
                        </Row>
                    )}
                    {enrollKey != undefined && (
                        <Row>
                            <Email>
                                <Motion delay={delay++}>
                                    Enroll key:{' '}
                                    <input
                                        onFocus={(e) => {
                                            e.target.type = 'text';
                                        }}
                                        readOnly
                                        type="password"
                                        defaultValue={enrollKey.toString()}
                                        onBlur={(e) => (e.target.type = 'password')}
                                    />
                                </Motion>
                            </Email>
                        </Row>
                    )}
                    <Row>
                        <Email>
                            {semesterCode ? (
                                <Motion delay={delay++}>{semesterCode}</Motion>
                            ) : (
                                <Skeleton />
                            )}
                        </Email>
                    </Row>
                </MiniDetails>
                <Row onClick={openEnroll} ref={buttonRef}>
                    {(isBoolean(join) || user.email.includes('fe@')) && name ? (
                        <StyledButton open={open} onClick={joinClass}>
                            <Front onClick={focus} isEnroll={join}>
                                {!user.email.includes('fe@')
                                    ? join
                                        ? 'OPEN'
                                        : 'ENROLL'
                                    : 'GO TO CLASS'}
                            </Front>
                            <Back>
                                <StyledInput
                                    ref={inputRef}
                                    type="password"
                                    placeholder="Enroll Key"
                                />
                                <JoinButton onClick={enroll}>
                                    {!onLoad ? (
                                        <DoubleArrowIcon />
                                    ) : (
                                        <Spinner radius="20" color="white" />
                                    )}
                                </JoinButton>
                            </Back>
                        </StyledButton>
                    ) : (
                        <Skeleton style={{ height: 42, width: '100%' }} />
                    )}
                </Row>
            </Container>
        </AnimatePresence>
    );
};

export default ClassSection;

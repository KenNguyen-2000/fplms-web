/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef, useContext } from 'react';

import axios from 'axios';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/fpt logo 1.jpg';
import AuthContext from '../../contexts/auth';
import { useClickOutside } from '../../hooks';
import { getTokenInfo } from '../../utils/account';
import {
    HContainer,
    HLogo,
    HIcons,
    NotiNews,
    NotificationContainer,
    NotificationHeader,
    NotificationBody,
    NotiContainer,
    NotiInfo,
    BtnContainer,
    UserContainer,
} from './style';

import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import { io } from 'socket.io-client';

const Header = () => {
    const [isNotiOpen, setNotiOpen] = useState(false);
    const [isUserOpen, setUserOpen] = useState(false);

    // const [socket, setSocket] = useState(null);

    const navigate = useNavigate();
    const [list, setList] = useState([]);

    const [newNoti, setNewNoti] = useState(0);

    const notiRef = useRef();
    const userRef = useRef();

    const auth = useContext(AuthContext);

    useClickOutside(notiRef, () => {
        if (isNotiOpen == true) {
            setNotiOpen(false);
        }
    });

    useClickOutside(userRef, () => {
        if (isUserOpen == true) {
            setUserOpen(false);
        }
    });

    const user = getTokenInfo();

    useEffect(() => {
        // const socket = io(process.env.REACT_APP_WS, {
        //     extraHeaders: {
        //         Authorization: localStorage.getItem('token'),
        //     },
        // });

        const header = {
            Authorization: `${localStorage.getItem('token')}`,
        };

        setInterval(() => {
            axios
                .get(process.env.REACT_APP_API_URL + '/subjects', { headers: header })
                .then((subs) => {
                    console.log(subs);
                });
        }, 300000);

        // socket.emit('notifications', {});

        // socket.on('notifications', (e) => {
        //     if (Array.isArray(e)) {
        //         setList((list) => list.concat(e));
        //         setNewNoti((noti) => noti + e.length);
        //     } else {
        //         setList((list) => list.concat(JSON.parse(e)));
        //         setNewNoti((noti) => noti + 1);
        //     }
        // });
        // socket.on('disconnect', (e) => {
        //     console.log('disconnect');
        // });
        // socket.on('connect', (e) => {
        //     console.log('connected');
        // });

        // setSocket(socket);

        // return () => socket.close();
    }, []);

    return (
        <HContainer>
            <HLogo>
                <img src={logo} alt="FPT Logo" />
            </HLogo>
            <HIcons>
                <BtnContainer ref={userRef}>
                    <PersonIcon
                        onClick={() => {
                            setUserOpen((userOpen) => !userOpen);
                        }}
                    />
                    <UserContainer isOpen={isUserOpen}>
                        <NotiInfo>{user.email}</NotiInfo>
                        <NotiInfo
                            onClick={() => {
                                localStorage.clear();
                                auth.setAuth(false);
                                navigate('/login');
                            }}
                        >
                            Logout
                        </NotiInfo>
                    </UserContainer>
                </BtnContainer>
                <BtnContainer ref={notiRef}>
                    <NotificationsIcon
                        onClick={() => {
                            setNewNoti(0);
                            setNotiOpen((e) => !e);
                        }}
                    />
                    <NotiNews isDisplay={newNoti > 0}>{newNoti}</NotiNews>
                    <NotificationContainer isOpen={isNotiOpen}>
                        <NotificationHeader>Notification</NotificationHeader>
                        <NotificationBody>
                            {list.map((noti) => (
                                <NotiContainer key={noti.id}>
                                    {/* <InboxIcon /> */}
                                    <NotiInfo>
                                        <small>{noti.userEmail}</small>
                                        <div>{noti.title}</div>
                                        <small>{moment(noti.createAt).fromNow()}</small>
                                    </NotiInfo>
                                </NotiContainer>
                            ))}
                        </NotificationBody>
                    </NotificationContainer>
                </BtnContainer>
            </HIcons>
        </HContainer>
    );
};

export default Header;

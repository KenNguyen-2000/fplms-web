import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import AuthContext from '../../contexts/auth';
import { StyledContainer, StyledUL, StyledSection, StyledBlock } from './style';

import ForumIcon from '@mui/icons-material/Forum';
import HomeIcon from '@mui/icons-material/Home';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SchoolIcon from '@mui/icons-material/School';
import SettingsIcon from '@mui/icons-material/Settings';
import TopicIcon from '@mui/icons-material/Topic';

const Section = ({ section, level, setShow }) => {
    const navigate = useNavigate();

    const collapse = () => {
        if (section.path) {
            navigate(section.path);
        }
        setShow(section, true);
    };

    return (
        <li>
            <StyledSection onClick={collapse} expand={section.isExpand || false}>
                {section.icon ? section.icon : <span />}
                <StyledBlock expand={section.isExpand || false}>
                    <span>{section.title}</span>
                    {section.submenu.length ? <KeyboardArrowDownIcon /> : null}
                </StyledBlock>
            </StyledSection>
            {section.submenu ? (
                <Menu
                    setShow={setShow}
                    expand={section.isExpand}
                    level={level + 2.5}
                    menu={section.submenu}
                />
            ) : null}
        </li>
    );
};

const Menu = ({ menu, level, expand, setShow }) => {
    return (
        <StyledUL level={level} expand={expand} height={level == 1 ? 'auto' : menu.length * 56}>
            {menu.map((section) => (
                <Section
                    setShow={setShow}
                    key={section.path + section.title}
                    section={section}
                    level={level}
                />
            ))}
        </StyledUL>
    );
};

const SideBar = () => {
    const auth = useContext(AuthContext);
    console.log(auth.isAdmin);
    const [menu, setMenu] = useState([
        {
            title: 'Home',
            path: '#',
            icon: <HomeIcon />,
            submenu: [],
        },
        {
            title: 'Class list',
            path: '/class',
            isExpand: true,
            icon: <SchoolIcon />,
            submenu: [],
            // submenu: [
            //     {
            //         title: 'My classes',
            //         path: '/class',
            //         isExpand: true,
            //         submenu: [],
            //     },
            //     {
            //         title: 'All classes',
            //         path: '/class',
            //         submenu: [],
            //     },
            // ],
        },
        {
            title: 'Discussion',
            path: '/discussion-list',
            icon: <ForumIcon />,
            submenu: [
                {
                    title: 'My questions',
                    path: '/my-questions',
                    submenu: [],
                },
            ],
        },
        {
            title: 'Topics',
            path: '/topic',
            icon: <TopicIcon />,
            submenu: [],
        },
    ]);
    useEffect(() => {
        if (auth.isAdmin) {
            setMenu((prev) =>
                prev.concat([
                    {
                        title: 'Settings',
                        path: '/admin',
                        icon: <SettingsIcon />,
                        submenu: [],
                    },
                ])
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setShow = (target, status = false) => {
        const switchMenu = (sections) => {
            sections.forEach((sub) => {
                sub.isExpand = false;
                if (target == sub || sub.submenu.includes(target)) {
                    sub.isExpand = status;
                }
                if (sub.isExpand == true) {
                    switchMenu(sub.submenu);
                }
            });
            return sections;
        };

        setMenu(switchMenu(menu));
    };

    return (
        <StyledContainer width="275px" height="100vh" padding="16px 0" position="fixed" shadow>
            <StyledContainer padding="0px">
                <Menu menu={menu} level={1} expand={true} setShow={setShow} />
            </StyledContainer>
        </StyledContainer>
    );
};

export default SideBar;

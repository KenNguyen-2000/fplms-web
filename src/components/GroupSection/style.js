import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/color';

const fadeIn = keyframes`
    from{
        transform: translateX(25px);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`;

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 16px;
    background-color: ${COLOR.blue[5]};
    border-radius: 4px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    font-weight: bold;
    font-size: 1rem;
    color: ${COLOR.primary03};
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    animation: ${fadeIn} 300ms ease-in-out forwards;
`;

const Row = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    svg {
        color: ${COLOR.gray[0]};
        margin-right: 5px;
    }

    .book-icon {
        opacity: 0;
        animation: ${fadeIn} 300ms ease-in-out 300ms forwards;
    }
    .people-icon {
        opacity: 0;
        animation: ${fadeIn} 300ms ease-in-out 500ms forwards;
    }
    .time-icon {
        opacity: 0;
        animation: ${fadeIn} 300ms ease-in-out 500ms forwards;
    }
`;

const Project = styled.div`
    opacity: 0;
    font-size: 1rem;
    color: ${COLOR.gray[0]};
    animation-delay: 300ms;
    animation: ${fadeIn} 300ms ease-in-out 300ms forwards;
`;

const Members = styled.div`
    opacity: 0;
    font-size: 1rem;
    color: ${COLOR.gray[0]};
    animation-delay: 500ms;
    animation: ${fadeIn} 300ms ease-in-out 500ms forwards;
`;

const GroupBtn = styled.button`
    opacity: 0;
    padding: 4px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${COLOR.blue[1]};
    text-transform: uppercase;
    font-size: 1rem;
    margin-right: 10px;
    margin-top: 8px;
    color: ${COLOR.primary02};
    animation: ${fadeIn} 300ms ease-in-out 800ms forwards;
    :hover {
        cursor: pointer;
    }
`;

export const JoinBtn = styled.button`
    opacity: 0;
    padding: 4px 16px;
    border: none;
    border-radius: 4px;
    background-color: ${({ btnStyle }) => (btnStyle ? COLOR.red[1] : COLOR.blue[1])};
    text-transform: uppercase;
    font-size: 1rem;
    margin-right: 10px;
    margin-top: 8px;
    color: ${COLOR.primary02};
    :hover {
        cursor: pointer;
    }
    pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};
    background-color: ${({ disable }) => disable && COLOR.gray[0]};
    animation: ${fadeIn} 300ms ease-in-out 800ms forwards;
`;

const Dropdown = styled.div`
    position: relative;
    .sub-option {
        padding: 0;
        border: none;
        background-color: unset;
        height: 30px;
        cursor: pointer;
    }
    &:hover > .sub-option + .dropdown-menu {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }
`;

const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    width: fit-content;
    padding: 0.75rem;
    top: calc(100% + 0.05rem);
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 99;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    opacity: 0;
    pointer-events: none;
    svg {
        align-self: flex-end;
        border-radius: 50%;
        margin: 2px 0;
        cursor: pointer;
        &:first-child {
            color: ${COLOR.red[1]};
        }
        &:nth-child(2) {
            color: ${COLOR.primary03};
        }
        &:hover {
            transform: scale(1.3);
            transition: all 150ms ease-in-out;
        }
    }
`;

const DropdownItem = styled.div`
    width: 100%;
    height: auto;
`;

export { Container, Row, Header, Project, Members, GroupBtn, Dropdown, DropdownMenu, DropdownItem };

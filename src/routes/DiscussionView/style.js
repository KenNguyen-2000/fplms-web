import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const StyledContainer = styled.div`
    max-width: 1100px;
    margin: 10px auto;
    * {
        box-sizing: border-box;
    }
`;

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0 30px 0;
    img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`;

export const Row = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-size: 1rem;
    color: ${COLOR.primary03};
`;

export const Subtitle = styled.div`
    font-size: 0.8rem;
    color: ${COLOR.gray[0]};
`;

export const StyledBody = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 344px;
    gap: 20px;
    margin: 15px 0;
    @media (max-width: 1250px) {
        grid-template-columns: 1fr auto;
        gap: 5px;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const PostView = styled.div`
    width: 100%;
    max-width: 750px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const PostMain = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    .editorClassName {
        ::-webkit-scrollbar {
            display: none;
        }
    }
    .toolbarClassName {
        display: none;
    }
`;

export const PostTitle = styled.div`
    font-size: 1.8rem;
    color: ${COLOR.blue[0]};
`;

export const Divider = styled.div`
    width: 100%;
    height: 2px;
    background-color: ${COLOR.blue[1]};
`;

export const PostText = styled.div`
    font-size: 1.2rem;
    color: ${COLOR.primary03};
    word-break: break-all;
`;

export const Dropdown = styled.div`
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

export const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    width: fit-content;
    padding: 0.75rem;
    top: 80%;
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 10;
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

export const DropdownItem = styled.div`
    width: 100%;
    height: auto;
`;

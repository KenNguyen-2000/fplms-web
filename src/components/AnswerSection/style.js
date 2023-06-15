import styled from 'styled-components';

import { COLOR } from '../../utils/color';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    display: grid;
    gap: 24px;

    .star-icon {
        color: ${COLOR.primary03};
    }
`;

export const Comment = styled.div`
    height: auto;
    width: 100%;
    padding: 16px;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    display: grid;
    grid-template-columns: 1fr auto auto;
    svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        cursor: pointer;
    }
    div:nth-child(2),
    textarea,
    svg {
        display: ${({ isLoading }) => (isLoading ? 'none' : '')};
    }

    :hover {
        .sub-option {
            visibility: visible;
        }
    }
`;

export const CommentInput = styled(TextareaAutosize)`
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.blue[4]};
    border-radius: 4px;
    font-size: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    align-self: center;
`;

export const Dropdown = styled.div`
    height: fit-content;
    position: relative;
    .sub-option {
        padding: 0;
        border: none;
        background-color: unset;
        height: 30px;
        visibility: hidden;
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

export const Answers = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 12px;
    img {
        width: 40px;
        height: auto;
        object-fit: cover;
        border-radius: 50%;
    }
`;

export const Col = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    position: relative;
`;

export const Action = styled.div`
    font-weight: bold;
    font-size: 0.9rem;
    color: ${COLOR.blue[2]};
    margin: 3px 0;
    align-self: center;
    margin-right: 10px;
    display: flex;
    align-items: center;
    input[type='radio'] {
        display: none;
        /* &:checked + label {
            svg {
                stroke: ${({ checked }) => (checked ? COLOR.green[1] : COLOR.blue[2])};
                color: ${({ checked }) => (checked ? COLOR.green[1] : COLOR.primary02)};
            }
        } */
    }
    .check-icon {
        stroke: ${({ checked }) => (checked ? COLOR.green[1] : COLOR.blue[2])};
        color: ${({ checked }) => (checked ? COLOR.green[1] : COLOR.primary02)};
    }
    label {
        cursor: pointer;
        color: ${COLOR.blue[2]};
        svg {
            stroke: ${COLOR.blue[2]};
            color: ${COLOR.primary02};
            font-size: 2.5rem;
        }
    }
    time {
        cursor: default;
        color: ${COLOR.gray[0]};
    }
`;

export const Vote = styled.div`
    max-height: 80px;
    margin-right: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${COLOR.gray[0]};
    line-height: 1;
    svg {
        height: 30px;
        width: 30px;
        path {
            d: path('m 4 18 l 8 -10 l 8 10 Z');
        }
        color: ${({ upvoted }) => (upvoted ? COLOR.green[0] : COLOR.gray[0])};
        font-size: 3rem;
        cursor: pointer;
    }
    div {
        font-style: oblique;
        font-size: 1.5rem;
    }
`;

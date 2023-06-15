import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../../utils/style';

const scaleIn = (to, from) => keyframes`
    0%{
        transform: scale(0.3);
        top: ${from.y}px;
        left: ${from.x}px;
    }
    100%{
        transform: scale(1);
        top: 50%;
        left: 50%;
        right: 50%;
        bottom: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const Overlay = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    background-color: rgba(0, 0, 0, 0.1);
`;

export const Wrapper = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;

    width: ${({ w }) => `${w}px` || '200px'};
    min-height: ${({ h }) => `${h}px` || '100px'};
    z-index: 999;

    animation: ${({ to, from }) => scaleIn(to, from)} 1.5s ease-in-out forwards;
    color: ${COLOR.primary03};
`;

export const Container = styled.div`
    width: fit-content;
    border-radius: 4px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    padding: 10px 15px;
    gap: 5px;
    min-width: fit-content;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const SemsterCode = styled.h1`
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    width: fit-content;
`;

export const InputDate = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1rem;
    margin-bottom: 10px;
    gap: 10px;
    width: 100%;
    input[type='date'] {
        cursor: pointer;
        border: 1px solid ${COLOR.primary03};
        border-radius: 4px;
        font-family: 'Lato';
        color: ${COLOR.primary03};
    }
    span {
        white-space: nowrap;
        width: 35%;
    }
`;

export const ButtonList = styled.div`
    display: flex;
    gap: 15px;
`;

export const Button = styled.button`
    outline: none;
    border-radius: 4px;
    padding: 5px 15px;
    color: ${COLOR.primary03};
    font-weight: 550;
    cursor: pointer;
    transition: all 200ms ease-in-out;
    :hover {
        transform: scale(1.08);
    }

    &:first-child {
        color: ${COLOR.green[0]};
        border: 2px solid ${COLOR.green[0]};
        :hover {
            color: ${COLOR.primary02};
            background-color: ${COLOR.green[0]};
        }
    }
    &:nth-child(2) {
        color: ${COLOR.red[2]};
        border: 2px solid ${COLOR.red[2]};
        :hover {
            color: ${COLOR.primary02};
            background-color: ${COLOR.red[2]};
        }
    }
`;

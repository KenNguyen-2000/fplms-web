import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    max-height: 150px;
    width: 350px;
    display: flex;
    flex-direction: column;
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    padding: 1rem 2rem;
    align-items: center;
    gap: 15px;
    position: relative;
    svg {
        position: absolute;
        top: 10px;
        right: 15px;
        border-radius: 50%;
        :hover {
            cursor: pointer;
            background-color: ${COLOR.primary03};
            color: ${COLOR.primary02};
        }
    }
`;

export const Title = styled.h1`
    font-weight: 600;
    font-size: 1.2rem;
    color: ${COLOR.primary03};
    text-align: center;
    width: 100%;
`;

export const ButtonList = styled.div`
    display: flex;
    width: 80%;
    justify-content: space-between;
`;

export const Button = styled.button`
    outline: none;
    background-color: transparent;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    padding: 8px 25px;
    &:nth-child(1) {
        border: 1px solid ${COLOR.red[3]};
        color: ${COLOR.red[3]};
        :hover {
            color: ${COLOR.red[0]};
            border-color: ${COLOR.red[0]};
        }
    }

    &:nth-child(2) {
        border: 1px solid ${COLOR.blue[3]};
        color: ${COLOR.blue[3]};
        :hover {
            color: ${COLOR.blue[0]};
            border-color: ${COLOR.blue[0]};
        }
    }
    :hover {
        transform: scale(1.08);
        transition: transform 150ms ease-in-out;
    }
`;

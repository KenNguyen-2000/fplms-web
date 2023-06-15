import styled from 'styled-components';

import { COLOR } from '../../utils/color';

const Container = styled.div`
    width: fit-content;
    display: grid;
    grid-template-columns: repeat(${({ number }) => number + 2 || 3}, 1fr);
    border-radius: 4px;
    position: absolute;
    right: 0;
    bottom: 0;
    * {
        box-sizing: border-box;
    }
    svg {
        background-color: ${COLOR.primary02};
        color: ${COLOR.blue[0]};
        border: 1px solid ${COLOR.gray[4]};
        :hover {
            transform: scale(1.2);
            transition-duration: 0.3s;
            background-color: ${COLOR.blue[0]};
            cursor: pointer;
            color: ${COLOR.primary02};
            z-index: 99;
        }
    }
`;

export const PageBlock = styled.div`
    width: 21px;
    height: 21px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    cursor: pointer;
    color: ${({ isActive }) => (isActive ? COLOR.primary02 : COLOR.blue[0])};
    background-color: ${({ isActive }) => (isActive ? COLOR.blue[0] : COLOR.primary02)};
    border: 1px solid ${COLOR.gray[3]};
    transform: scale(${({ isActive }) => (isActive == true ? 1.2 : 1.0)});
    transition-duration: 0.3s;
    :hover {
        transform: scale(1.2);
        transition-duration: 0.3s;
        background-color: ${COLOR.blue[0]};
        color: ${COLOR.primary02};
    }
`;

export { Container };

import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    padding: 1rem;
    background: ${({ type }) => (type == 0 ? COLOR.green[5] : COLOR.blue[5])};
    border-radius: 2px;
    box-sizing: border-box;
    user-select: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    * {
        font-family: Lato;
    }
`;

export const Header = styled.div`
    padding-bottom: 1rem;
    color: ${COLOR.primary03};
    font-weight: bold;
    transition: border 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border-bottom: ${({ isScroll }) =>
        isScroll ? `2px solid ${COLOR.blue[2]}` : `2px solid transparent`};
`;

export const Title = styled.div`
    color: ${COLOR.blue[0]};
    font-weight: bold;
    width: 100%;
    outline: none;
    border: none;
    padding: 0;
`;

export const ItemContainer = styled.div`
    padding: 0.1rem 0;
`;

export const Status = styled.div`
    color: ${COLOR.red[0]};
    outline: none;
    border: none;
    padding: 0;
    margin-top: 0.5rem;
`;

export const Item = styled.div`
    background: ${COLOR.primary02};
    width: auto;
    height: auto;
    padding: 0.7rem;
    border-radius: 2px;
    display: flex;
    gap: 1rem;
    align-items: center;

    box-shadow: ${({ isDragging }) =>
        isDragging ? 'rgba(149, 157, 165, 0.2) 0px 8px 24px' : null};
    border: ${({ isDragging }) =>
        isDragging ? `2px solid ${COLOR.blue[0]}` : '2px solid transparent'};
    transition: box-shadow 0.3s;
    box-sizing: border-box;
`;

export const DetailText = styled.button`
    color: ${COLOR.primary03};
    background: ${({ red }) => (red ? COLOR.red[0] : COLOR.blue[0])};
    color: #fff;
    border: none;
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 900;
    width: fit-content;
    white-space: nowrap;
    padding: 0.5rem;
    letter-spacing: 0.05rem;
`;

export const DropContainer = styled.div`
    /* min-height: 250px;
    max-height: 500px; */

    flex: 0 1 auto;

    ::-webkit-scrollbar {
        display: none;
    }

    > div:nth-last-of-type(1) {
        padding-bottom: 0;
    }
`;

export const DropableContainer = styled.div`
    overflow: auto;
    flex: 1;
`;

export const Details = styled.div`
    margin-top: 0.5rem;
`;

export const Plus = styled.div`
    position: sticky;
    bottom: 0px;
    align-self: flex-start;
    height: 40px;
    margin-left: auto;
    margin-top: 0.5rem;
    border-radius: ${({ isBot }) => (isBot ? '4px' : '50%')};
    bottom: ${({ isBot, bottom }) => (isBot ? `${0}px` : `${bottom}px`)};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    svg {
        fill: ${COLOR.primary02};
    }
    :hover {
        filter: brightness(90%);
    }
    box-sizing: border-box;
    width: ${({ isBot }) => (isBot ? '100%' : '40px')};
    background: green;
    border: ${({ isBot, type }) => {
        if (!isBot) return `4px solid ${type == 0 ? COLOR.green[5] : COLOR.blue[5]}`;
        if (isBot) return `4px solid ${type == 0 ? COLOR.green[0] : COLOR.blue[0]}`;
    }};
    background: ${({ type }) => (type == 0 ? COLOR.green[0] : COLOR.blue[0])};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const Footer = styled.div`
    color: ${COLOR.primary03};
    font-weight: bold;
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    cursor: pointer;
    background: #fff;
    svg {
        fill: ${COLOR.blue[0]};
    }
    border-radius: 2px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    :hover {
        background: ${COLOR.blue[0]};
        color: #fff;
        svg {
            fill: #fff;
        }
    }
`;

export const SendBtn = styled.button`
    border: none;
    radius: 2px;
    background: ${COLOR.green[0]};
    color: #fff;
    cursor: pointer;
    font-family: Lato;
    font-weight: 900;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    padding: 1rem;
`;

export const GoalContainer = styled.div`
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 0 0 auto;

    [data-target='container'] {
        max-height: 53px;
    }
    [data-target='styled-button'] {
        height: 100%;
    }
`;

export const GoalDes = styled.span`
    font-weight: 600;
    font-size: 12px;
`;

export const ScoreBar = styled.input`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    font-weight: bold;
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid ${COLOR.blue[0]};
    font-family: Lato;
    box-sizing: border-box;
`;

export const Input = styled.input`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    font-weight: bold;
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid ${COLOR.blue[0]};
    font-family: Lato;
    box-sizing: border-box;
`;

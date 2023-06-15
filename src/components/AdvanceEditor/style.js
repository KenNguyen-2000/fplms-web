import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    padding: 6rem 10rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    gap: 0.5rem;
    display: grid;
    position: relative;
    grid-template-rows: 60px 1fr;
`;

export const EditorSideBar = styled.div`
    min-width: 400px;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.5rem;
`;

export const Header = styled.div`
    width: 100%;
    height: 100%;
    background: ${({ headColor }) => headColor || '#fff'};
    box-sizing: border-box;
    display: none;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${({ headColor }) => (headColor ? '#fff' : 'black')};
`;

export const BackBtn = styled.div`
    border: none;
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
    cursor: pointer;

    :hover {
        svg {
            fill: ${COLOR.red[0]};
        }
        color: ${COLOR.red[0]};
    }

    transition: all 0.3s;
    * {
        transition: all 0.3s;
    }
`;

export const BottomSide = styled.div`
    width: 100%;
    max-height: 100%;
    overflow: auto;
    display: flex;
    gap: 0.5rem;
`;

export const EditorContainer = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 0.5in;
    overflow: auto;
    cursor: text;
    background: #fff;
`;

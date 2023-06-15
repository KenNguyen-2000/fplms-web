import styled from 'styled-components';

import { COLOR } from '../../utils/style';
import { isNumber } from '../../utils/valid';

export const StyledContainer = styled.div`
    position: ${({ position }) => position};
    height: ${({ height }) => height || '100%'};
    width: ${({ width }) => width || '100%'};
    box-sizing: border-box;
    padding: ${({ padding }) => padding || '16px'};
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-shadow: ${({ shadow }) => (shadow ? 'rgba(0, 0, 0, 0.1) 0px 4px 12px' : null)};
    font-family: Segoe UI;
    z-index: -1;
    background: ${COLOR.primary02};
    border: ${({ border }) => (isNumber(border) ? `1px solid ${COLOR.gray[3]}` : null)};
    top: 80px;

    * {
        box-sizing: border-box;
    }
`;

export const StyledJumbotron = styled.div`
    width: 48px;
    height: 48px;
    background: ${COLOR.blue[0]};
    border-radius: 4px;
`;

export const StyledLine = styled.div`
    height: ${({ height }) => height || '1px'};
    width: ${({ width }) => width || '100%'};
    background: ${({ background }) => background || COLOR.gray[3]};
`;

export const StyledUL = styled.ul`
    list-style-type: none;
    margin-block-start: 0px;
    margin-block-end: 0px;
    padding-inline-start: 0px;
    height: ${({ expand, height }) => (expand ? height : 0)}px;
    overflow: hidden;
    transition: all 0.5s;

    li > div {
        padding-left: ${({ level }) => (isNumber(level) ? level * 16 : 16)}px;
    }
`;

export const StyledBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    svg {
        transition: all 0.5s;
        transform: rotate(${({ expand }) => (expand ? -180 : 0)}deg);
        border-radius: 50% !important;
    }
`;

export const StyledSection = styled.div`
    display: flex;
    gap: 16px;
    padding: 16px;
    align-items: center;
    cursor: pointer;
    user-select: none;
    color: ${COLOR.gray[1]};
    transition: all 0.05s ease-out;
    position: relative;

    ::before {
        content: '';
        position: absolute;
        right: 0;
        height: 24px;
        width: 5px;
        background: ${COLOR.blue[0]};
        display: ${({ expand }) => (expand ? 'block' : 'none')};
    }

    :hover {
        background: ${COLOR.blue[0]};
        color: white;

        ::before {
            background: ${COLOR.primary02};
        }

        svg {
            fill: ${COLOR.blue[0]};
            background: white;
        }
    }

    svg {
        fill: ${COLOR.primary02};
        font-size: 16px;
        background: ${COLOR.blue[0]};
        border-radius: 4px;
        padding: 4px;
        box-sizing: initial;
    }
`;

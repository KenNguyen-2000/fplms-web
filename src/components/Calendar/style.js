import styled from 'styled-components';

import { COLOR } from '../../utils/color';

const GAP = 1;

export const Container = styled.div`
    background: ${COLOR.primary02};
    max-width: 360px;
    width: 100%;
    height: 320px;
    border-radius: 10px;
    display: grid;
    grid-template-rows: 40px 1fr;
    gap: 4px;
    overflow: hidden;
    background: #ffffff;
    font-size: 13px;
    user-select: none;
    margin: 0 auto;
    position: relative;
    z-index: 9;
    * {
        box-sizing: border-box;
    }
    div {
        width: 100%;
        height: 100%;
    }
`;

export const StyledDateTime = styled.div`
    gap: ${GAP}px;
    display: grid;
    grid-template-rows: 40px 1fr;
`;

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #ffffff;
    svg {
        font-size: 1rem;
        padding: 4px;
        box-sizing: initial;
    }
`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    gap: ${GAP}px;
    overflow: hidden;
    background: #f2f2f2;
    border: 1px solid #f2f2f2;
`;

export const Row = styled.div`
    display: flex;
    gap: ${GAP}px;
`;

export const StyledDay = styled.div`
    background: ${({ background }) => background};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ today }) => (today ? COLOR.blue[0] : ({ color }) => color || COLOR.gray[1])};
    font-weight: ${({ today }) => (today ? 'bold' : 'normal')};
    cursor: ${({ cursor }) => cursor || 'pointer'};
    :hover {
        background: ${COLOR.gray[5]};
    }
`;

export const Flip = styled.span`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    transform: ${({ x }) => (x ? 'scaleX(-1)' : null)} ${({ y }) => (y ? 'scaleY(-1)' : null)};
    cursor: pointer;
`;

export const StyledMonth = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

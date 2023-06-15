import styled from 'styled-components';

import { COLOR, FLEX } from '../../utils/style';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid ${COLOR.blue[0]};
    border-radius: 4px;
    padding: 1rem;

    * {
        box-sizing: border-box;
        font-family: Lato;
    }

    svg {
        font-size: 1rem;
        fill: ${COLOR.blue[0]};
        cursor: pointer;
        ${FLEX.center}
    }
`;

export const StyledInput = styled.input`
    outline: none;
    width: 100%;
    min-height: 100%;
    border: none;
    text-align: center;
    padding: 0px;
`;

import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    max-width: 100%;
    height: auto;
    padding: 16px;
    display: flex;
    box-sizing: border-box;
    background: ${COLOR.blue[5]};
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 2px dashed ${COLOR.blue[0]};

    * {
        box-sizing: border-box;
        font-size: 1rem;
        color: ${COLOR.primary03};
    }

    svg {
        width: 4rem;
        height: 4rem;
        fill ${COLOR.blue[0]};
    }
`;

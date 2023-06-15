import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const StyledContainer = styled.div`
    height: auto;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 275px 1fr;
    grid-template-rows: 80px 1fr;
    z-index: 1;
`;

export const StyledHolder = styled.div`
    background: ${COLOR.blue[4]};
`;

export const StyledHeader = styled.div`
    max-height: 80px;
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 10;
    box-sizing: border-box;
    grid-column: 1 / -1;
`;

export const HeaderContainer = styled.div`
    z-index: 1;
`;

export const BodyContainer = styled.div`
    box-sizing: border-box;
    padding: 24px;
    min-height: 0; // make children fit to parent max height
`;

export const FooterContainer = styled.div`
    max-height: 200px;
    width: 100%;
`;

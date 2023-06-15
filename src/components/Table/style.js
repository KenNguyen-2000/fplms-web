import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    overflow: auto;
    height: fit-content;
    border-collapse: separate;
    border-spacing: 0;

    [data-target='row'] {
    }
`;

export const StyledHeader = styled.tr`
    box-sizing: border-box;
    font-size: 1rem;
    border-radius: 2px;
    align-items: center;
    max-height: 60px;
    gap: 1rem;
    height: 60px;
    transition: all 0.3s;
    cursor: pointer;
    color: #434343;
    margin: 0 1rem;
    font-weight: bold;
    position: sticky;
    top: 0;
    z-index: 5;
    background: #fff;

    td {
        padding: 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }
`;

export const StyledRow = styled.tr`
    box-sizing: border-box;
    font-size: 1rem;
    border-radius: 2px;
    align-items: center;
    max-height: 60px;
    gap: 1rem;
    height: 60px;
    transition: all 0.3s;
    cursor: pointer;
    color: #434343;
    margin: 0 1rem;

    td {
        padding: 0 1rem;
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    }

    :hover {
        background: #f1f1f1;
    }
`;

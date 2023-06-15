import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
    display: grid;
    row-gap: 5px;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    background-color: #eef2ff;
`;

const TableCell = styled.div`
    padding: 1rem;
    font-size: 1rem;
`;

const GroupInput = styled.input`
    background-color: #eef2ff;
    border: none;
    width: 100%;
`;

export { Container, Row, TableCell, GroupInput };

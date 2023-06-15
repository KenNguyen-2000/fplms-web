import { StyledRow, StyledHeader, StyledTable } from './style';

const Table = ({ columns, children }) => {
    return <StyledTable columns={columns}>{children}</StyledTable>;
};

const Row = (props) => {
    return (
        <StyledRow data-target="row" {...props}>
            {props.children}
        </StyledRow>
    );
};

const TableHeader = (props) => {
    return (
        <StyledHeader data-target="row" {...props}>
            {props.children}
        </StyledHeader>
    );
};

export default Table;

export { Row, TableHeader };

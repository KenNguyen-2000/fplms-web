import EmptyState from '../../assets/EmptyState.svg';
import { Container } from './style';

const NoResult = ({ children }) => {
    return (
        <Container data-target="no-result">
            <img src={EmptyState} alt="Empty State" />
            {children}
        </Container>
    );
};

export default NoResult;

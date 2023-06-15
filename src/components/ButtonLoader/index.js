import { Loader, StyledContainer } from './style';

const ButtonLoader = ({ isLoading }) => {
    return (
        <StyledContainer isLoading={isLoading}>
            <Loader />
        </StyledContainer>
    );
};

export default ButtonLoader;

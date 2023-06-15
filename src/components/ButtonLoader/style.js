import styled, { keyframes } from 'styled-components';

export const StyledContainer = styled.div`
    width: 100%;
    height: auto;
    display: ${({ isLoading }) => (isLoading ? 'flex' : 'none')};
    justify-content: ${({ isLoading }) => (isLoading ? 'center' : 'unset')};
    div {
        display: ${({ isLoading }) => (isLoading ? 'block' : 'none')};
    }
`;

const loading = keyframes`
    0%{
        transform: rotate(0turn);
    }
    
    100%{
        transform: rotate(1turn);
    }
`;

export const Loader = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #fff;
    animation: ${loading} 1s ease infinite;
`;

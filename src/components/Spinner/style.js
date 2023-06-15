import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
`;

export const Loader = styled.div`
    border: ${({ size }) => (size ? size + 'px' : '4px')} solid
        ${({ bg }) => bg || ' rgba(255, 255, 255, 0.5)'};
    border-top: ${({ size }) => (size ? size + 'px' : '4px')} solid
        ${({ color }) => color || '#767676'};
    border-radius: 50%;
    width: ${({ radius }) => (radius ? radius + 'px' : '40px')};
    height: ${({ radius }) => (radius ? radius + 'px' : '40px')};
    animation: ${spin} 4s infinite;
`;

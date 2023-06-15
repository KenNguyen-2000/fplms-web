import styled, { keyframes } from 'styled-components';

const StyledBig = styled.div`
    width: 481px;
    height: 481px;
    border-radius: 50%;
    position: relative;
    background: linear-gradient(
        228deg,
        #ff9900 12%,
        rgba(255, 153, 0, 0.66) 51.88%,
        rgba(255, 154, 2, 0) 89%
    );
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;

const upDown = keyframes`
    0% {
        transform: translateY(0px) ;
    }
    33% {
        transform: translateY(10px) ;
    }
    66% {
        transform: translateY(-10px) ;
    }
    100% {
        transform: translateY(0px) ;
    }
`;

const StyledSmall = styled.div`
    width: auto;
    height: auto;
    border-radius: 50%;
    position: absolute;
    top: ${({ top }) => (top ? `${top}px` : null)};
    left: ${({ left }) => (left ? `${left}px` : null)};
    right: ${({ right }) => (right ? `${right}px` : null)};
    bottom: ${({ bottom }) => (bottom ? `${bottom}px` : null)};
    animation: ${upDown} ${({ timing }) => timing || 10}s infinite linear;
`;

export { StyledBig, StyledSmall };

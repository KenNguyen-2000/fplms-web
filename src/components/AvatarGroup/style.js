import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
    from{
        transform: translateX(25px);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
`;

const Container = styled.div`
    display: flex;
    align-items: center;
    animation: ${fadeIn} 800ms ease-in-out forwards;
`;

const Avatar = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    position: relative;
    background-color: ${(props) => props.bg || '#333333'};
    margin-right: -10px;
    border: 1px solid #eef2ff;
    img {
        object-fit: cover;
        width: 100%;
        height: auto;
    }
`;

const HiddenAvatar = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    background: #faa3c3;
    color: #000000;
    font-size: 8px;
    border: 1px solid #eef2ff;
`;

export { Container, Avatar, HiddenAvatar };

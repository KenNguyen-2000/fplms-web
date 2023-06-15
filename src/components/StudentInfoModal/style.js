import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/style';

const fadeIn = keyframes`
  from{
    opacity: 0;
  }to{
    opacity: 1;
  }
`;

export const Wrapper = styled.div`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }
    height: 200px;
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    position: relative;
    overflow: hidden;
`;

export const Avatar = styled.div`
    position: absolute;
    top: 0;
    left: 15px;
    img {
        width: 140px;
        height: auto;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`;

export const Content = styled.div`
    width: 450px;
    height: 150px;
    background-color: ${COLOR.primary02};
    display: grid;
    grid-template-columns: auto 1fr;
    border-radius: 24px;
`;

export const Left = styled.div`
    width: 175px;
`;

export const Right = styled.div`
    width: 100%;
    padding: 30px 0 15px 0;
    color: ${COLOR.primary03};
`;

export const Label = styled.div`
    font-size: ${({ fS }) => fS || '1rem'};
    font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
    margin-bottom: 10px;
    svg {
        font-size: 30px;
    }
`;

export const Infomation = styled.div`
    margin: 5px 0;
    font-size: 1.2rem;
    font-style: italic;
`;

export const Badge = styled.div`
    width: 160px;
    position: absolute;
    left: 10px;
    bottom: 15px;
    opacity: 0;
    animation: ${fadeIn} 1s ease-in-out forwards;
    img {
        width: 100%;
        height: auto;
        min-height: 30px;
        object-fit: cover;
    }
    div {
        width: 160px;
        text-align: center;
        position: absolute;
        bottom: 15px;
        color: ${COLOR.primary02};
        font-weight: 600;
    }
`;

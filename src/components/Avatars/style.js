import styled from 'styled-components';

export const GroupAvatar = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0px 7px 0px 0px;
    z-index: 1;
`;

export const Avatar = styled.li`
    height: ${({ size }) => size || 49}px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    position: relative;
    width: ${({ size }) => size - 7 || 42}px;

    img,
    span {
        background: ${({ color }) => color || '#596376'};
        border: 2px solid ${({ outline }) => outline || '#fff'};
        border-radius: 100px 100px 100px 100px;
        color: #ffffff;
        display: block;
        font-family: Lato;
        font-size: 10px;
        height: ${({ size }) => size - 4 || 45}px;
        line-height: ${({ size }) => size - 4 || 45}px;
        text-align: center;
        width: ${({ size }) => size - 4 || 45}px;
    }
`;

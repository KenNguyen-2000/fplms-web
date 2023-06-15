import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    width: 600px;
    height: auto;
    background: green;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    border-radius: 4px;
    background: ${COLOR.primary02};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    display: block;

    * {
        box-sizing: border-box;
    }
`;

export const StyledHeader = styled.div`
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${COLOR.gray[2]};

    svg {
        box-sizing: border-box;
        padding: 4px;
        width: 2rem;
        height: 2rem;
        background: ${COLOR.red[0]};
        border-radius: 4px;
        fill: ${COLOR.primary02};
        cursor: pointer;
    }
`;

export const StyledBody = styled.div`
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;
    display: flex;
`;

export const StyledJumbotron = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Title = styled.div`
    font-weight: bold;
    color: ${COLOR.primary03};
`;

export const SubTitle = styled.div`
    font-weight: bold;
    color: ${COLOR.gray[1]};
`;

export const Row = styled.div`
    display: flex;
    gap: 16px;
`;

export const StyledInput = styled.input`
    border-radius: 4px;
    border: 1px solid ${COLOR.blue[0]};
    outline: none;
    padding: 1rem;
    font-family: Lato;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
    height: 100%;
    min-height: 51px;
    transition: all 300ms;

    :focus {
        border: 1px solid ${COLOR.blue[0]};
        background: ${COLOR.blue[5]};
    }
`;

export const Col = styled.div`
    display: flex;
    gap: 8px;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
`;

export const StyledSelection = styled.input`
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    outline: none;
    border: none;
    display: flex;
    padding: 1rem;
`;

export const StyledButton = styled.button`
    background: ${COLOR.blue[0]};
    font-weight: bold;
    color: white;
    border: none;
    padding: 16px;
    font-family: Lato;
    border-radius: 4px;
    cursor: ${({ disable }) => (disable ? 'not-allowed' : 'pointer')};
    pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};
    opacity: ${({ disable }) => (disable ? 0.5 : 1)};
`;

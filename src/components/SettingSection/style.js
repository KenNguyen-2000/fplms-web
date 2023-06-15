import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Row = styled.div`
    /* width: 100%; */
    display: flex;
    gap: 3rem;
    align-items: center;
`;
export const Col = styled.div`
    display: flex;
    flex-direction: column;
`;

export const OptContainer = styled.div`
    width: 100%;
    height: 1fr;
    padding: 2rem 3rem;
    position: relative;
`;

export const OptContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

export const Title = styled.h2`
    color: ${COLOR.primary03};
    width: 20%;
    font-size: 2rem;
    border-bottom: 1px solid #333;
    margin: 0;
    padding: 5px 0;
    padding-right: 10px;

    margin-bottom: 2rem;
`;

export const Label = styled.label`
    color: ${COLOR.primary03};
    font-size: 1.2rem;
`;

export const SelectionOuter = styled.div`
    align-self: center;
    width: fit-content;
`;

export const Input = styled.input`
    outline: none;
    border: ${({ edit }) => (edit ? `1px solid ${COLOR.blue[0]}` : 'none')};
    padding: 1rem 1rem;
    line-height: 1.2;
    font-size: 1.2rem;
    width: 100%;
    background-color: transparent;
`;

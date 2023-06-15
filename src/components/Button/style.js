import styled from 'styled-components';

import { COLOR } from '../../utils/style';

const StyledButton = styled.div`
    padding: 1rem;
    box-sizing: border-box;
    height: 100%;
    min-width: fit-content;
    display: flex;
    justify-content: space-between;
    gap: ${({ size }) => (size == 'lg' ? 1.5 : size == 'sm' ? 0.5 : 1) / 2}rem;
    background: ${COLOR.blue[0]};
    border: none;
    border-radius: 2px;
    color: ${COLOR.primary02};
    font-family: Lato;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.05s;

    :hover {
        background: ${COLOR.blue[1]};
    }
`;

export { StyledButton };

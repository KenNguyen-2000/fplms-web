import styled from 'styled-components';

export const ToolBar = styled.div`
    position: absolute;
    top: ${({ top }) => top || 0}px;
    left: ${({ left }) => left || 0}px;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    transform: translateY(-3.5rem) translateX(-50%);
    padding: 0.5rem;
    gap: 0.5rem;
    background: #f2f2f2;
    border-radius: 2px;
    overflow: hidden;
    z-index: 999;
    height: 30px;

    button {
        border: none;
        width: 30px;
        min-height: 100%;
    }
`;

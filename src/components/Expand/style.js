import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 100%;
`;

export const Title = styled.div`
    cursor: pointer;
    margin: 0.5rem 0;
`;

export const Expando = styled.div`
    padding: 0 1rem;
    overflow: hidden;
    max-height: ${({ isExpand }) => isExpand || 0}px;
    transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
`;

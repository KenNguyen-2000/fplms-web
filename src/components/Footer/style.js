import styled from 'styled-components';

const FSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
    margin-top: 25px;
    bottom: 0;
    left: 0;
    grid-area: footer;
`;

const FTitle = styled.div`
    font-size: 20px;
    text-transform: uppercase;
    padding: 10px 0;
`;

const FText = styled.div`
    text-align: center;
    max-width: 400px;
    font-size: 1rem;
    margin-bottom: 10px;
`;

const FLink = styled.a`
    text-decoration: none;
    font-size: 1rem;
`;

export { FSection, FTitle, FText, FLink };

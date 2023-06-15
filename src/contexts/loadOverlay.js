import { useState, createContext } from 'react';

import styled from 'styled-components';

import { Overlay, Spinner } from '../components';

const LoadOverLayContext = createContext();

const Container = styled.div`
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-family: Lato;
    font-size: 1.5rem;
    gap: 1rem;
    letter-spacing: 2px;
    font-weight: 600;
`;

export const LoadOverlayProvider = ({ children }) => {
    const [isActive, setActive] = useState(false);
    const [text, setText] = useState('');
    return (
        <LoadOverLayContext.Provider value={{ isActive, setActive, text, setText }}>
            <Overlay isOpen={isActive} dark={0.8} outDelay={0}>
                <Container>
                    <Spinner />
                    {text}
                </Container>
            </Overlay>
            {children}
        </LoadOverLayContext.Provider>
    );
};

export default LoadOverLayContext;

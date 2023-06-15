import styled from 'styled-components';

import { COLOR } from '../../utils/style';

const StyledContainer = styled.div`
    user-select: none;
    position: relative;
    height: 100vh;
    overflow: hidden;

    * {
        line-height: 1;
        box-sizing: border-box;
    }
`;

const StyledForm = styled.div`
    display: flex;
    gap: 24px;
    width: 330px;
    flex-direction: column;
    position: absolute;
    left: 4rem;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    padding: 32px;
    box-sizing: border-box;
    transition: all 0.5s;

    @media (max-width: 992px) {
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 4px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    }
`;

const GoogleButton = styled.button`
    background: ${COLOR.blue[1]};
    color: ${COLOR.primary02};
    padding: 16px;
    width: 100%;
    font-size: 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 600;
    transition: 0.3s;
    font-family: Lato;
    max-width: 310px;

    :hover {
        background: ${COLOR.blue[0]};
    }
`;

const StyledTitle = styled.div`
    font-family: Montserrat;
    font-weight: bold;
    font-size: 2.5rem;
    color: ${COLOR.primary03};

    span {
        color: ${COLOR.blue[0]};
    }
`;

const StyledTerm = styled.div`
    font-size: 1px;
`;

const StyledWelcome = styled.div`
    font-size: 2rem;
    color: ${COLOR.blue[0]};
`;

const StyledParagraph = styled.div`
    font-size: 1rem;
    color: ${COLOR.primary03};
    font-weight: ${({ isBold }) => (isBold ? 'bold' : '')};
    line-height: 1.5;

    span {
        color: ${COLOR.blue[0]};
    }
`;

const ParticlesContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const ImageGroup = styled.div`
    width: 633px;
    height: 633px;
    position: absolute;
    right: 3rem;
    top: 50%;
    transform: translateY(-50%);

    @media (max-width: 992px) {
        left: 50%;
        right: 0;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

export {
    GoogleButton,
    StyledContainer,
    StyledTitle,
    StyledTerm,
    StyledWelcome,
    StyledParagraph,
    ParticlesContainer,
    ImageGroup,
    StyledForm,
};

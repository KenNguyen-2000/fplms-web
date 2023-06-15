import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Container = styled(motion.div)`
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 11;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ModalBox = styled(motion.div)`
    width: fit-content;
    height: fit-content;
`;

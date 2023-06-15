import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

const placeHolderShimmer = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;

export const SkeletonContainer = styled(motion.div)`
    border-radius: 2px;
    width: 20ch;
`;

export const Container = styled(motion.div)`
    font-size: inherit;
    width: 100%;
    height: 100%;
    color: transparent;
    user-select: none;
    animation-duration: ${({ duration }) => duration}s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${placeHolderShimmer};
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, ${({ bg }) => bg} 8%, #dddddd 18%, ${({ bg }) => bg} 33%);
    background-size: 1000px 104px;
`;

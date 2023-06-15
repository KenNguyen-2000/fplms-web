import { motion } from 'framer-motion';
import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    box-sizing: border-box;
    /* background: ${({ isEnroll }) => (isEnroll ? COLOR.green[5] : COLOR.blue[0])}; */
    position: relative;
    border-radius: 2px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    /* border: 2px solid ${COLOR.blue[0]}; */

    * {
        box-sizing: border-box;
        color: ${COLOR.primary03};
        transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    .view-mark {
        position: absolute;
        right: 1.5rem;
        top: 2rem;
        display: flex;
        align-items: center;
        font-size: 10px;
        color: ${COLOR.blue[1]};
        cursor: pointer;
        z-index: 2;
    }
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: 1.5rem;
`;

export const Row = styled.div`
    display: flex;
    gap: ${({ gap }) => gap || '8px'};
    align-items: center;
    height: auto;
    perspective: 550px;

    input {
        border: none;
        background: transparent;
        padding: 0;
        font-size: 1rem;
        outline: none;
    }
`;

export const DetailText = styled.div`
    color: ${COLOR.primary03};
    background: ${COLOR.blue[0]};
    color: #fff;
    padding: 0.5rem;
    border-radius: 2px;
    font-size: 0.75rem;
    font-weight: 900;
`;

export const InputContainer = styled.div`
    width: ${({ open }) => (open ? '100%' : '0')};
    overflow: hidden;
    height: 100%;
    transition: all 0.3s;
`;

export const StyledInput = styled.input`
    border: 2px solid ${COLOR.blue[0]};
    padding: 0 0.5rem;
    outline: none;
    width: 100%;
    border-radius: 2px;
    height: 100%;
    box-sizing: border-box;
    background: transparent;
    color: ${COLOR.blue[0]};
    ::placeholder {
        font-family: Lato;
    }
`;

const placeHolderShimmer = keyframes`
    0%{
        background-position: -468px 0
    }
    100%{
        background-position: 468px 0
    }
`;

export const SkeletonContainer = styled.div`
    background: #f6f7f8;
    min-height: 223.38px;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 1rem;
`;

export const HolderItem = styled.div`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: ${placeHolderShimmer};
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dddddd 18%, #eeeeee 33%);
    background-size: 1000px 104px;
`;

export const MiniDetails = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const Email = styled.div`
    color: ${COLOR.gray[0]};
`;

const BtnSize = 3;

export const StyledButton = styled.div`
    width: 100%;
    height: ${BtnSize}rem;
    transform-style: preserve-3d;
    position: relative;
    transition: all 0.3s;
    transform: translateZ(0) ${({ open }) => (open ? 'rotateX(-90deg)' : 'rotateX(0deg)')};
    transform-origin: center center -${BtnSize / 2}rem;
    > * {
        border-radius: 2px;
    }
`;

export const Front = styled.button`
    transform: rotateY(0deg);
    background: ${({ isEnroll }) => (isEnroll ? COLOR.green[0] : COLOR.blue[0])};
    color: ${COLOR.primary02};
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    position: absolute;
    transition: all 0.3s;
    text-align: center;
    font-weight: 600;
    cursor: pointer;
`;

export const Back = styled.div`
    position: absolute;
    transform: rotateX(90deg) translateZ(${BtnSize / 2}rem) translateY(-${BtnSize / 2}rem);
    width: 100%;
    height: 100%;
`;

export const JoinButton = styled.div`
    width: ${BtnSize}rem;
    height: 100%;
    position: absolute;
    right: 0;
    top: 0;
    background: ${COLOR.blue[0]};
    border-radius: 0 2px 2px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: ${({ onLoad }) => (onLoad ? 'not-allowed' : 'pointer')};
    transition: all 0.5s;
    svg {
        fill: #fff;
    }
    :hover {
        filter: brightness(95%);
    }
`;

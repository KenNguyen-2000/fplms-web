import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/style';

const openInput = keyframes`
    0%{
        width: 10px;
        height: 0px;
    }
    10%{
        top: 0;
        height: 58px;
    }
    80%{
        top: 0;
        height: 58px;
    }
    100%{
        top: 0;
        width: 100%;
        height: 58px;
        background-color: ${COLOR.primary02};
        border: 1px solid ${COLOR.blue[0]};
    }
`;

const loader = keyframes`
    from{
        transform: rotate(1turn);
    }
    to{
        transform: rotate(2turn);
    }
`;

export const Wrapper = styled.div`
    * {
        box-sizing: border-box;
    }
    max-width: 100vw;
    height: 100vh;
    padding: 0 18vw;
    padding-top: 120px;
    background-color: ${COLOR.gray[1]};
    position: relative;
    @media (max-width: 992px) {
        padding-left: 6vw;
        padding-right: 6vw;
    }
    @media (max-width: 900px) {
        padding: 120px 0 1vw;
    }

    .active {
        color: ${COLOR.primary02};
        background-color: ${COLOR.blue[0]};
    }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 500px;
    min-width: 800px;
    border-radius: 8px;
    background-color: ${COLOR.primary02};
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    /* overflow: hidden; */
`;

export const RightSetting = styled.div`
    width: 25%;
    height: 1fr;
    min-width: fit-content;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    padding: 3vw 0;
    padding-left: 15px;
    padding-right: 30px;
    font-size: 1.2rem;
    gap: 20px;
    @media (max-width: 992px) {
        padding: 4vw 5vw 3vw 3vw;
        width: 25%;
    }
    @media (max-width: 768) {
        min-width: unset;
        padding: 4vw 5vw 3vw 3vw;
        width: 25%;
    }
`;
export const LeftSetting = styled.div`
    width: 70%;

    height: 1fr;
    flex-grow: 1;
    padding: 3vw;
    position: relative;
`;
export const SettingBody = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
    position: relative;
    #subject-name-input {
        min-height: 55px;
        outline: none;
        border: 1px solid ${COLOR.blue[0]};
        padding: 0 1rem;
        font-size: 1rem;
        color: ${COLOR.primary03};
    }
    .subject-icon {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;
        svg:nth-of-type(1) {
            color: ${({ isAdding }) => (isAdding ? COLOR.red[0] : COLOR.blue[0])};
            transform: rotate(${({ isAdding }) => (isAdding ? '135deg' : '0')});
            transition: transform 1s ease-in-out;
        }
        svg:nth-of-type(2) {
            fill: ${COLOR.green[0]};
        }
        svg:nth-of-type(3) {
            fill: ${COLOR.red[0]};
        }
        svg {
            cursor: pointer;
            :hover {
                transform: scale(1.2);
                transition: transform 150ms ease-in-out;
            }
        }
    }
    #add-subject {
        outline: none;
        border: none;
        color: ${COLOR.primary03};
        font-size: 1.2rem;
        padding: 0 1rem;
        display: ${({ isAdding }) => (isAdding ? 'block' : 'none')};
        position: absolute;
        top: 25px;
        left: 0;
        z-index: 2;
        background-color: ${COLOR.blue[0]};
        transform-origin: center;
        animation: ${openInput} 1.5s ease-in-out forwards;
    }
`;

export const SettingTitle = styled.div`
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 20px;
`;
export const SettingLabel = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
    border-radius: 100px;
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    :hover {
        color: ${COLOR.primary02};
        background-color: ${COLOR.blue[0]};
    }

    cursor: pointer;
`;

export const Loader = styled.div`
    position: absolute;
    width: 100px;
    height: 100px;
    border: 10px solid transparent;
    border-radius: 50%;
    border-top-color: ${COLOR.blue[0]};
    animation: ${loader} 1s ease-in-out infinite;

    top: 20%;
    right: 0;
    left: 0;
    margin: auto;
`;

export const SemesterCard = styled.div`
    max-width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-radius: 4px;
    min-height: 120px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    padding: 15px;
    position: relative;
    transition: transform 200ms ease-in-out;
    color: ${COLOR.primary03};

    .edit-icon {
        position: absolute;
        top: 15px;
        right: 15px;
        color: ${COLOR.primary03};
    }
    & span {
        margin-left: 20px;
    }
`;

export const CardTitle = styled.h3`
    font-weight: 600;
    font-size: 1rem;
    text-transform: uppercase;
    color: ${COLOR.primary03};
    margin: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AddingCard = styled.div`
    max-width: 100%;
    border-radius: 4px;
    overflow: hidden;
    min-height: 120px;
    border: 2px solid ${COLOR.gray[0]};
    padding: 15px;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    .add-icon {
        display: ${({ isShow }) => (!isShow ? 'block' : 'none')};
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 4rem;
        color: ${COLOR.gray[0]};
        cursor: pointer;
    }
    .close-icon {
        position: absolute;
        right: 15px;
        top: 15px;
        :hover {
            transform: scale(1.2);
        }
    }

    #semester-input {
        width: 70%;
        border-radius: 4px;
        border-color: rgba(0, 0, 0, 0.23);
        margin-bottom: 15px;
        padding: 5px 15px;
    }
`;

export const AddingLoader = styled.div`
    height: 50px;
    width: 50px;
    border: 7px solid transparent;
    border-top-color: ${COLOR.blue[0]};
    border-radius: 50%;
    align-self: center;
    animation: ${loader} 1s ease-in-out infinite;
`;

export const Button = styled.button`
    outline: none;
    background-color: transparent;
    border: 1px solid ${COLOR.green[0]};
    padding: 5px 15px;
    border-radius: 4px;
    :hover:enabled {
        cursor: pointer;
        background-color: ${COLOR.green[0]};
        color: ${COLOR.primary02};
    }
    :disabled {
        cursor: default;
    }
`;

export const Dropdown = styled.div`
    position: relative;
    .sub-option {
        padding: 0;
        border: none;
        background-color: unset;
        height: 30px;
        cursor: pointer;
    }
    &:hover > .sub-option + .dropdown-menu {
        opacity: 1;
        pointer-events: auto;
        transform: translateY(0);
    }
`;

export const DropdownMenu = styled.div`
    position: absolute;
    right: 0;
    width: fit-content;
    padding: 0.3rem 0.4rem;
    top: calc(100% + 0.05rem);
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    z-index: 99;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    opacity: 0;
    pointer-events: none;
    svg {
        align-self: flex-end;
        border-radius: 50%;
        margin: 2px 0;
        cursor: pointer;
        &:hover {
            transform: scale(1.3);
            transition: all 150ms ease-in-out;
        }
    }
`;

export const DropdownItem = styled.div`
    width: 100%;
    height: auto;
`;

import styled from 'styled-components';

import { COLOR } from '../../utils/style';

const HContainer = styled.header`
    width: 100%;
    max-height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-sizing: border-box;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 1rem;
    position: fixed;
    top: 0;
    z-index: 5;
`;

const HLogo = styled.div`
    img {
        width: 100%;
        max-height: 70px;
        object-fit: cover;
    }
`;

const HIcons = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: space-between;
`;

export const BtnContainer = styled.div`
    text-decoration: none;
    border-radius: 50%;
    position: relative;

    svg {
        font-size: 24px;
        color: #5680f9;
        background-color: #dde6fe;
        border-radius: 50%;
        padding: 12px;
    }

    :hover {
        cursor: pointer;
    }
    svg {
        font-size: 24;
        color: #5680f9;
        background-color: #dde6fe;
        border-radius: 50%;
        padding: 8px;
    }
`;

export const NotificationContainer = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    overflow: auto;
    width: 300px;
    max-height: 500px;
    padding: 1rem;
    right: 0px;
    top: 80px;
    border-radius: 2px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const NotificationHeader = styled.div`
    font-weight: 900;
    margin: 0.5rem 0 1rem 0;
    font-size: 1.25rem;
    color: ${COLOR.blue[0]};
    letter-spacing: 0.05rem;
`;

export const NotificationBody = styled.div`
    display: flex;
    gap: 1px;
    width: 100%;
    height: auto;
    background: ${COLOR.blue[0]};
    flex-direction: column;
`;

export const NotiContainer = styled.div`
    display: flex;
    height: fit-content;
    background: #fff;
    padding: 1rem 0;

    svg {
        background: ${COLOR.blue[0]};
        padding: 0.8rem;
        fill: #fff;
        border-radius: 2px;
    }
`;

export const NotiInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;

    small {
        color: gray;
    }

    :hover {
        background: #f2f2f2;
    }
`;

export const NotiTarget = styled.div`
    color: ${COLOR.primary03};
    font-weight: bold;
`;

export const UserContainer = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    position: absolute;
    flex-direction: column;
    gap: 1rem;
    width: 300px;
    height: auto;
    padding: 1rem;
    right: 0px;
    top: 80px;
    border-radius: 2px;
    background: #fff;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const NotiNews = styled.div`
    display: ${({ isDisplay }) => (isDisplay ? 'flex' : 'none')};
    width: 14px;
    height: 14px;
    font-size: 10px;
    justify-content: center;
    align-items: center;
    border: 2px solid #fff;
    position: absolute;
    top: 0;
    right: 0;
    color: #fff;
    border-radius: 50%;
    background: ${COLOR.red[0]};
`;

export { HContainer, HLogo, HIcons };

import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/color';

const loading = keyframes`
0%{
    background-position: -450px 0;
}
100%{
    background-position: 450px 0;
}
`;

export const Card = styled.div`
    width: 100%;
    max-width: 700px;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid ${COLOR.gray[2]};
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    margin: 1rem 0;
`;
export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        height: 1rem;
        width: 150px;
        background-color: #d9d9d9;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        ::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-image: linear-gradient(
                to right,
                #d9d9d9 0%,
                rgba(0, 0, 0, 0.05) 20%,
                #d9d9d9 40%,
                #d9d9d9 100%
            );
            background-repeat: no-repeat;
            background-size: 90px 80px;
            animation: ${loading} 1s linear 0.2s infinite;
        }
    }
    span {
        height: 1rem;
        width: 80px;
        background-color: #d9d9d9;
        border-radius: 10px;
        position: relative;
        overflow: hidden;
        ::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-image: linear-gradient(
                to right,
                #d9d9d9 0%,
                rgba(0, 0, 0, 0.05) 20%,
                #d9d9d9 40%,
                #d9d9d9 100%
            );
            background-repeat: no-repeat;
            background-size: 450px 400px;
            animation: ${loading} 1s linear 0.22s infinite;
        }
    }
`;
export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
    div {
        height: 15px;
        background-color: #d9d9d9;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        ::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-image: linear-gradient(
                to right,
                #d9d9d9 0%,
                rgba(0, 0, 0, 0.05) 20%,
                #d9d9d9 40%,
                #d9d9d9 100%
            );
            background-repeat: no-repeat;
            background-size: 450px 400px;
            animation: ${loading} 1s linear 0.2s infinite;
        }
    }
    div:nth-child(1) {
        width: 80%;
    }
    div:nth-child(2) {
        width: 90%;
    }
    div:nth-child(3) {
        width: 60%;
    }
    div:nth-child(4) {
        width: 50%;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${COLOR.gray[2]};
`;

export const CardFooter = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    .image {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: #d9d9d9;
        overflow: hidden;
        position: relative;
        ::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-image: linear-gradient(
                to right,
                #d9d9d9 0%,
                rgba(0, 0, 0, 0.05) 20%,
                #d9d9d9 40%,
                #d9d9d9 100%
            );
            background-repeat: no-repeat;
            background-size: 650px 600px;
            animation: ${loading} 1s linear infinite;
        }
    }
    .author {
        height: 12px;
        width: 150px;
        border-radius: 8px;
        background-color: #d9d9d9;
        overflow: hidden;
        position: relative;
        ::before {
            position: absolute;
            content: '';
            height: 100%;
            width: 100%;
            background-image: linear-gradient(
                to right,
                #d9d9d9 0%,
                rgba(0, 0, 0, 0.05) 20%,
                #d9d9d9 40%,
                #d9d9d9 100%
            );
            background-repeat: no-repeat;
            background-size: 450px 400px;
            animation: ${loading} 1s linear infinite;
        }
    }
`;

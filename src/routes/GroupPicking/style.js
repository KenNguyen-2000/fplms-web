import styled, { keyframes } from 'styled-components';

import { COLOR } from '../../utils/color';

const loading = keyframes`
    from{
        transform: rotate(1turn);
    }
    to{
        transform: rotate(2turn);
    }
`;

const Container = styled.div`
    * {
        box-sizing: border-box;
    }
    max-width: 100%;
`;

export const Loader = styled.div`
    height: 80px;
    width: 80px;
    border: 7px solid transparent;
    border-radius: 50%;
    border-top-color: ${COLOR.blue[0]};
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    margin: auto;
    animation: ${loading} 1s ease infinite;
`;

const Banner = styled.div`
    width: 100%;
    height: 250px;
    background-color: ${COLOR.blue[2]};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 4rem;
    img {
        border-radius: 8px;
        height: 100%;
        width: auto;
        object-fit: cover;
    }
    @media (max-width: 992px) {
        height: 200px;
        padding: 1rem 3rem;
    }
    @media (max-width: 768px) {
        padding: 1rem 2rem;
    }
`;

export const BannerTitle = styled.h1`
    margin: 0;
    margin-top: 50px;
    font-size: 2rem;
    color: ${COLOR.primary02};
    align-self: flex-start;
    @media (max-width: 992px) {
        font-size: 1.7rem;
        margin-top: 35px;
    }
`;

const GroupLabel = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px 0;
`;

const Title = styled.div`
    font: 1rem;
    font-family: Lato;
    text-transform: uppercase;
    color: ${COLOR.gray[0]};
`;

const CreateGroupBtn = styled.button`
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${COLOR.primary02};
    background-color: ${COLOR.blue[1]};
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    margin-left: 5px;
    :hover {
        cursor: pointer;
        background-color: ${COLOR.blue[2]};
    }
`;

const GroupList = styled.div`
    width: 100%;
    min-height: 150px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fix-content;
    gap: 20px;
    position: relative;
    @media (max-width: 1400px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 1200px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

export { Banner, Container, Title, GroupList, GroupLabel, CreateGroupBtn };

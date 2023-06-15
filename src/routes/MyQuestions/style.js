import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const StyledContainer = styled.div`
    max-width: 1100px;
    margin: 10px auto;
    * {
        box-sizing: border-box;
    }
`;

export const StyledHeader = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    margin: 10px 0 30px 0;
`;
export const Row = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
`;
export const Column = styled.div`
    display: flex;
    flex-direction: column;
    span {
        margin-bottom: 5px;
    }
`;

export const NewTopicBtn = styled.button`
    font-size: 1rem;
    color: ${COLOR.primary02};
    padding: 12px 16px;
    background: ${COLOR.blue[1]};
    border-radius: 4px;
    border: none;
    display: flex;
    align-items: flex-end;
    :hover {
        cursor: pointer;
        transform: scale(1.05);
        transition: 0.3s ease-in-out;
        svg {
            transform: rotate(0.5turn);
            transition: 1s ease;
        }
    }
    :not(:hover) {
        svg {
            transform: rotate(-0.5turn);
            transition: 1s ease;
        }
    }
    svg {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }
`;

export const Label = styled.small`
    margin-bottom: 0.5rem;
`;

export const InputBox = styled.input`
    padding: 1rem;
    width: 300px;
    background-color: #eef2ff;
    border-radius: 2px;
    border: 1px solid #5680f9;
    color: ${COLOR.primary03};
    font-size: 1rem;
    outline: none;
    display: flex;
    line-height: 1.5;
`;

export const StyledBody = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto;
    gap: 30px;
    margin: 15px 0;
    @media (max-width: 1250px) {
        grid-template-columns: 1fr auto;
        gap: 10px;
    }
    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
`;

export const PostList = styled.div`
    width: 100%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const TypeSelection = styled.div`
    max-width: 200px;
`;

export const PaginateContainer = styled.div`
    width: 100%;
    max-width: 700px;
    height: 40px;
    position: relative;
`;

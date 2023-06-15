import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const Container = styled.div`
    max-width: 100%;
    width: 100%;
    margin: 0 auto;
`;

export const Hero = styled.div`
    width: 100%;
    height: 350px;
    background: ${COLOR.blue[0]};
    border-radius: 8px;
`;

export const SearchBar = styled.div`
    height: 100%;
    width: 100%;
    display: flex;

    [data-target='styled-button'] {
        border-right: none;
        border-radius: 2px 0 0 2px;
    }
`;

export const StyledInput = styled.input`
    border-left: none;
    border-radius: 0 2px 2px 0;
    font-size: 1rem;
    width: 100%;
    font-family: Lato;
    border: 1px solid #5680f9;
    padding: 1rem;
    height: 100%;
    outline: none;
    box-sizing: border-box;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    :focus {
        background-color: ${COLOR.blue[5]};
    }
`;

export const StyledList = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: fit-content;
    gap: 24px;

    @media (max-width: 1600px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
    @media (max-width: 1300px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 992px) {
        grid-template-columns: 1fr;
    }
`;

export const ToolBar = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
    align-items: center;
    gap: 1rem;
    height: 49px;
`;

export const SelectionContainer = styled.div`
    height: 100%;
    width: auto;

    [data-target='container'] {
        height: 100%;
        background: ${COLOR.blue[0]};
    }
    [data-target='styled-button'] {
        padding: 1rem;
        height: 100%;
        box-sizing: border-box;
        background: transparent;
        svg {
            fill: #fff;
        }
    }

    [data-target='list'] {
        right: 0;
        min-width: 200px;
    }
`;

export const NoResultContainer = styled.div`
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
    align-items: center;
    height: 100%;
`;

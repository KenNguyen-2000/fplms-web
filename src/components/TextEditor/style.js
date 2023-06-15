import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    * {
        box-sizing: border-box;
    }
    & > div {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
`;
export const Wrapper = styled.div`
    width: fit-content;
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .wrapperClassName {
        width: 100%;
        max-width: 720px;
    }

    .editorClassName {
        width: 100%;
        border: 1px solid #888888;
        min-height: 200px;
        border-radius: unset;
        border-top: unset;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        padding-right: 15px;
        padding-left: 15px;
        cursor: text;
    }

    .toolbarClassName {
        width: 100%;
        margin-bottom: 0;
        border: 1px solid #888888;
        border-radius: unset;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        padding: 0;
        padding: 0px 5px 0 5px;
        display: flex;
        flex-wrap: nowrap;
        div {
            border: none;
        }

        & > div {
            border-right: 1px solid #888888;
            margin: 0;
            max-width: 80px;
        }
        & > div:last-child {
            border: none;
        }
    }
`;

export const Title = styled.div`
    font-weight: bold;
    font-size: ${({ sz }) => sz || `1.2rem`};
    margin: ${({ mg }) => mg || 0};
`;

export const SubTitle = styled.div`
    color: ${COLOR.primary03};
    font-size: 0.8rem;
    margin-bottom: 5px;
`;

export const TitleBlock = styled.input`
    width: 100%;
    max-width: 720px;
    border: 1px solid #888888;
    border-radius: 4px;
    outline: none;
    font-size: 1rem;
    line-height: 1.5;
    color: ${COLOR.primary03};
    padding: 5px 15px 5px 15px;
    margin-bottom: 25px;
`;

export const CreateBtn = styled.div`
    width: fit-content;
    min-width: 100px;
    font-size: 1rem;
    color: ${COLOR.primary02};
    padding: 12px 16px;
    background: ${COLOR.blue[0]};
    border-radius: 4px;
    border: none;
    align-self: flex-end;
    display: flex;
    pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
    :hover {
        cursor: pointer;
        transform: scale(1.05);
    }
    span {
        display: ${({ isLoading }) => (isLoading ? 'none' : 'inline')};
    }
`;

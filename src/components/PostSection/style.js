import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const Container = styled.div`
    width: 100%;
    padding: 16px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: ${COLOR.blue[5]};
    border-radius: 4px;
`;

export const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Title = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${COLOR.blue[0]};
    cursor: pointer;
`;

export const Course = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[0]};
`;

export const PostContent = styled.div`
    max-width: 100%;
    font-size: 1rem;
    word-break: break-all;
    color: ${COLOR.primary03};
    cursor: pointer;
`;

export const FeatureList = styled.div`
    display: flex;
    gap: 8px;
`;

export const PostFeature = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[1]};
    background-color: ${COLOR.blue[4]};
    padding: 2px;
    border-radius: 4px;
    :hover {
        cursor: pointer;
        transform: scale(1.1);
        transition: 0.1s ease-in-out;
    }
`;

export const Divider = styled.div`
    width: 100%;
    height: 1px;
    background-color: ${COLOR.blue[3]};
`;

export const Author = styled.div`
    display: flex;
    align-items: center;
    font-size: 10px;
    cursor: pointer;
    color: ${COLOR.primary03};
    gap: 5px;
    p {
        margin: 0 8px;
    }
    span {
        color: ${COLOR.blue[2]};
        :hover {
            color: ${COLOR.blue[0]};
        }
    }
    img {
        width: 21px;

        height: auto;
        object-fit: cover;
        border-radius: 50%;
        &[alt] {
            font-size: 0.5rem;
        }
    }
`;

export const AuthorAva = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: ${COLOR.blue[3]};
`;

export const Answers = styled.div`
    font-size: 1rem;
    color: ${COLOR.red[2]};
`;

export const Vote = styled.div`
    align-self: flex-start;
    max-height: 80px;
    margin-left: 24px;
    margin-right: 12px;
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${COLOR.gray[0]};
    font-size: 30px;
    line-height: 0.4;
    svg {
        color: ${({ upvoted }) => (upvoted ? COLOR.green[0] : COLOR.gray[0])};
        font-size: 50px;
        cursor: pointer;
    }
    div {
        font-style: oblique;
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
    padding: 0.75rem;
    top: 80%;
    background-color: ${COLOR.primary02};
    border-radius: 4px;
    box-shadow: 0px 2px 5px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    z-index: 10;
    transform: translateY(-10px);
    transition: opacity 150ms ease-in-out, transform 150ms ease-in-out;
    opacity: 0;
    pointer-events: none;
    svg {
        align-self: flex-end;
        border-radius: 50%;
        margin: 2px 0;
        cursor: pointer;
        &:first-child {
            color: ${COLOR.red[1]};
        }
        &:nth-child(2) {
            color: ${COLOR.primary03};
        }
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

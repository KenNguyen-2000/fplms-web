import styled from 'styled-components';

import { InputNumber } from '../../components';
import { COLOR } from '../../utils/style';

import { TextareaAutosize } from '@mui/material';

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 24px;
    overflow: auto;

    * {
        font-family: Lato;
    }
`;

export const StyledList = styled.div`
    display: flex;
    gap: 0.5rem;
    min-width: 100%;
    overflow: auto;
    flex-direction: column;
`;

export const NeResultContainer = styled.div`
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: center;
    flex: 1 0 auto;
    align-items: center;
`;

export const StyledItem = styled.div`
    box-sizing: border-box;
    font-size: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    height: fit-content;
    background: ${({ feedback }) => (feedback ? COLOR.green[5] : COLOR.blue[5])};
`;

export const Content = styled.div``;

export const SideBar = styled.div`
    height: fit-content;
    z-index: 9;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 100%;

    [data-target='list'] {
        z-index: 10;
    }

    [data-target='container'] {
        margin-bottom: 1rem;
    }
`;

export const CommingContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 1;
    overflow: auto;

    [data-target='styled-button'] {
        position: sticky;
        bottom: 0;
        max-height: 49px;
        align-items: center;
        justify-content: center;
    }
`;

export const Icon = styled.div`
    width: fit-content;
    height: fit-content;

    svg {
        padding: 1rem;
        background: ${COLOR.blue[5]};
        fill: ${COLOR.blue[0]};
        border-radius: 4px;
        display: block;
    }
`;

export const CommingSection = styled.div`
    display: flex;
    gap: 1rem;
    height: fit-content;
`;

export const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

export const CommingTitle = styled.div`
    font-weight: bold;
    font-size: 1rem;
`;

export const Status = styled.div`
    font-size: 0.75rem;
    color: ${({ status }) => {
        switch (status) {
            case 'done':
                return COLOR.green[0];
            case 'missed':
                return COLOR.red[0];
        }
    }};
`;

export const StyledH4 = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0;
`;

export const Round = styled.span`
    border-radius: 50%;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Select = styled.div`
    max-width: 200px;
`;

export const PickContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex: 0 1 auto;
`;

export const UnPickTitle = styled.div`
    font-weight: 900;
    letter-spacing: 0.05rem;
    font-size: 1.25rem;
    color: ${COLOR.blue[0]};
`;

export const UnPickDes = styled.p``;

export const TopicList = styled.div`
    width: 100%;
    height: auto;
    gap: 0.5rem;
    display: flex;
    flex-direction: column;
`;

export const Topic = styled.div`
    display: grid;
`;

export const PickHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    border-radius: 2px;
    padding: 1rem;

    span {
        font-size: 1.25rem;
    }
`;

export const PickBtn = styled.button`
    padding: 0.5rem;
    background: ${COLOR.blue[0]};
    border-radius: 2px;
    cursor: pointer;
    border: 2px solid ${COLOR.primary02};
    box-sizing: border-box;
    color: ${COLOR.primary02};
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    :hover {
        background: ${COLOR.primary02};
        color: ${COLOR.blue[0]};
    }
`;

export const Title = styled.div``;
export const Type = styled.small`
    text-transform: uppercase;
    padding: 0.5rem;
    background: ${({ type }) => (type == 'cycle' ? COLOR.blue[0] : COLOR.green[0])};
    width: fit-content;
    border-radius: 2px;
    font-weight: bold;
    color: white;
`;

const columns = `200px 1fr 200px 200px`;

export const TableHeader = styled.div`
    font-weight: bold;
    display: grid;
    align-items: center;
    grid-template-columns: ${columns};
    gap: 1rem;
    box-sizing: border-box;
    padding: 1.5rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    position: sticky;
    top: 0;
    z-index: 10;
    background: #fff;
`;

export const StyledItemLec = styled.div`
    box-sizing: border-box;
    font-size: 1rem;
    padding: 0rem 1.5rem;
    border-radius: 2px;
    display: grid;
    align-items: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 5px 0px, rgba(0, 0, 0, 0.1) 0px 0px 1px 0px;
    grid-template-columns: ${columns};
    gap: 1rem;
    height: fit-content;
    transition: all 0.3s;
    cursor: pointer;
    color: #434343;

    :hover {
        background: #f1f1f1;
    }
`;

export const ScoreBoard = styled.div`
    width: 300px;
    height: 300px;
    transform: translateX(-100%);
    top: 6rem;
    left: 5rem;
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const CommentInput = styled(TextareaAutosize)`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    background-color: ${COLOR.primary02};
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    font-family: Lato;
    color: ${COLOR.primary03};
    box-sizing: border-box;
`;

export const ScoreBar = styled(InputNumber)`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    font-weight: bold;
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    background: ${COLOR.blue[0]};
    font-family: Lato;
    color: #fff;
    box-sizing: border-box;

    ::placeholder {
        color: #f2f2f2;
    }
`;

export const EditorContainer = styled.div`
    padding: 6rem 12rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    gap: 0.5rem;
    display: grid;
    position: relative;
    grid-template-rows: 60px 1fr;
`;

export const BottomSide = styled.div`
    width: 100%;
    max-height: 100%;
    overflow: auto;
    display: flex;
    gap: 0.5rem;
`;

export const EditorSideBar = styled.div`
    min-width: 400px;
    max-width: 400px;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.5rem;
`;

export const StudentFeedBack = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 1in;
    overflow: auto;
    cursor: text;
    background: #fff;
    /* .public-DraftStyleDefault-block {
        margin: 0;
    } */
`;

export const Header = styled.div`
    width: 100%;
    height: 60px;
    background: #fff;
    box-sizing: border-box;
    display: none;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const BackBtn = styled.div`
    border: none;
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-weight: bold;
    cursor: pointer;

    :hover {
        svg {
            fill: ${COLOR.red[0]};
        }
        color: ${COLOR.red[0]};
    }

    transition: all 0.3s;
    * {
        transition: all 0.3s;
    }
`;

export const SendBtn = styled.button`
    border: none;
    radius: 2px;
    background: ${COLOR.green[0]};
    color: #fff;
    cursor: pointer;
    font-family: Lato;
    font-weight: 900;
    letter-spacing: 0.05rem;
    font-size: 1rem;
    padding: 1rem;
`;

export const GoalContainer = styled.div`
    width: 100%;
    background: #fff;
    box-sizing: border-box;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 0 0 auto;

    &[data-type='topic'] {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;

        button {
            border: 1px solid ${COLOR.blue[0]};
            font-family: Lato;
            color: #000;
            border-radius: 2px;
            outline: none;
            background: #fff;
            padding: 0.3rem 0.5rem;
            cursor: pointer;
            transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);

            :hover {
                background: ${COLOR.blue[0]};
                color: #fff;
            }
        }
    }
`;

export const FeedBackView = styled.div`
    flex: 1;
    overflow: auto;
`;

export const FeedBackContainer = styled(GoalContainer)`
    flex: 0 1 auto;
    overflow: auto;
`;

export const StatusBar = styled.div`
    background: #d9d9d9;
    width: 100%;
    height: 0.7rem;
    border-radius: 2rem;
    position: relative;
    overflow: hidden;

    ::before {
        content: '';
        position: absolute;
        width: calc(100% * (${({ progress }) => parseInt(progress[0]) / parseInt(progress[1])}));
        height: 100%;
        background: ${COLOR.blue[0]};
        border-radius: 2rem;
    }
`;

export const GoalCounter = styled.div`
    margin-left: auto;
    font-size: 12px;
    color: ${COLOR.gray[0]};
    span {
        color: #000;
        font-weight: 900;
    }
`;

export const GoalDes = styled.span`
    font-weight: 600;
    font-size: 12px;
`;

export const GroupAvatar = styled.ul`
    display: flex;
    list-style-type: none;
    padding: 0px 7px 0px 0px;
    z-index: 1;
`;

export const Avatar = styled.li`
    height: ${({ size }) => size || 49}px;
    margin: 0px 0px 0px 0px;
    padding: 0px 0px 0px 0px;
    position: relative;
    width: ${({ size }) => size - 7 || 42}px;

    img,
    span {
        background: ${({ color }) => color || '#596376'};
        border: 2px solid #fff;
        border-radius: 100px 100px 100px 100px;
        color: #ffffff;
        display: block;
        font-family: Lato;
        font-size: 10px;
        height: ${({ size }) => size - 4 || 45}px;
        line-height: ${({ size }) => size - 4 || 45}px;
        text-align: center;
        width: ${({ size }) => size - 4 || 45}px;
    }
`;

export const Input = styled.input`
    width: 100%;
    height: auto;
    outline: none;
    border: none;
    resize: none;
    font-weight: bold;
    border-radius: 2px;
    font-size: 1rem;
    padding: 1rem;
    border: 1px solid ${COLOR.blue[0]};
    font-family: Lato;
    box-sizing: border-box;
`;

export const StudentViewContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const ExitButton = styled.button`
    max-height: 49px;
    margin-top: 1rem;
    background: ${COLOR.red[0]};
    padding: 1rem;
    border: none;
    border-radius: 2px;
    font-family: Lato;
    color: #fff;
    cursor: pointer;
`;

export const TableContainer = styled.div`
    min-height: 0;
    overflow: auto;
`;

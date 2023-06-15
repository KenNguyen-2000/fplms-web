import styled from 'styled-components';

import { COLOR } from '../../utils/color';

const FormContainer = styled.div`
    width: 400px;
    height: auto;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: ${COLOR.primary02};
    border-radius: 4px;
    * {
        box-sizing: border-box;
    }
`;

const FormHeader = styled.div`
    width: 100%;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${COLOR.gray[4]};
    svg {
        background: ${COLOR.red[1]};
        border-radius: 4px;
        color: ${COLOR.primary02};
        :hover {
            cursor: pointer;
        }
    }
`;

const HeaderJumbotron = styled.div`
    display: flex;
    flex-direction: column;
`;

const FormBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 12px;
`;

const FormRow = styled.div`
    display: flex;
`;

const FormColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    height: 100%;
    width: 100%;
`;

const FormInput = styled.div`
    border: none;
    outline: none;
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    width: 100%;
    text-align: center;
    padding: 12px;
    font-size: 1rem;
    display: flex;
    justify-content: space-between;

    svg {
        :hover {
            cursor: pointer;
        }
    }
`;

export const TimeInput = styled.input`
    border: none;
    outline: none;
    border-radius: 4px;
    background: ${COLOR.blue[5]};
    width: 100%;
    padding: 12px;
    font-size: 1rem;
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-size: 1rem;
    font-weight: bold;
    color: ${COLOR.primary03};
    text-transform: uppercase;
`;

const SubTitle = styled.div`
    font-weight: bold;
    color: ${COLOR.gray[1]};
    text-transform: uppercase;
`;

const CreateBtn = styled.button`
    width: 100%;
    min-width: 80px;
    border: none;
    background: ${COLOR.blue[0]};
    color: ${COLOR.primary02};
    border-radius: 4px;
    cursor: pointer;
    padding: 16px;
    font-weight: bold;
    font-family: Lato;
    pointer-events: ${({ disable }) => (disable ? 'none' : 'auto')};
    display: grid;
    place-content: center;

    span {
        display: ${({ isLoading }) => (isLoading ? 'none' : 'inline')};
    }
`;

export {
    FormContainer,
    FormHeader,
    FormBody,
    HeaderJumbotron,
    Title,
    SubTitle,
    FormRow,
    FormInput,
    FormColumn,
    CreateBtn,
};

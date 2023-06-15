import styled from 'styled-components';

import { COLOR } from '../../utils/color';

export const StyledContainer = styled.div`
    align-self: end;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    visibility: hidden;
    @media (max-width: 768px) {
        display: none;
    }
`;

export const ActiveMember = styled.div`
    width: 100%;
    max-height: 40px;
    background-color: ${COLOR.blue[4]};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
`;

export const MemberInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const Avatar = styled.div`
    width: 24px;
    height: 24px;
    background-color: ${COLOR.green[3]};
    border-radius: 50%;
    span {
        font-size: 1rem;
        color: ${COLOR.primary03};
    }
`;

export const Comments = styled.div`
    font-size: 1rem;
    color: ${COLOR.blue[0]};
    @media (max-width: 1200px) {
        display: none;
    }
`;

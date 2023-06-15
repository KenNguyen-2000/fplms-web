import styled from 'styled-components';

import { COLOR } from '../../utils/style';

export const StyledBreadcrumbs = styled.ul`
    list-style: none;
    padding: 0;
    color: ${COLOR.primary03};
    & > li:after {
        content: '${(props) => props.separator || '/'}';
        padding: 0 8px;
    }
`;

export const Crumb = styled.li`
    display: inline-block;

    &:last-of-type:after {
        content: '';
        padding: 0;
    }

    a {
        color: green;
        text-decoration: none;
        &:hover,
        &:active {
            text-decoration: underline;
        }
    }
`;

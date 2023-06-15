import { StyledBreadcrumbs, Crumb } from './style';

const Breadcrumbs = ({ crumbs }) => {
    crumbs = crumbs || [];
    return (
        <StyledBreadcrumbs>
            <Crumb>Home</Crumb>
            {crumbs.map((path) => (path ? <Crumb key={path}>{path}</Crumb> : null))}
        </StyledBreadcrumbs>
    );
};

export default Breadcrumbs;

// import Footer from '../Footer';
import Header from '../Header';
import SideBar from '../Sidebar';
import { StyledContainer, StyledHeader, HeaderContainer, BodyContainer } from './style';

const RouteContainer = ({ component, style }) => {
    return (
        <>
            <StyledContainer>
                <StyledHeader>
                    <Header />
                </StyledHeader>
                <HeaderContainer>
                    <SideBar />
                </HeaderContainer>
                <BodyContainer style={style} data-target="body-container">
                    {component}
                </BodyContainer>
                {/* <Footer /> */}
            </StyledContainer>
        </>
    );
};

export default RouteContainer;

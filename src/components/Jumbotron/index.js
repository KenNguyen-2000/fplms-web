import logo from '../../assets/FPLMS.png';
import { Container, Logo, Content, Title, Subtitle } from './style';

const Jumbotron = ({ title, subtitle }) => {
    return (
        <Container>
            <Logo>
                <img src={logo} alt="FPLMS logo" />
            </Logo>
            <Content>
                <Title>{title}</Title>
                <Subtitle>{subtitle}</Subtitle>
            </Content>
        </Container>
    );
};

export default Jumbotron;

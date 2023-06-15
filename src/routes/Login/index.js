/* eslint-disable no-unused-vars */
import { useContext } from 'react';

import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from 'react-google-login';
import { useNavigate } from 'react-router-dom';

import smImg1 from '../../assets/LoginHero/image 2.png';
import smImg2 from '../../assets/LoginHero/image 3.png';
import { Particles, BigImg, SmallImg } from '../../components';
import AuthContext from '../../contexts/auth';
import LoadOverLayContext from '../../contexts/loadOverlay';
import { error } from '../../utils/toaster';
import {
    GoogleButton,
    StyledContainer,
    StyledTitle,
    StyledWelcome,
    StyledParagraph,
    ParticlesContainer,
    ImageGroup,
    StyledForm,
} from './style';

const Login = () => {
    const auth = useContext(AuthContext);
    const loadContext = useContext(LoadOverLayContext);

    const navigate = useNavigate();

    document.title = 'Login';

    const URL = process.env.REACT_APP_AUTH_URL + '/accounts/login';

    const responseGoogle = (response) => {
        console.log(response);
        if (response) {
            loadContext.setActive(true);
            loadContext.setText('Logging in');
            auth.setIsAdmin(true);
            localStorage.setItem('token', response.tokenId);
            loadContext.setActive(false);
            auth.setAuth(true);
            localStorage.setItem('user', JSON.stringify(jwtDecode(response.tokenId)));

            navigate('/class');
        }
        // axios
        //     .post(URL, {
        //         idToken: response.tokenId,
        //         provider: 'GOOGLE',
        //     })
        //     .then((res) => {
        //         const data = res.data;
        //         console.log(res.data);

        //         if (data.isAuthSuccessful) {
        //             axios
        //                 .get(`${process.env.REACT_APP_API_URL}/valid`, {
        //                     headers: {
        //                         Authorization: data.token,
        //                     },
        //                 })
        //                 .then((res) => {
        //                     auth.setAuth(true);
        //                     loadContext.setActive(false);
        //                     localStorage.setItem('token', data.token);

        //                     localStorage.setItem('user', JSON.stringify(response.profileObj));
        //                     if (res.data.code === 200) {
        //                         localStorage.setItem('isAdmin', true);
        //                         auth.setIsAdmin(true);
        //                     } else {
        //                         auth.setIsAdmin(false);
        //                     }
        //                     navigate('/class');
        //                 })
        //                 .catch((err) => error(err));
        //         }
        //     })
        //     .catch(() => {
        //         error('Login failed');
        //         loadContext.setActive(false);
        //     });
    };

    const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

    return (
        <>
            <StyledContainer>
                <StyledForm>
                    <StyledTitle>
                        <span>F</span>PLMS
                    </StyledTitle>
                    <StyledWelcome>Welcome to FPLMS</StyledWelcome>
                    <StyledParagraph>You are just one step away from your projects</StyledParagraph>
                    <GoogleLogin
                        clientId={CLIENT_ID}
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        disabledStyle
                        render={(btn) => (
                            <GoogleButton onClick={btn.onClick}>
                                Sign in with FPT email
                            </GoogleButton>
                        )}
                    />
                    <StyledParagraph>
                        By logging in, you accept with our <span>Terms & Conditions</span>
                    </StyledParagraph>
                </StyledForm>
                <ImageGroup>
                    <BigImg />
                    <SmallImg timing={10} bottom={150} left={1} src={smImg2}></SmallImg>
                    <SmallImg timing={15} bottom={100} right={1} src={smImg1}></SmallImg>
                </ImageGroup>
            </StyledContainer>
            <ParticlesContainer>
                <Particles />
            </ParticlesContainer>
        </>
    );
};

export default Login;

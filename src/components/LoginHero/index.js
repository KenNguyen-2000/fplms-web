import image1 from '../../assets/LoginHero/image 1.png';
import { StyledBig, StyledSmall } from './style';

const BigImg = () => {
    return (
        <StyledBig>
            <img src={image1} alt="Hero Image" />
        </StyledBig>
    );
};

const SmallImg = ({ src, top, left, right, bottom, timing }) => {
    return (
        <StyledSmall top={top} left={left} right={right} bottom={bottom} timing={timing}>
            <img src={src} alt="Hero Image" />
        </StyledSmall>
    );
};

export { BigImg, SmallImg };

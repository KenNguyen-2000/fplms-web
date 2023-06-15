import { StyledButton } from './style.js';

const Button = ({ icon, children, size, onClick }) => {
    return (
        <StyledButton data-target="styled-button" size={size} onClick={onClick}>
            {icon}
            {children}
        </StyledButton>
    );
};

export default Button;

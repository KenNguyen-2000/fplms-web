import { useState, useRef } from 'react';

import { useClickOutside } from '../../hooks';
import { COLOR } from '../../utils/style';
import { isBoolean } from '../../utils/valid';
import { Spinner } from '../Spinner';
import { Container, StyledButton, StyledList, StyledItem } from './style';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Selection = ({
    options,
    placeholder,
    onChange,
    disable,
    reset,
    maxHeight,
    isLoad,
    arrow,
    icon,
    onClick,
    color,
}) => {
    const [picked, setPicked] = useState(placeholder || 'Pick an option');
    const [open, setOpen] = useState(false);

    color = [COLOR.blue[0], COLOR.primary02];

    isLoad = isLoad || false;
    arrow = isBoolean(arrow) ? arrow : true;

    const pick = (item) => {
        if (!reset) setPicked(item.content);
        if (item.fn && typeof item.fn == 'function') item.fn(item);
        if (onChange && typeof onChange == 'function') onChange(item);
    };

    const ref = useRef();

    useClickOutside(ref, () => {
        setOpen(false);
    });

    return (
        <Container data-target="container" onClick={onClick && onClick}>
            <StyledButton
                disable={disable}
                open={open}
                color={color}
                ref={ref}
                isLoad={isLoad}
                onClick={() => {
                    if (disable || isLoad) return;
                    setOpen(!open);
                }}
                data-target="styled-button"
            >
                {icon || picked}
                {isLoad ? (
                    <Spinner radius={19} color={COLOR.blue[0]} />
                ) : (
                    arrow && <KeyboardArrowDownIcon />
                )}
            </StyledButton>
            <StyledList open={open} maxHeight={maxHeight} data-target="list">
                {options.map((item, index) => (
                    <StyledItem
                        onClick={() => {
                            pick(item);
                            setOpen(false);
                        }}
                        key={item.value}
                        open={open}
                        delay={index * 60}
                    >
                        {item.content}
                    </StyledItem>
                ))}
            </StyledList>
        </Container>
    );
};

export default Selection;

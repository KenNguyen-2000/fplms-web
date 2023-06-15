import { useEffect, useState } from 'react';

import { Container, Avatar, HiddenAvatar } from './style';

const AvatarGroup = (props) => {
    const [slot, setSlot] = useState(props.members - props.slot);
    const [hex, setHex] = useState('#BBCCFD');
    const randomizedHex = () => {
        const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
        setHex(randomColor);
    };
    // var arr = ['#BBCCFD', '#BAECCA', '#D0D0D0'];
    useEffect(() => {
        setSlot(props.members - props.slot);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.slot]);
    const rows = [];
    for (let i = 0; i < props.slot; i++) {
        randomizedHex;
        rows.push(<Avatar key={i} bg={hex}></Avatar>);
    }
    return (
        <div>
            <Container>
                {rows}
                <HiddenAvatar>+{slot}</HiddenAvatar>
            </Container>
        </div>
    );
};

export default AvatarGroup;

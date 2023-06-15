import { useState, useRef } from 'react';

import { Title, Container, Expando } from './style';

const Expand = ({ isOpen, title, children }) => {
    const [expand, setExpand] = useState(isOpen || false);
    const node = useRef();

    const getHeight = (node) => {
        let height = 0;
        height += node.scrollHeight;
        height += [...node.children].reduce((pre, cur) => {
            pre += getHeight(cur);
            return pre;
        }, 0);
        return height;
    };

    const toggle = () => {
        setExpand((e) => {
            if (e == false || e == 0) {
                return getHeight(node.current);
            }
            return 0;
        });
    };

    return (
        <Container>
            <Title onClick={toggle}>{title}</Title>
            <Expando ref={node} isExpand={expand}>
                {children}
            </Expando>
        </Container>
    );
};

export default Expand;

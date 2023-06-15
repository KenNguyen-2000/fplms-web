import { AnimatePresence } from 'framer-motion';

import { Container, SkeletonContainer } from './style';

const Skeleton = ({ placeholder, style, duration, bg, background }) => {
    const ZERO_WIDTH_SPACE = String.fromCharCode(parseInt('U+200B', 16));

    const _duration = duration || 2;
    const _bg = bg || background || '#eeeeee';

    return (
        <AnimatePresence>
            <SkeletonContainer
                style={style}
                initial={{ opacity: 0, transform: 'translateY(10px)' }}
                animate={{
                    opacity: 1,
                    transform: 'translateY(0px)',
                    transition: { duration: 1 },
                }}
            >
                <Container duration={_duration} bg={_bg}>
                    {placeholder || ZERO_WIDTH_SPACE}
                </Container>
            </SkeletonContainer>
        </AnimatePresence>
    );
};

export default Skeleton;

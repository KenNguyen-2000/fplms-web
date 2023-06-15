import { useRef, useEffect } from 'react';

import { AnimatePresence } from 'framer-motion';

import { Container, ModalBox } from './style';

const bezier = [0.4, 0, 0.2, 1];

const Overlay = ({ children, isOpen, closeFn, dark, duration, inDelay, outDelay, fullFill }) => {
    const node = useRef();

    dark = dark || 0.5;
    duration = duration || 0.3;
    inDelay = inDelay || 0;
    outDelay = outDelay || 0;

    closeFn = closeFn || new Function();

    useEffect(() => {
        const handleClickOutSide = (e) => {
            if (node.current?.contains(e.target) && node.current == e.target) {
                closeFn();
            }
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        document.addEventListener('click', handleClickOutSide);

        return () => {
            document.removeEventListener('click', handleClickOutSide);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <Container
                    ref={node}
                    initial={{ background: `rgba(0, 0, 0, 0)` }}
                    animate={{
                        background: `rgba(0, 0, 0, ${dark})`,
                        transition: { duration: duration, ease: bezier, delay: inDelay },
                    }}
                    exit={{
                        background: `rgba(0, 0, 0, 0)`,
                        transition: { duration: duration, ease: bezier, delay: outDelay },
                    }}
                >
                    <ModalBox
                        initial={{
                            opacity: 0,
                            transform: 'translateY(-40px)',
                            width: fullFill ? '100%' : 'fit-content',
                            height: fullFill ? '100%' : 'fit-content',
                        }}
                        animate={{
                            opacity: 1,
                            transform: 'translateY(0px)',
                            transition: { duration: duration, ease: bezier, delay: inDelay },
                        }}
                        exit={{
                            opacity: 0,
                            transform: 'translateY(40px)',
                            transition: { duration: duration, ease: bezier, delay: outDelay },
                        }}
                    >
                        {children}
                    </ModalBox>
                </Container>
            )}
        </AnimatePresence>
    );
};

export default Overlay;

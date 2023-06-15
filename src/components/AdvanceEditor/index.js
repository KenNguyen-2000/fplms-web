import { useRef } from 'react';

import Avatars from '../Avatars';
import DraftEditor from '../DraftEditor';
import { Container, Header, BackBtn, BottomSide, EditorContainer, EditorSideBar } from './style';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const AdvanceEditor = ({
    closeFn,
    children,
    avatars,
    editorState,
    setEditorState,
    readOnly,
    backTab,
    headColor,
}) => {
    const editorRef = useRef();
    console.log(editorState);

    closeFn = closeFn || new Function();
    avatars = avatars || [];

    return (
        <Container>
            <Header headColor={headColor}>
                <BackBtn onClick={closeFn}>
                    <ArrowBackIosNewIcon fontSize="small" /> {backTab || 'Back'}
                </BackBtn>
                <Avatars outline={headColor} list={avatars} />
            </Header>
            <BottomSide>
                <EditorContainer onClick={() => editorRef.current.focus()}>
                    <DraftEditor
                        editorRef={editorRef}
                        editorState={editorState}
                        setEditorState={setEditorState}
                        readOnly={readOnly}
                    />
                </EditorContainer>
                <EditorSideBar>{children}</EditorSideBar>
            </BottomSide>
        </Container>
    );
};

export default AdvanceEditor;

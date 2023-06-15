import { useState } from 'react';

import { Editor, EditorState, getVisibleSelectionRect, Modifier, RichUtils } from 'draft-js';

import { ToolBar } from './style';

import { faBold, faItalic, faList, faListOl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'draft-js/dist/Draft.css';

const DraftEditor = ({ editorRef, placeholder, editorState, setEditorState, readOnly }) => {
    const [toolBar, setToolBar] = useState({
        top: 0,
        left: 0,
        isOpen: false,
    });

    const onChange = (editorState) => {
        const selectionState = editorState.getSelection();
        const anchorKey = selectionState.getAnchorKey();
        const start = selectionState.getStartOffset();
        const end = selectionState.getEndOffset();
        const offset = getVisibleSelectionRect(window);

        if (anchorKey && start != end) {
            setToolBar({
                ...toolBar,
                top: offset?.top,
                left: offset?.left + offset?.width / 2,
                isOpen: true,
            });
        } else {
            setToolBar({
                ...toolBar,
                isOpen: false,
            });
        }
        // checkSave();
        if (setEditorState) setEditorState(editorState);
    };

    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    };

    const handleBeforeInput = (chars, editorState) => {
        const currentContentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();

        onChange(
            EditorState.push(
                editorState,
                Modifier.replaceText(currentContentState, selectionState, chars)
            )
        );

        return 'handled';
    };

    const utils = [
        {
            icon: <FontAwesomeIcon icon={faBold} />,
            fn: () => {
                const nextState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
                setEditorState(nextState);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faItalic} />,
            fn: () => {
                const nextState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
                setEditorState(nextState);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faList} />,
            fn: () => {
                const nextState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
                setEditorState(nextState);
            },
        },
        {
            icon: <FontAwesomeIcon icon={faListOl} />,
            fn: () => {
                const nextState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
                setEditorState(nextState);
            },
        },
    ];

    return (
        <>
            <ToolBar top={toolBar.top} left={toolBar.left} isOpen={toolBar.isOpen || false}>
                {utils.map((util, index) => (
                    <button key={index} onMouseDown={(e) => e.preventDefault()} onClick={util.fn}>
                        {util.icon}
                    </button>
                ))}
            </ToolBar>
            <Editor
                ref={editorRef}
                editorState={editorState}
                onChange={onChange}
                handleKeyCommand={handleKeyCommand}
                handleBeforeInput={handleBeforeInput}
                placeholder={placeholder}
                readOnly={readOnly}
            />
        </>
    );
};

export const DraftRenderer = ({ editorState }) => {
    return <Editor editorState={editorState} readOnly></Editor>;
};

export default DraftEditor;

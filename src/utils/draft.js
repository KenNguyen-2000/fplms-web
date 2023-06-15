import { convertFromHTML, ContentState } from 'draft-js';

const fromHTML = (html) => {
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );
    return state;
};

export { fromHTML };

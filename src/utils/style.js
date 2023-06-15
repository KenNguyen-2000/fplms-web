export const COLOR = {
    gray: ['#8B8B8B', '#A2A2A2', '#B9B9B9', '#D0D0D0', '#E8E8E8', '#F3F3F3'],
    red: ['#F21B6A', '#F44887', '#F776A5', '#FAA3C3', '#FDD1E1', '#FEE7F0'],
    green: ['#53D07C', '#75D996', '#97E3B0', '#BAECCA', '#DCF6E5', '#EDFAF2'],
    blue: ['#5680F9', '#7799FA', '#99B3FB', '#BBCCFD', '#DDE6FE', '#EEF2FF'],
    primary03: '#434343',
    primary02: '#fff',
};

export const FONT_SIZE = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    md: '1.25rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem',
    xxxl: '4rem',
    read: '16px',
};

export const FLEX = {
    center: `
        display: flex;
        align-items: center;
        justify-content: center;
    `,
};

export const stringToColour = function (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xff;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
};

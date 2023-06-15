const chunkArray = (arr, chunk) => {
    const newArray = [];
    while (arr.length > 0) {
        newArray.push(arr.splice(0, chunk));
    }
    return newArray;
};

export { chunkArray };

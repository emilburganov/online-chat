const getDateTime = (timestamp) => {
    const date = timestamp.toDate();

    return date.toUTCString().slice(0, -7);
}

export default getDateTime;
export default (url) => {
    if (url) {
        const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[1].length === 11) {
            return match[1];
        }
    }
    return null;
};
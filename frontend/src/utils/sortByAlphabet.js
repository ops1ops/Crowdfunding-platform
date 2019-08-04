export default (a, b) => {
    const x = a.category.toLowerCase();
    const y = b.category.toLowerCase();
    return ((x < y) ? 1 : ((x > y) ? -1 : 0));
}
export const sortByOrder = (a: { order: number; }, b: { order: number; }) => {
    if (a.order > b.order) {
        return 1;
    }
    return -1;
};
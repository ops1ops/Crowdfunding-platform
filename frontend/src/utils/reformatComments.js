export default (response) => {
    const comments = response.comments.map(item => {
        let likesCount = 0;
        let dislikesCount = 0;
        item.Likes.forEach(item => {
            if (item.state === 'liked') likesCount++;
            if (item.state === 'disliked') dislikesCount++;
        });
        return {
            ...item,
            likedBy: item.likedBy.length
                ? { state: item.likedBy.map(item => item.Like.state)[0] }
                : { state: null },
            likesCount,
            dislikesCount,
        }
    });

    return comments.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
};



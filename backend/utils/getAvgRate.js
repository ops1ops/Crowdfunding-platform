exports.getAvgRate = (campaign) => {
    if (campaign.ratedBy.length !== 0) {
        const sumRate = campaign.ratedBy.reduce((prev, cur) => prev + cur.Rating.rating, 0);

        return (sumRate / campaign.ratedBy.length).toFixed(1);
    }
    return 0;
};
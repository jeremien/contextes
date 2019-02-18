
const renderBadges = (data, id) => {
    let b = data.find((b) => {
        return b._id === id;
        });
    
    if (b) {
        return b.sum;
    } else {
        return null;
    }
    
}

export { renderBadges };



const sortData = (data, type, asc) => {



    // if (asc) {
    //     return data.sort((a, b) => {
    //         return (a.date > b.date) ? 1 : -1;
    //     });    
    // } else {
    //     return data.sort((a, b) => {
    //         return (a.date < b.date) ? 1 : -1;
    //     });    
    // }

    if (type === 'date') {
        if (asc) {
            return data.sort((a, b) => {
                return (a.date > b.date) ? 1 : -1;
            });    
        } else {
            return data.sort((a, b) => {
                return (a.date < b.date) ? 1 : -1;
            });    
        }
    }

    if (type === 'contenu') {
        if (asc) {
            return data.sort((a, b) => {
                return (a.contenu > b.contenu) ? 1 : -1;
            });    
        } else {
            return data.sort((a, b) => {
                return (a.contenu < b.contenu) ? 1 : -1;
            });    
        }
    }

    if (type === 'correction') {
        if (asc) {
            return data.sort((a, b) => {
                return (a.correction > b.correction) ? 1 : -1;
            });    
        } else {
            return data.sort((a, b) => {
                return (a.correction < b.correction) ? 1 : -1;
            });    
        }
    }

    if (type === 'auteur') {
        if (asc) {
            return data.sort((a, b) => {
                return (a.auteur > b.auteur) ? 1 : -1;
            });    
        } else {
            return data.sort((a, b) => {
                return (a.auteur < b.auteur) ? 1 : -1;
            });    
        }
    }

    if (type === 'type') {
        if (asc) {
            return data.sort((a, b) => {
                return (a.type > b.type) ? 1 : -1;
            });    
        } else {
            return data.sort((a, b) => {
                return (a.type < b.type) ? 1 : -1;
            });    
        }
    }


    return 0;
    
}

export { sortData };
export const pagination = (c, m) => {
    let delta = 1,
        range = [],
        rangeWithDots = [],
        l;
    range.push(1)
    for (let i = c - delta; i <= c + delta; i++) {
        if (i < m && i > 1) {
            range.push(i);
        }
    }
    if (m > 1) {
        range.push(m);
    }
    range.map(val => {
        if (l) {
            if (val - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (val - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(val);
        l = val;
    });
    return rangeWithDots;
}

export const buildParams = (params) => {
    let arr = [];
    Object.keys(params).forEach(function (key) {
        if (params[key] != undefined) {
            if(typeof params[key] == "string" && params[key].includes('#')) {
                arr.push(`${key}=${escape(params[key])}`)
            } else {
                arr.push(`${key}=${params[key]}`)
            }
        }
    });

    const result = arr.length > 0 ? '?' + arr.join('&') : '';
    return result;
}

export const paginateJsonArr = (dataJson = [], limit = 20, page = 1) => {
    const lengthData = dataJson.length;
    const current_page = page || 1;
    const last_page = Math.ceil(lengthData / limit);
    const skip = (page - 1) * limit;
    const data = dataJson.slice(skip, page * limit)

    return {
        total: lengthData,
        current_page,
        last_page,
        data
    }
     
}
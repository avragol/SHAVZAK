const areSameArray = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    if (typeof arr1[0] === 'object' || typeof arr2[0] === 'object') {
        return areSameObjectsArray(arr1, arr2);
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
};

const areSameObjectsArray = (arr1, arr2) => {
    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i];
        const obj2 = arr2[i];

        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) {
            return false;
        }

        for (let j = 0; j < keys1.length; j++) {
            const key = keys1[j];
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
    }
    return true;
};
module.exports = areSameArray;
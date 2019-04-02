export const groupArrayDataByKeys = (array, key, value) =>
    array
        .map(d => d.values.concat([]))
        .reduce((a, b) => a.concat(b, []))
        .reduce(
            (a, b, i, arr) =>
                arr.map((val, idx) => ({ id: val[key], index: idx })).filter(val => val.id === b[key])[0].index === i
                    ? a.concat(
                          arr
                              .filter(v => v[key] === b[key])
                              .reduce((a1, b1) => ({ key: a1[key], values: [].concat(a1[value], b1[value]) }))
                      )
                    : a,
            []
        );

export const sortByParent = grades =>
    grades.sort((a, b) => {
        if (!a.parentGradeId && !b.parentGradeId) {
            return a.id <= b.id ? -1 : 1;
        }

        if (!a.parentGradeId) {
            return -1;
        }

        if (!b.parentGradeId) {
            return 1;
        }

        return a.parentGradeId <= b.parentGradeId ? -1 : 1;
    });

export const appendChildrenToParent = grades =>
    grades
        .map((item, idx, arr) => {
            item.children = arr.filter(i => i.parentGradeId === item.id);
            return item;
        })
        .filter(item => !item.parentGradeId);

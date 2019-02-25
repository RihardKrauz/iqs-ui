export const groupArrayDataByKeyData = (key, value) =>
    this.map(d => d.values.concat([]))
        .reduce((a, b) => a.concat(b, []))
        .reduce(
            (a, b, i, arr) =>
                arr.map((val, idx) => ({ id: val[key], index: idx })).filter(val => val.id === b[key])[0].index === i
                    ? a.concat(
                          arr
                              .filter(v => v[key] === b[key])
                              .reduce((a1, b1) => ({ name: a1[key], data: [].concat(a1[value], b1[value]) }))
                      )
                    : a,
            []
        );

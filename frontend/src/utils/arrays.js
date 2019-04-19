

export const getObject = object => {
    const objectKeys = Object.keys(object);
    const objectKey = objectKeys[0];

    return object[objectKey];
};

export const groupBy = async (xs, key) => {
  const object = xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
  //let result = []
  return object

};

export const createArrayFromObject = async (object, key) => {
  const result = Object.entries(object).map((item) => {
      //const sum = this.sum(item[1], 'month_1')
      let array = {[key]: item[0], entries: item[1]}
      return array;
  });
  //const result = Object.values(object);
  console.log(result);
  return result
}

export const getDifferenceArray = async (array, id, columnArray) => {
    var savedItems = {}
    //savedItems['first'] = array[0];
    savedItems['previous'] = array[0];
    for(var item of array){
        let index = array.findIndex((e) => e[id] === item[id]);
        for(var column of columnArray){
            if(column in savedItems){
                
            }
            let difference = item[column]-savedItems['previous'][column];
            
            array[index][column + '_diff'] = difference;
            
        }
        savedItems['previous'] = item;
    }
    return array;
}

export const extractColumn = (array, column) => {
    return array.map(x => x[column]);
}

export const getDataBetweenDates = (array, from, to, id) => {
    return array.filter((item: any) =>
        new Date(item[id]) >= (new Date(from)) && new Date(item[id]) <= (new Date(to))
    );
}

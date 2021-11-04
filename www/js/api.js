const addLocalStorage = (table) => {
  return new Promise((resolve) => {
    getTops(table).then((tops) => {
      localStorage.setItem(table, JSON.stringify(tops));
      resolve();
    });
  });
};

const getLocalStorage = (table) => {
  result = localStorage.getItem(table);
  if(result) {
    return JSON.parse(result);
  }
}

const getTops = (table) => {
  return new Promise((resolve, reject) => {
    $.get("api/tops.json").then((tops) => {
      resolve(tops);
    }).catch(() => {
      resolve(getLocalStorage(table));
    })
  })
}
const addLocalStorage = (table) => {
  return new Promise((resolve) => {
    getTops().then((tops) => {
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

const getTops = () => {
  return new Promise((resolve, reject) => {
    tops = $.get("api/tops.json");
    tops ? resolve(tops) : reject();
  })
}

const getTemplate = (name) => {
  return new Promise((resolve, reject) => {
    template = $.get(`templates/${name}`);
    template ? resolve(template) : reject();
  })
}
function getTops(callback) {
  return $.get("api/tops.json", callback);
}

function getTemplate(name, callback) {
  return $.get(`templates/${name}`, callback);
}
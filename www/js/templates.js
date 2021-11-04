const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const buildTopsPage = (tops) => {
  const container = document.getElementById("tops-container");
  getTemplate("tops/top.html").then((template) => {
    tops.forEach((top) => {
      let templateFilled = template
        .replace("{id}", top.id)
        .replace("{title}", top.title)
        .replace("{description}", top.description)
        .replace("{author}", top.author)
        .replace("{created_at}", top.created_at)
      container.appendChild(htmlToElement(templateFilled));
    });
  });
};

const buildViewPage = (tops, topId) => {
  let top;
  tops.forEach(element => {
    if (element.id == topId) top = element;
  });
  const container = document.getElementById("view-container");
  getTemplate("view/header.html").then((template) => {
    let templateFilled = template
      .replace("{title}", top.title)
      .replace("{description}", top.description)
      .replace("{author}", top.author)
      .replace("{created_at}", top.created_at)
    container.appendChild(htmlToElement(templateFilled));
  });
  getTemplate("view/element.html").then((template) => {
    top.list.forEach((element, i) => {
      let templateFilled = template
        .replace("{position}", element.position)
        .replace("{name}", element.name)
        .replace("{file}", `${top.id}/${element.file}`)
      container.appendChild(htmlToElement(templateFilled));
    });
  });
};

const addMediaRow = (row) => {
  const container = $("#media-table tbody").last()[0];
  getTemplate("add/media-row.html").then((template) => {
    let templateFilled = template
      .replace("{row}", row)
      .replace("{row}", row)
    container.appendChild(htmlToElement(templateFilled));
  });
};
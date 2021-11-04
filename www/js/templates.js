let template = ``;

const htmlToElement = (html) => {
  let template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const buildTopsPage = (tops) => {
  if("cordova" in window) {
    if(device.platform != "browser") tops = JSON.parse(tops);
  }
  const container = document.getElementById("tops-container");
  template = `
  <div class="top" data-top-id="{id}">
    <h2>{title}</h2>
    <h3>{description}</h3>
    <h3>Par {author} le {created_at}</h3>
  </div>
  `;

  tops.forEach((top) => {
    let templateFilled = template
      .replace("{id}", top.id)
      .replace("{title}", top.title)
      .replace("{description}", top.description)
      .replace("{author}", top.author)
      .replace("{created_at}", top.created_at)
    container.appendChild(htmlToElement(templateFilled));
  });
};

const buildViewPage = (tops, topId) => {
  if("cordova" in window) {
    if(device.platform != "browser") tops = JSON.parse(tops);
  }
  let top;
  tops.forEach(element => {
    if (element.id == topId) top = element;
  });
  const container = document.getElementById("view-container");
  template = `
  <header>
    <h1>{title}</h1>
    <h2>{description}</h2>
    <h2>Par {author} le {created_at}</h2>
  </header>
  `;

  let templateFilled = template
    .replace("{title}", top.title)
    .replace("{description}", top.description)
    .replace("{author}", top.author)
    .replace("{created_at}", top.created_at)
  container.appendChild(htmlToElement(templateFilled));

  template = `
  <div class="element">
    <h2>#{position} - {name}</h2>
    <img src="{file}">
  </div>
  `;

  top.list.forEach((element, i) => {
    let templateFilled = template
      .replace("{position}", element.position)
      .replace("{name}", element.name)
      .replace("{file}", `img/${top.id}/${element.file}`)
    container.appendChild(htmlToElement(templateFilled));
  });
};

const addMediaRow = (row) => {
  const container = $("#media-table tbody").last()[0];
  template = `
  <tr data-row-number="{row}">
    <td>#{row}</td>
    <td><input type="text" placeholder="Titre" required></td>
    <td><input type="file"></td>
  </tr>
  `;

  let templateFilled = template
    .replace("{row}", row)
    .replace("{row}", row)
  container.appendChild(htmlToElement(templateFilled));
};
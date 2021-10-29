const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const fetchApiTops = () => {
  $.get("api/tops.json", (tops) => {
    const container = document.getElementById("tops-container");
    $.get("templates/top.html", (template) => {
      tops.forEach((top, i) => {
        const topFilled = template
          .replace("{title}", top.title)
          .replace("{author}", top.author)
        container.appendChild(htmlToElement(topFilled));
      });
    });
  });
}

if ("cordova" in window) {
  document.addEventListener("deviceready", fetchApiTops);
} else {
  document.addEventListener("DOMContentLoaded", fetchApiTops);
} 
$(document).ready(function () {
    var siteMap = document.getElementById("site-map");
    var map = document.createElement("ul");
    var navItems = $(".nav-item");

    $.each(navItems, function(i, item) {
        if (item.classList.contains("dropdown")) {
            var links = item.children;
            var mapItem = document.createElement("li");
            var mapItemMenu = document.createElement("ul");

            $.each(links, function(j, link) {
                if (link.classList.contains("nav-link")) {
                    var label = link.text.trim();
                    mapItem.innerHTML = label;
                    mapItem.appendChild(mapItemMenu);
                } else if (link.classList.contains("dropdown-menu")) {
                    var dropdownItems = link.children;
                    $.each(dropdownItems, function (k, dropdown) {
                        if (dropdown.classList.contains("dropdown-item") && !dropdown.classList.contains("disabled")) {
                            appendMapLink(mapItemMenu, dropdown);
                        }
                    });
                }
            });
            map.appendChild(mapItem);
        } else {
            var links = item.children;

            $.each(links, function(j, link) {
                if (link.classList.contains("nav-link")) {
                    appendMapLink(map, link)
                }
            });
        }
    });

    var footerLinks = document.getElementsByClassName("foot")[0].getElementsByTagName("a");
    $.each(footerLinks, function(i, item) {
        appendMapLink(map, item);
    });

    siteMap.appendChild(map);
});

function appendMapLink(parent, link) {
    var label = "";

    // If the link contains an image child element, iterate through all child nodes and get the text content or alt text of each (only if it is an element or text node)
    if (link.querySelectorAll("img").length) {
        link.childNodes.forEach(node => {
            if (node.nodeType === 1) {
                if (node.tagName.toLowerCase() == "img") {
                    label += " " + (node.getAttribute("alt") ?? "");
                }
                else {
                    label += " " + node.textContent;
                }
            }
            else if (node.nodeType === 3) {
                label += " " + node.textContent;
            }
        });
        label = label.trim();
    }
    else {
        label = link.text.trim();
    }

    var href = link.attributes.href.value;
    var mapItem = document.createElement("li");
    var newLink = document.createElement("a");
    newLink.setAttribute("href", href);
    newLink.textContent = label;
    mapItem.appendChild(newLink);
    parent.appendChild(mapItem);
}

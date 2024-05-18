export function typeText(text, elementId, delay, type) {
    var i = 0;
    var element = document.getElementById(elementId);
    switch (type) {
        case "string":
            var intervalId = setInterval(function () {
                // element.textContent += text.charAt(i);
                element.innerHTML += text.charAt(i);
                i++;
                if (i > text.length) {
                    clearInterval(intervalId);
                }
            }, delay);
            break;
    }
}  
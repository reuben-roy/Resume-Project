export function typeText(text, elementId, delay, type) {
    const element = document.getElementById(elementId);
    if (!element) return;

    switch (type) {
        case "string":
            let i = 0;

            function typeNextChar() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typeNextChar, delay);
                }
            }

            typeNextChar();
            break;
    }
}
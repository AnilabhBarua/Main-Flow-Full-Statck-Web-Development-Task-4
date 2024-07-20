document.addEventListener('DOMContentLoaded', () => {
    const displayElement = document.getElementById('display');
    const historyList = document.getElementById('history-list');
    const themeBtn = document.getElementById('theme-btn');
    const extraMenu = document.getElementById('extra-menu');
    const extraMenuToggle = document.getElementById('extra-menu-toggle');
    const extraMenuClose = document.getElementById('extra-menu-close');
    let currentTheme = 'light';

    function clearDisplay() {
        displayElement.innerText = '0';
    }

    function deleteLast() {
        let display = displayElement.innerText;
        if (display.length > 1) {
            displayElement.innerText = display.slice(0, -1);
        } else {
            displayElement.innerText = '0';
        }
    }

    function appendSymbol(symbol) {
        let display = displayElement.innerText;
        if (display === '0' && symbol !== '.') {
            displayElement.innerText = symbol;
        } else {
            displayElement.innerText += symbol;
        }
    }

    function calculateResult() {
        let display = displayElement.innerText;
        try {
            const result = eval(display);
            displayElement.innerText = result;
            addHistory(display, result);
        } catch (error) {
            displayElement.innerText = 'Error';
        }
    }

    function addHistory(expression, result) {
        const historyItem = document.createElement('li');
        historyItem.innerText = `${expression} = ${result}`;
        historyList.appendChild(historyItem);
    }

    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.body.setAttribute('data-theme', currentTheme);
    }

    function toggleExtraMenu() {
        extraMenu.classList.toggle('show');
    }

    function closeExtraMenu() {
        extraMenu.classList.remove('show');
    }

    themeBtn.addEventListener('click', toggleTheme);
    extraMenuToggle.addEventListener('click', toggleExtraMenu);
    extraMenuClose.addEventListener('click', closeExtraMenu);

    document.addEventListener('keydown', (event) => {
        if ((event.key >= '0' && event.key <= '9') || event.key === '.') {
            appendSymbol(event.key);
        } else if (event.key === 'Enter') {
            calculateResult();
        } else if (event.key === 'Backspace') {
            deleteLast();
        } else if (event.key === 'Escape') {
            clearDisplay();
        } else if (['+', '-', '*', '/'].includes(event.key)) {
            appendSymbol(event.key);
        }
    });

    window.clearDisplay = clearDisplay;
    window.deleteLast = deleteLast;
    window.appendSymbol = appendSymbol;
    window.calculateResult = calculateResult;
});

// Get references to HTML elements
const runButton = document.getElementById('run-button');
const copyButton = document.getElementById('copy-button');
const saveButton = document.getElementById('save-button');
const lockButton = document.getElementById('lock-button');
const codeInput = document.getElementById('code');
const outputFrame = document.getElementById('output');

// Attach event listeners to buttons
runButton.addEventListener('click', () => {
    const code = codeInput.value;
    const outputDocument = outputFrame.contentDocument || outputFrame.contentWindow.document;
    outputDocument.open();
    outputDocument.write(`<script>${code}</script>`);
    outputDocument.close();
});

copyButton.addEventListener('click', () => {
    // Copy the code to the clipboard
    codeInput.select();
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    console.log('Code copied to clipboard:', codeInput.value);
});

saveButton.addEventListener('click', () => {
    // Save the code content to a file
    saveCodeToFile(codeInput.value);
    console.log('Code saved to file:', codeInput.value);
});

lockButton.addEventListener('click', () => {
    // Toggle the code editor's lock/unlock state
    codeInput.disabled = !codeInput.disabled;
    lockButton.textContent = codeInput.disabled ? 'Unlock' : 'Lock';
    console.log(`Code editor ${codeInput.disabled ? 'locked' : 'unlocked'}`);
});

// Handle code indentation when the Tab key is pressed
codeInput.addEventListener('keydown', (e) => {
    if (e.key === "Tab" && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        const start = codeInput.selectionStart;
        const end = codeInput.selectionEnd;
        codeInput.value = codeInput.value.substring(0, start) + "    " + codeInput.value.substring(end);
        codeInput.setSelectionRange(start + 4, start + 4);
    }
});

// Function to execute the code and return the output
function executeCode(code) {
    try {
        // Execute the code using an appropriate method
        // Example: You can use eval(), but it's not recommended for untrusted input.
        return eval(code);
    } catch (error) {
        return 'Error: ' + error.message;
    }
}

// Function to save code content to a file
function saveCodeToFile(code) {
    // Implement code to save the code to a file (e.g., using Blob and a download link)
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'code.txt';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
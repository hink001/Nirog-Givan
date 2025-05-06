async function scanImage() {
    const fileInput = document.getElementById('imageUpload');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        resultDiv.innerHTML = "Please upload an image.";
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('/scan-image', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        resultDiv.innerHTML = `Detected Text: ${data.text}`;
    } catch (error) {
        resultDiv.innerHTML = "Error scanning image.";
        console.error(error);
    }
}

async function askAI() {
    const queryInput = document.getElementById('userQuery');
    const responseDiv = document.getElementById('response');

    if (!queryInput.value.trim()) {
        responseDiv.innerHTML = "Please enter a question.";
        return;
    }

    try {
        const response = await fetch(`/ask-ai?question=${encodeURIComponent(queryInput.value)}`);
        const data = await response.json();
        responseDiv.innerHTML = `AI: ${data.answer}`;
    } catch (error) {
        responseDiv.innerHTML = "Error getting response.";
        console.error(error);
    }
}

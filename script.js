// IMAGE SCANNER using OCR.space API
async function scanImage() {
    const fileInput = document.getElementById('imageUpload');
    const resultDiv = document.getElementById('result');

    if (!fileInput.files.length) {
        resultDiv.innerHTML = "Please upload an image.";
        return;
    }

    const formData = new FormData();
    formData.append('file', fileInput.files[0]);
    formData.append('apikey', 'K81657832088957');  // Your OCR.space key
    formData.append('language', 'eng');

    try {
        const response = await fetch('https://api.ocr.space/parse/image', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        const text = result.ParsedResults[0].ParsedText;
        resultDiv.innerHTML = `Detected Text: ${text}`;
    } catch (error) {
        resultDiv.innerHTML = "Error scanning image.";
        console.error(error);
    }
}

// CHATBOT using API-Ninjas
async function askAI() {
    const query = document.getElementById('userQuery').value;
    const responseDiv = document.getElementById('response');

    if (!query.trim()) {
        responseDiv.innerHTML = "Please enter a question.";
        return;
    }

    try {
        const res = await fetch(`https://api.api-ninjas.com/v1/chatbot?message=${encodeURIComponent(query)}`, {
            headers: {
                'X-Api-Key': 'fPHhyAPLse6lneEvmUMeXg==q9GDDoUjVFjswKdk'
            }
        });

        const data = await res.json();
        responseDiv.innerHTML = `AI: ${data.response}`;
    } catch (error) {
        responseDiv.innerHTML = "Error getting chatbot response.";
        console.error(error);
    }
}
add api in this js code

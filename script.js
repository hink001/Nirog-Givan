async function scanImage() {
    const file = document.getElementById('imageUpload').files[0];
    const resultDiv = document.getElementById('result');

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/scan-image', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    resultDiv.innerHTML = `Detected: ${data.text}`;
}

function askAI() {
    const query = document.getElementById('userQuery').value;
    fetch('/ask-ai?question=' + encodeURIComponent(query))
        .then(response => response.json())
        .then(data => {
            document.getElementById('response').innerHTML = data.answer;
        });
}

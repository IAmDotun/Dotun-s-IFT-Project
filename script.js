const uploader = document.getElementById('pdfUploader');
const button = document.getElementById('processButton');
const documentList = document.getElementById('documentList');
const statusMessage = document.getElementById('statusMessage');

let repository = []; 

button.addEventListener('click', function() {
    statusMessage.textContent = ""; 

    // Check if the user selected anything at all
    if (uploader.files.length === 0) {
        statusMessage.style.color = "#ef4444";
        statusMessage.textContent = "Error: No documents selected.";
        return;
    }

    // Variables to track our success and failure rates during the loop
    let successCount = 0;
    let errorCount = 0;

    // The Loop: We examine every file the user selected
    for (let i = 0; i < uploader.files.length; i++) {
        let uploadedFile = uploader.files[i];

        // Skeptical check: Is this specific file truly a PDF?
        if (uploadedFile.type !== "application/pdf") {
            errorCount++; // Count the error
            continue;     // Skip this invalid file and move to the next one
        }

        // Process the valid PDF
        let fileURL = URL.createObjectURL(uploadedFile);

        let documentRecord = {
            name: uploadedFile.name,
            size: (uploadedFile.size / 1024).toFixed(2) + " KB",
            url: fileURL
        };

        repository.push(documentRecord);
        successCount++; // Count the success
    }

    // Report the final results back to the user
    if (successCount > 0 && errorCount === 0) {
        statusMessage.style.color = "#10b981";
        statusMessage.textContent = `Success: ${successCount} document(s) ingested.`;
    } else if (successCount > 0 && errorCount > 0) {
        statusMessage.style.color = "#f59e0b"; // Warning color (orange)
        statusMessage.textContent = `Warning: ${successCount} ingested, but ${errorCount} failed (Not a PDF).`;
    } else {
        statusMessage.style.color = "#ef4444";
        statusMessage.textContent = "Error: All selected files were invalid formats.";
    }
    
    // Clear the input and update the screen
    uploader.value = "";
    renderRepository();
});

// The render function remains exactly the same
function renderRepository() {
    documentList.innerHTML = "";

    repository.forEach(function(doc) {
        const listItem = document.createElement('li');

        const fileInfo = document.createElement('span');
        fileInfo.innerHTML = `<strong>${doc.name}</strong> <br> <small style="color: #64748b;">${doc.size}</small>`;

        const downloadLink = document.createElement('a');
        downloadLink.href = doc.url;
        downloadLink.download = "Retrieved_" + doc.name;
        downloadLink.textContent = "Download";
        downloadLink.className = "download-btn";

        listItem.appendChild(fileInfo);
        listItem.appendChild(downloadLink);

        documentList.appendChild(listItem);
    });
}
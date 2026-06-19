
// =========================================
// DOCUMENT MANAGEMENT SYSTEM
// UPDATED VERSION
// =========================================

// Get references to HTML elements
const uploader = document.getElementById('pdfUploader');
const button = document.getElementById('processButton');
const documentList = document.getElementById('documentList');
const statusMessage = document.getElementById('statusMessage');


// =========================================
// CORRECTION #1
// Add permanent documents here.
//
// IMPORTANT:
// Place the actual PDF file inside:
//
// project/
// ├── index.html
// ├── script.js
// ├── style.css
// └── documents/
//     └── CSC322-Lecture-Notes.pdf
//
// The URL below MUST match the file location.
// =========================================

let repository = [
    {
        name: "IFT 302 Lecture Notes",
        size: "Permanent Document",
        url: "REAL IFT 302 Notes.pdf"
    }
];


// =========================================
// CORRECTION #2
// Console verification.
//
// Open browser console:
// Chrome: F12 -> Console
// Firefox: F12 -> Console
//
// You should see the permanent document.
// =========================================

console.log("Repository loaded:", repository);


// =========================================
// Upload Button Event
// =========================================

button.addEventListener('click', function () {

    statusMessage.textContent = "";

    // Check if any file was selected
    if (uploader.files.length === 0) {
        statusMessage.style.color = "#ef4444";
        statusMessage.textContent = "Error: No documents selected.";
        return;
    }

    let successCount = 0;
    let errorCount = 0;

    // Process each uploaded file
    for (let i = 0; i < uploader.files.length; i++) {

        let uploadedFile = uploader.files[i];

        // PDF validation
        if (uploadedFile.type !== "application/pdf") {
            errorCount++;
            continue;
        }

        // Create temporary browser URL
        let fileURL = URL.createObjectURL(uploadedFile);

        // Store document information
        let documentRecord = {
            name: uploadedFile.name,
            size: (uploadedFile.size / 1024).toFixed(2) + " KB",
            url: fileURL
        };

        repository.push(documentRecord);

        successCount++;
    }

    // Status messages
    if (successCount > 0 && errorCount === 0) {

        statusMessage.style.color = "#10b981";
        statusMessage.textContent =
            `Success: ${successCount} document(s) ingested.`;

    } else if (successCount > 0 && errorCount > 0) {

        statusMessage.style.color = "#f59e0b";
        statusMessage.textContent =
            `Warning: ${successCount} ingested, but ${errorCount} failed (Not a PDF).`;

    } else {

        statusMessage.style.color = "#ef4444";
        statusMessage.textContent =
            "Error: All selected files were invalid formats.";
    }

    uploader.value = "";

    renderRepository();

    // =========================================
    // CORRECTION #3
    // Verify uploads are being stored.
    // Check Console after uploading.
    // =========================================

    console.log("Updated Repository:", repository);
});


// =========================================
// Render Repository
// =========================================

function renderRepository() {

    documentList.innerHTML = "";

    // If repository is empty
    if (repository.length === 0) {

        documentList.innerHTML =
            '<li class="empty-state">No documents currently in the repository.</li>';

        return;
    }

    repository.forEach(function (doc) {

        const listItem = document.createElement('li');

        const fileInfo = document.createElement('span');

        fileInfo.innerHTML = `
            <strong>${doc.name}</strong>
            <br>
            <small style="color:#64748b;">${doc.size}</small>
        `;

        const downloadLink = document.createElement('a');

        // =========================================
        // CORRECTION #4
        // Proper download configuration
        // =========================================

        downloadLink.href = doc.url;

        // Download using original file name
        downloadLink.setAttribute('download', doc.name);

        downloadLink.textContent = "Download";

        downloadLink.className = "download-btn";

        listItem.appendChild(fileInfo);
        listItem.appendChild(downloadLink);

        documentList.appendChild(listItem);
    });
}


// =========================================
// CORRECTION #5
// Show permanent documents immediately
// when page loads.
// =========================================

renderRepository();


// =========================================
// CORRECTION #6
// Final startup check.
//
// Open browser console.
// You should see:
//
// Repository loaded:
// [
//   {
//      name: "CSC 322 Lecture Notes",
//      size: "Permanent Document",
//      url: "./documents/CSC322-Lecture-Notes.pdf"
//   }
// ]
//
// If you don't see it,
// script.js is not loading.
//
// If you see it but download fails,
// the file path is wrong.
// =========================================

console.log("Application started successfully.");

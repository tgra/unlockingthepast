pdfjsLib.getDocument(url).promise.then(function (pdfDoc_) {
    pdfDoc = pdfDoc_;
    document.getElementById('page_count').textContent = pdfDoc.numPages;

    renderPage(pageNum);
});

window.addEventListener('hashchange', () => {
    const pageNum = parseInt(location.hash.substring(1));
    if (!isNaN(pageNum)) renderPage(pageNum);
});

// Check for page number in URL hash on load
window.onload = () => {
    const pageNum = parseInt(location.hash.substring(1));
    if (!isNaN(pageNum)) renderPage(pageNum);
};


// Function to go to a specific page (e.g., from a URL parameter)
function goToPage(pageNum) {
    if (pageNum > 0 && pageNum <= pdfDoc.numPages) {
        currentPage = pageNum;
        renderPage(currentPage);
    }
}



function onFirstPage() {
    pageNum = 1;
    queueRenderPage(1);
}
document.getElementById('first').addEventListener('click', onFirstPage);


/**
 * Displays last page.
 */
function onLastPage() {

    pageNum = pdfDoc.numPages;
    queueRenderPage(pageNum);
}
document.getElementById('last').addEventListener('click', onLastPage);


/**
 * Displays previous page.
 */
function onPrevPage() {
    if (pageNum <= 1) {
        return;
    }
    pageNum--;
    queueRenderPage(pageNum);
}
document.getElementById('prev').addEventListener('click', onPrevPage);

/**
 * Displays next page.
 */
function onNextPage() {
    if (pageNum >= pdfDoc.numPages) {
        return;
    }
    pageNum++;
    queueRenderPage(pageNum);
}
document.getElementById('next').addEventListener('click', onNextPage);
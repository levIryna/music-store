function formatPrice(price) {
    return `${price.toFixed(2)} грн`;
}

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
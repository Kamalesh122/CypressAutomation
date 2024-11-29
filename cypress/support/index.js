Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('getInstalledRelatedApps() is only supported in top-level browsing contexts')) {
        return false; // prevent Cypress from failing the test
    }
});

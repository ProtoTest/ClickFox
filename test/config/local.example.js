exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome'
    },
    multiCapabilities: [],

    baseUrl: 'http://localhost:3333'
};
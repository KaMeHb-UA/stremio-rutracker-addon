const { addonBuilder, serveHTTP, publishToCentral }  = require('stremio-addon-sdk')
const RutrackerStreamProviderService = require("./services/RutrackerStreamProviderService")

const rutrackerStreamProviderService = new RutrackerStreamProviderService()

const builder = new addonBuilder({
    id: 'io.strem.rutracker.addon',
    version: '0.0.1',

    name: 'Rutracker addon',

    // Properties that determine when Stremio picks this addon
    // this means your addon will be used for streams of the type movie
    catalogs: [],
    resources: ['stream'],
    types: ['movie'],
    idPrefixes: ["tt"]
    
});

builder.defineStreamHandler(function(args) {
    if (args.type === 'movie') {
        return Promise.resolve({streams: rutrackerStreamProviderService.getStreamsById(args.id)})
    }
})
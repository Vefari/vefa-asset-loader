'use strict'
let utils = require('loader-utils');

module.exports = function(source){
    this.cacheable && this.cacheable();
    
    // get config
    let config = utils.getLoaderConfig(this);
    
    // get the specific context involved, defaulting to Webpack's declared context
    let context = {
        context: config.context || utils.getLoaderConfig(this, "context"),
        content: source
    };
    
    // define a specific extension either through the query or through the options
    // if no extension given, default to the one sent aong
    // create the general basic filepath
    let default_path = "[path][name]." + (config.extension || "[ext]");
    let file_path = config.export || default_path;
    
    // lets sub out all the placeholders
    var file = utils.interpolateName(
        this,
        file_path,
        context
    );

    // output the file and remove it from the stream as we don't need it anymore.
    if (file_path !== "") {
        this.emitFile(file, source);
    }

    if (config.passSource) {
        return source;
    }
    else {
        return "";
    }
}
module.exports.raw = true;

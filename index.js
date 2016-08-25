var utils = require('loader-utils');

module.exports = function(source){
    this.cacheable && this.cacheable();
    
    // get config
    var config = utils.getLoaderConfig(this, "vefaAsset");
    
    // get the specific context involved, defaulting to Webpack's declared context
    var context = {
        context: config.context || this.options.context,
        content: source
    };
    
    // define a specific extension either through the query or through the options
    // if no extension given, default to the one sent aong
    var extension = config.extension || "[ext]";

    // create the general basic filepath
    var default_path = "[path][name]." + extension;

    var file_path = config.export || default_path;
    
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

    return "";
}
module.exports.raw = true;
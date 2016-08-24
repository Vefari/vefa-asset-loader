var loader_utils = require('loader-utils');

module.exports = function(source){
    this.cacheable && this.cacheable();

    // get the options contained in the query
    var query = loader_utils.parseQuery(this.query);
    
    // get the extra options not contained in the query
    var opts = this.options.vefaAssets || {};
    
    // get the specific context involved, defaulting to Webpack's declared context
    var context = {
        context: query.context || opts.context || this.options.context,
        content: source
    };
    
    // define a specific extension either through the query or through the options
    // if no extension given, default to the one sent aong
    var extension = query.extension || opts.extension || "[ext]";

    // create the general basic filepath
    var default_path = "[path][name]." + extension;

    var file_path = query.export || opts.export || default_path;
    
    // lets sub out all the placeholders
    var file = loader_utils.interpolateName(
        this,
        file_path,
        context
    );

    // output the file and remove it from the stream as we don't need it anymore.
    if (file_path !== "") {
        this.emitFile(file, source);
    }

    return;
}
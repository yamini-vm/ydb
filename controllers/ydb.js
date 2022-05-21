exports.getIndex = (req, res, next) => {
    res.render('index', { 
       docTitle: 'Choose type',
       jsFile: "index.js",
    });
};

exports.getASM = (req, res, next) => {
    res.render('asm', { 
       docTitle: 'Assembly debugger',
       jsFile: "asm.js",
    });
}

exports.getBin = (req, res, next) => {
    res.render('bin', { 
       docTitle: 'Executable binary debugger',
       jsFile: "bin.js",
    });
}

exports.postDebug = (req, res, next) => {
    let prog_type = req.body.prog_type;
    
    return res.send(JSON.stringify({
        "icon": "success",
        "title": "Success",
        "text": "Started debugging successfully!",
        "url": "/" + prog_type,
    }));
}
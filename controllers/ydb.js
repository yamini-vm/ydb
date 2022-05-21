const fs = require("fs");
const { execSync } = require("child_process");

exports.getIndex = (req, res, next) => {
    res.render('index', { 
       docTitle: 'Choose Program Type',
       jsFile: "index.js",
    });
};

exports.getASM = (req, res, next) => {
    res.render('asm-bin', { 
       docTitle: 'Assembly debugger',
       jsFile: "asm-bin.js",
       isAsm: true,
       showResult: false,
    });
}

exports.getBin = (req, res, next) => {
    res.render('asm-bin', { 
       docTitle: 'Executable binary debugger',
       jsFile: "asm-bin.js",
       isAsm: false,
       showResult: false,
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

let check_correct_extension = (file_path, extension) => {
    if (!file_path.endsWith("." + extension)) {
        return {
            "icon": "error",
            "title": "Error",
            "text": "File is not a " + extension + " file!",
        };
    }

    return {
        "icon": "success",
    };
}

let read_file = (file_path) => {
    try {
        const data = fs.readFileSync(file_path, 'utf8');
        return {
           "icon": "success",
           "data": data, 
        };
    } catch (err) {
        return {
            "icon": "error",
            "title": "Error",
            "text": err,
        };
    }
};

let check_file_exists = (file_path) => {
    if (!fs.existsSync(file_path)) {
        return {
            "icon": "error",
            "title": "Error",
            "text": "File path does not exist!",
        };
    }

    return {
        "icon": "success",
    };
};

let perform_file_checks = (file_path, check_ext) => {
    let result;

    if (check_ext) {
        result = check_correct_extension(file_path, "yas");
        if (result['icon'] == 'error') {
            return result;
        }
    }

    result = check_file_exists(file_path);
    if (result['icon'] == 'error') {
        return result;
    }

    return {
        "icon": "success",
    }
}

let execute_and_return = (cmd, file_path, check_ext) => {
    let result = perform_file_checks(file_path, check_ext);
    if (result['icon'] == 'error') {
        return result;
    }

    let file_html = "<pre>";
    result = read_file(file_path);
    if (result['icon'] == 'error') {
        return result;
    } else {
        file_html += result['data'];
    }

    file_html += "</pre>";

    let tokens = "<pre>";
    tokens += execSync(cmd);
    tokens += "</pre>";

    return {
        "icon": "success",
        "title": "Success",
        "text": "Started debugging successfully!",
        "showResult": true,
        "code": file_html,
        "debug": tokens,
    };
}

exports.postAsmTokens = (req, res, next) => {
    let file_path = req.body.file_path;
    let cmd = "yamasm " + file_path + " --tokens"; 
    let result = execute_and_return(cmd, file_path, true);

    return res.send(JSON.stringify(result));
};

exports.postAsmInstructions = (req, res, next) => {
    let file_path = req.body.file_path;
    let cmd = "yamasm " + file_path + " --instructions"; 
    let result = execute_and_return(cmd, file_path, true);

    return res.send(JSON.stringify(result));
}

exports.postBinInstructions = (req, res, next) => {
    let file_path = req.body.file_path;
    let cmd = "yamini " + file_path + " --instructions"; 
    let result = execute_and_return(cmd, file_path, false);

    result['code'] = "Cannot display binary!";

    return res.send(JSON.stringify(result));
}
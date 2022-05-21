$(document).ready(function() {
    let prog_type_check = (prog_type) => {
        return prog_type != "sel";
    }

    $("#debug-btn").click(() => {
        register_check_function("prog_type", prog_type_check, " select a program type!");

        let data = {"prog_type": ["prog_type"]};
        let unchecked_data_hook = {};
        
        validate_and_post("/debug", data, swal_ajax_post_redirect, unchecked_data_hook);
    });
});
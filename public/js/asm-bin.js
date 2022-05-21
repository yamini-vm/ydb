$(document).ready(function() {
    let gen_using_url = (url, data_id) => {
        let file_path = $("#" + data_id).val();

        if (!file_path) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "File path is required!",
            });
        }

        let data = {"file_path": file_path};

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: data,
            success: function(result) {
                Swal.fire({
                    icon: result.icon,
                    title: result.title,
                    text: result.text,
                }).then(function() {
                    if (result.showResult) {
                        $("#debug-div").css("display", "block");
                    }

                    if (result.code) {
                        $("#code").html(result.code);
                    } 

                    if (result.debug) {
                        $("#debug").html(result.debug);
                    }
                });
            },
        });
    }

    $("#asm-tokens").click(() => {
        gen_using_url("/asm-tokens", "asm_filepath");
    });

    $("#asm-instructions").click(() => {
        gen_using_url("/asm-instructions", "asm_filepath");
    });

    $("#bin-instructions").click(() => {
        gen_using_url("/bin-instructions", "bin_filepath");
    });
});
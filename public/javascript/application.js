function renderFormErrors(errJSON) {
    let err = JSON.parse(errJSON);

    console.log(errJSON);

    Object.keys(err).forEach((field) => {
        let input = document.getElementById(field);
        let msg = err[field].message; 

        input.classList.add("is-invalid");

        //toastr["error"](msg, "Error")
        toast.error(msg);
    })
}


window.onload = function(){
    document.querySelectorAll('form[data-errors]').forEach((el) => {
        if(el.dataset.errors.length > 0) {
            renderFormErrors(el.dataset.errors);
        }
    })
}
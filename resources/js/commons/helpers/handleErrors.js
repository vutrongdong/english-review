export function handleErrors(errors) {
    let objErr = {};
    if(errors) {
        errors.forEach(function(element) {
            objErr[element.param] = element.msg;
        })
    } 

    return objErr;
}
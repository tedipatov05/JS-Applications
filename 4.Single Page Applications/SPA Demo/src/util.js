export function setUserData(data) {
    sessionStorage.setItem("userId", data._id)
    sessionStorage.setItem("userName", data.username)
    sessionStorage.setItem("accessToken", data.accessToken)
}

export function removeUserData() {
    sessionStorage.removeItem("userId")
    sessionStorage.removeItem("userName")
    sessionStorage.removeItem("accessToken")
}

export function createSubmitHandler(formId, callback) {
    document.getElementById(formId).addEventListener("submit", onSubmit)
    function onSubmit(event) {
        event.preventDefault(); 
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
        callback(data, event)
    } 
}
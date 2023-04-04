export function getUserData(){
    const data = JSON.parse(sessionStorage.getItem('userData'));
    return data;
}

export function setUserData(data){
    sessionStorage.setItem('userData', JSON.stringify(data));
}

export function clearUserData(){
    sessionStorage.removeItem('userData');
}

//option
export function createSubmitHandler(callback){
    return function(e){
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        callback(data);
    }
}

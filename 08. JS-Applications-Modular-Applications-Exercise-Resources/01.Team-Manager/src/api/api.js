const host = 'http://localhost:3030';

async function request(url, options){
    try{
        const response = await fetch(host + url, options);
        if(!response.ok){
            const err = await response.json();
            throw new Error(err.message);

        }
        try{

            if(response.status === 204){
                return response;
            }
            const data = await response.json();
            return data;
        }
        catch(error){
            //alert(error.message);
            throw error;
        }

    }catch(err){
        //alert(err.message);
        throw err

    }
}

function getOption(method, body){
    const option = {
        method,
        headers : {}
    }

    const user = JSON.parse(sessionStorage.getItem('userData'));
    

    if(user){
        const token = user.accessToken;
        option.headers["X-Authorization"] = token;
    }

    if(body){
        option['body'] = JSON.stringify(body);
        option.headers["Content-Type"] = "application/json";
    }

    return option;
}

export async function get(url){
    return await request(url, getOption('GET'));
}

export async function post(url, data){
    return await request(url, getOption('POST', data));
}
export async function put(url, data){
    return await request(url, getOption('PUT', data));
}
export async function del(url){
    return await request(url, getOption('DELETE'));
}


export interface HttpRequest<T> {
    url: string;
    data: T;
}


export function get( data: HttpRequest<any>) {
    return fetch(data?.url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(data)
    })
}

export function post( data: HttpRequest<any>) {
    return fetch(data?.url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data?.data)
    })
}

export function submitForm  ( data: HttpRequest<FormData>) {
    return fetch(data?.url, {
        method: 'POST',
        body: data?.data
    })
}

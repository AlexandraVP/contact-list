
export function authorize(token){
    localStorage.setItem('token', token);
}

export function unauthorize() {
    localStorage.removeItem('token');
}

export function isAuthorized() {
   return localStorage.getItem('token') !== null;
}

export function getAuthHeader(){
    return {'X-Auth-Token': localStorage.getItem('token')};
}
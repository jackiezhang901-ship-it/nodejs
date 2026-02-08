import { HttpRequest, post, submitForm } from '../common/http';

export interface LoginData {
    username: string;
    password: string;    
}

 class LoginService {
     async login(data: LoginData) : Promise<any> {
        const response = await post({
         url: '/api/login',
         data: data
       });    
       return response;
    }
}

export default new LoginService();
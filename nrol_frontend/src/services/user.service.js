import http from "../http-common";

class UserDataService {

    getUsername(){
        return http.get('/getUsername')
    }

    login(data){
        return http.post('/login', data)
    }

    register(data){
        return http.post('/register', data)
    }

    isUserAuth(data){
        return http.get('/isUserAuth', data)
    }
}

export default new UserDataService();
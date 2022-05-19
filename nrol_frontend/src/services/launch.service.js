import http from "../http-common";

class LaunchDataService {
    getAll(){
        return http.get("/launches");
    }

    get(id){
        return http.get(`/launches/${id}`);
    }

    create(data){
        return http.post("/launches", data);
    }

    update(id, data){
        return http.put(`/launches/${id}`, data);
    }

    delete(id){
        return http.delete(`/launches/${id}`);
    }

    deleteAll(){
        return http.delete("/launches");
    }

    findByTitle(title){
        return http.get(`/launches?title=${title}`);
    }
}

export default new LaunchDataService();
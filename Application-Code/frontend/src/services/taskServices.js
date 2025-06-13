import axios from "axios";
const apiUrl =  "http://a71de30d783844e20b031890b39a67d9-1036758062.us-east-1.elb.amazonaws.com:8080/api/tasks";
console.log(apiUrl)
export function getTasks() {
    return axios.get(apiUrl);
}

export function addTask(task) {
    return axios.post(apiUrl, task);
}

export function updateTask(id, task) {
    return axios.put(apiUrl + "/" + id, task);
}

export function deleteTask(id) {
    return axios.delete(apiUrl + "/" + id);
}



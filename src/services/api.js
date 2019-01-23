import axios from "axios";



export const signupCall = (email, question, answer) => {
    return axios.post("http://localhost:8080/users", {
        email,
        security: {question, answer}
    }).then((response) => {
        const {_id, email} = response.data;
        const token = response.headers['x-auth'];
        return {_id, email, token};
    }).catch((error) => {
       throw error;
    })
}
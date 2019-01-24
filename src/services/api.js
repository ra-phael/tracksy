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

export const getQuestionCall = (email) => {
    return axios.get("http://localhost:8080/users/question", {
        params: {email: email}
    }).then((response) => {
        console.log(response);
        return response.data.question;
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

export const loginCall = (email, answer) => {
    return axios.post("http://localhost:8080/users/login", {
        email,
        security: {
            answer
        }
    }).then((response) => {
        const {_id, email} = response.data;
        const token = response.headers['x-auth'];
        return {_id, email, token};
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

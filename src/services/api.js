import axios from "axios";

const BASE_URL = 'http://localhost:8080';

export const signupCall = (email, question, answer) => {
    return axios.post(BASE_URL + "/users", {
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
    return axios.get(BASE_URL + "/users/question", {
        params: {email: email}
    }).then((response) => {
        // console.log(response);
        return response.data.question;
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

export const loginCall = (email, answer) => {
    return axios.post(BASE_URL + "/users/login", {
        email,
        security: {
            answer
        }
    }).then((response) => {
        const {_id, email, watchedItems} = response.data;
        const token = response.headers['x-auth'];
        return {_id, email, watchedItems, token};
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

export const logOutCall = (token) => {
    return axios.delete(BASE_URL + "/users/me/token", {
        headers: {'x-auth': token}
    }).then((response) => {
        // console.log(response);
        return response;
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

export const getItemsCall = () => {
    return axios.get(BASE_URL + "/items").then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        throw error;
    })
}

export const updateWatchedItemsCall = (token, itemId) => {
    return axios.patch(BASE_URL + "/users/watcheditems",{
        item: {
            _id: itemId
        }
    }, {
        headers: {'x-auth': token}
    }).then((response) => {
        return response.data
    }).catch((error) => {
        console.log(error);
        throw error
    })
}
import axios from 'axios'

export const setToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export const call = async (method, path, data) => {
    //axios.post/get
    const response = await axios[method](`/${path}`, data);
    console.log("Server Response", response.data)
    return response.data;
}

export default { call, setToken };
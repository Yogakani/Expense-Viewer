import axios from 'axios';

const baseUrl = 'http://localhost:8080/';

export async function post (uri, data) {
    try {
        const response = await axios.post(baseUrl + uri, data);
        if (response.status === 200) {
            const data = response.data;
            return data;
        } else {
            return {'code' : response.code, 'msg' : response.message};   
        }
    } catch (error) {
        console.error(error);
        return {'code' : error.code, 'msg' : error.message};   
    }
}
import axios from "axios"
import { getDecodedToken } from "@/utils/utils";

const BASE_URL = 'https://super.xertify.co:40004'

export async function createPreferences(preferences){
    try {
        let response = await axios.post(`${BASE_URL}/admin/v1/preference`, preferences);
        return response.data
    } catch (error) {
        throw error
    }
}

export async function updatePreferences(preferences, id){
    try {
        let response = await axios.put(`${BASE_URL}/admin/v1/preference/${id}`, preferences);
        return response.data
    } catch (error) {
        throw error
    }
}

export async function getPreferences(){
    try {
        let decodedToken = getDecodedToken();
        let acc_id = decodedToken.acc_id;
        let response = await axios.get(`${BASE_URL}/admin/v1/preference/${acc_id}`);
        return response.data
    } catch (error) {
        throw error
    }
}
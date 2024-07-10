import http from "./HttpService";
import { getDecodedToken } from '@/utils/utils';
import axios from 'axios';

const apiURL = process.env.nextAppApiUrl;

const baseUrl = `https://super.xertify.co:40003`
const headers = {
  "Content-Type": "application/json",
};


export const postUsers = async (path, data) => {
  try {
    const response = await axios.post(`${baseUrl}${path}`, data, { headers: headers });
    return response;
  } catch (error) {
    console.error('Error ', error)
    throw error.response?.data || error;
    // throw new Error(error.response?.data?.error?.message || error || 'Error');
  }
};

export const getUserByAccId = async (accId) => {
    try {
      const response = await axios.get(`${baseUrl}/users/getInternalUsers/${accId}`,{ headers: headers });
      return response
    } catch (error) {
      console.error('Error ', error)
      throw new Error(error || 'Error');
    }
  }


export const getExternalUsers = (id = "9d634a08-8184-40c8-a97d-927decc77a68") => {
    return http.get(apiURL + '40004/admin/v1/directory/'+ id)
}

//export const getInternalUsers = (id = "7d638a08-8184-40c8-a97d-927decc57a68") => {
export const getInternalUsers = (id = "9d634a08-8184-40c8-a97d-927decc77a68") => {
    return http.get(apiURL + '40003/users/getInternalUsers/' + id);
}

export const getWorkflows = (id) => {
    return http.get(apiURL + '40002/workflow/v1/users/ByStaffId?staffId=' + id)
}

export const getResponsiblesUsers = (id)=>{
  return http.get(apiURL + '40002/workflow/v1/responsibles/' + id)
}

export const getPersonalInfoByEmail = (email) => {
  return http.get(apiURL + '40003/users/getPersonalInfoByEmail/'+ email)
}

export const getDocumentTypesGroupByCountry = async ()=> {
  let response = await http.get(apiURL + '40004/admin/v1/id-types')
  let documentsAndCountries = response.data.data;
  let countries = [];
  documentsAndCountries.map((item)=>{
    if(!(countries.filter((country)=>country.COU_ID === item.country.COU_ID).length>0)){
      countries.push(item.country)
    }
  })

  countries.sort((a, b) => a.COU_ID - b.COU_ID);

  countries = countries.map((item)=>{
    let documents = [];
    documentsAndCountries.map((dandc)=>{
      if(dandc.country.COU_ID === item.COU_ID){
        let aux = {...dandc}
        delete aux.country
        documents.push(aux)
      }
    })
    return {
      ...item,
      documents: documents
    }
  })
  return countries
}
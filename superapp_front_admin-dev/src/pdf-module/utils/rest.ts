
import axios from 'axios';
import Cookies from 'js-cookie';

const baseUrl = `https://super.xertify.co`;
const pdfEditorBaseUrl = 'https://super.xertify.co:40002';
const token = Cookies.get('token');
const headers = {
  'Content-Type': 'application/json',
  Authorization: token ? `Bearer ${token}` : null,
};

// doc: https://axios-http.com/docs/instance
const axiosPdfEditorApiInstance = axios.create({
  baseURL: pdfEditorBaseUrl,
  timeout: 30000, // 30 seconds
  headers,
});

/**
 * Perform a GET request to the specified path.
 * @param path - The path to send the GET request to.
 * @param data - The request data.
 * @returns The response from the GET request.
 * @throws If an error occurs during the GET request.
 */
export const get = async (path: string, data: any) => {
  try {
    const response = await axios.get(`${baseUrl}${path}`, { headers: headers });
    return response;
  } catch (error: any) {
    console.error('Error ', error);
    throw new Error(error || 'Error');
  }
};

/**
 * Perform a POST request to the specified path.
 * @param path - The path to send the POST request to.
 * @param data - The request data.
 * @returns The response from the POST request.
 * @throws If an error occurs during the POST request.
 */
export const post = async (path: string, data: any) => {
  try {
    const response = await axios.post(`${baseUrl}${path}`, data, {
      headers: headers,
    });
    return response;
  } catch (error: any) {
    console.error('Error ', error);
    throw new Error(error || 'Error');
  }
};

/**
 * Fetch data from an API.
 * @returns The fetched data.
 * @throws If an error occurs during the fetch request.
 */
export async function fetchDataFromAPI() {
  try {
    const response = await fetch(
      'https://eock41hx1ubrrcf.m.pipedream.net/?accId=c6574eb5-c7d0-4af9-9def-aa42daa96551'
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}

export const axiosPdfEditorApi = {
  /**
   * Perform a GET request to the specified path using the axiosPdfEditorApiInstance.
   * @param path - The path to send the GET request to.
   * @returns The response from the GET request.
   * @throws If an error occurs during the GET request.
   */
  get: async (path: string) => {
    try {
      const response = await axiosPdfEditorApiInstance.get(
        `${pdfEditorBaseUrl}${path}`
      );
      return response;
    } catch (error: any) {
      console.error('Error ', error);
      throw new Error(error || 'Error');
    }
  },
  /**
   * Perform a POST request to the specified path using the axiosPdfEditorApiInstance.
   * @param path - The path to send the POST request to.
   * @param data - The request data.
   * @returns The response from the POST request.
   * @throws If an error occurs during the POST request.
   */
  post: async (path: string, data: any) => {
    try {
      const response = await axiosPdfEditorApiInstance.post(
        `${pdfEditorBaseUrl}${path}`,
        data
      );
      return response;
    } catch (error: any) {
      console.error('Error ', error);
      throw new Error(error || 'Error');
    }
  },
};

/**
 * Get document instruction by id.
 * @param id - The id of the document instruction.
 * @returns The document instruction.
 */
export const getDocumentInstructionsById = async (id: string) => {
  const response = await axiosPdfEditorApi.get(`/workflow/v1/documents/${id}`);
  return response.data;
};

/**
 * Create document instructions.
 * @param instructionsObj - The instructions payload.
 * @returns The response from the create document instructions request.
 */
export const createDocumentInstructions = async (instructionsObj: any) => {
  const response = await axiosPdfEditorApi.post(
    '/workflow/v1/documents/instruction',
    instructionsObj
  );
  return response;
};

import axios from "axios";

const baseUrl = `https://super.xertify.co:40007`
const headers = {
  "Content-Type": "application/json"
};

export const UploadFile = async (file, path, staff_id, type) => {
    try {
      let formData = new FormData();
      formData.append('file', file)
      formData.append('path', path)
      formData.append('staff_id', staff_id)
      formData.append('type', type)
      const response = await axios.post(`${baseUrl}/files-manager/upload`, formData,{ headers: {
        'Content-Type': 'multipart/form-data'
      } });
      return response
    } catch (error) {
      console.error('Error ', error)
      throw new Error(error || 'Error');
    }
  }

export const DownloadFileByKey = async (file) => {
  try {
    const response = await axios.get(`${baseUrl}/files-manager/downloadFile?key=${file.filePath}`);
    const parts = file.filePath.split('/');
    const fileName = parts[parts.length - 1];
    const element = document.createElement('a');
    element.href = `data:${file.fileType};base64,${response.data.data}`;
    element.download = `${fileName}`;
    document.body.appendChild(element);
    element.click();
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const GetBase64UrlFileByKey = async (key, type) => {
  try {
    const response = await axios.get(`${baseUrl}/files-manager/downloadFile?key=${key}`);
    return `data:${type};base64,${response.data.data}`;
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}

export const getAllFilesByStaffId = async (staff_id) => {
  try {
    const response = await axios.get(`${baseUrl}/files-manager/getDocuments/${staff_id}`);
    return response.data;
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
}
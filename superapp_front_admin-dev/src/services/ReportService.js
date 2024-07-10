import { getDecodedToken } from '@/utils/utils';
import axios from 'axios';
import moment from 'moment';

const baseUrl = `https://super.xertify.co:40002`
const headers = {
  "Content-Type": "application/json",
};

export const getWorkflowsCompletedsReport = async () => {
  try {
    const decodedToken = getDecodedToken();
    const accId = decodedToken.acc_id;
    const response = await axios.get(`${baseUrl}/workflow/v1/users/report/emission/${accId}`, { headers: headers });

    const data = response.data.data;

    const currentDate = moment();

    const in72hours = data.filter((item)=>(item.status !== "PENDING" && moment(item.date_last_updated).isBetween(currentDate.clone().subtract(72, 'hours'), currentDate))).length
    
    return [{
        label: "Dentro del plazo de 72 hrs",
        value: in72hours,
        color: "rgb(106, 142, 34)"
      }, 
      {
        label: "Pendientes fuera del plazo de 72 hrs",
        value: data.length-in72hours,
        color: "rgb(129, 0, 127)"
      }];
  } catch (error) {
    console.error('Error ', error)
    throw new Error(error || 'Error');
  }
};

export const getWorkflowsPendingsReport = async () => {
    try {
      const decodedToken = getDecodedToken();
      const accId = decodedToken.acc_id;
      const response = await axios.get(`${baseUrl}/workflow/v1/users/report/emission/${accId}`, { headers: headers });
      
      const currentDate = moment();
  
      const data = response.data.data.filter((item)=>moment(item.date_finish).isBefore(currentDate) && item.status === "PENDING");
  
  
      const inNextHours = data.filter((item)=>(moment(item.date_finish).isBetween(currentDate.clone().subtract(12, 'hours'), currentDate))).length
      
      return [{
          label: "A puertas del vencimiento",
          value: inNextHours,
          color: "rgb(254, 165, 0)"
        }, 
        {
          label: "Vigente",
          value: data.length-inNextHours,
          color: "rgb(1, 0, 128)"
        }];
    } catch (error) {
      console.error('Error ', error)
      throw new Error(error || 'Error');
    }
  };
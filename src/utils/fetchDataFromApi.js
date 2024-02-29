import axios from 'axios';

export const fetchDataFromApi = async (url, body) => {
  try {
    const final =  import.meta.env.VITE_SERVER_URL + url;
     // const final = "http://192.168.1.9:8664" + url
    const {data} = await axios.post(final, body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
    });
    
    if (data.errorcode && data.errorcode === 401) {
      // Cookies.remove('token');
      // window.location.replace('/')
      return null;
    } else {
      return data;
    }
  } catch (error) {
    console.error(error, 'api error');
    return error;
  }
};

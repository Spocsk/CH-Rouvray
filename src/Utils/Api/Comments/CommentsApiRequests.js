import axios from 'axios';
import { getToken } from '../../Common'


const config = {
    headers: {
        'accept': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

export async function getComments() {
    var config = {
        method: 'get',
        url: `${process.env.REACT_APP_URL_API}/comments/`,
        headers: { 
          'Accept': 'application/json', 
          'Authorization': `Bearer ${getToken()}`
        }
      };
      
      return axios(config)
      .then(function (res) {
          return res.data
      })
}

export async function postComment(data) {
    return await axios.post(process.env.REACT_APP_URL_API + "/comments", data, config)
    .then((res) => {
        return res.data
    })
}

export function deleteNews() {

}

export function patchNews() {

}
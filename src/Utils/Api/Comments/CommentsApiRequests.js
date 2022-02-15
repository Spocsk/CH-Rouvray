import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getToken } from '../../Common'


const [New, setNew] = useState({})

const config = {
    headers: {
        'accept': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

const myHeaders = new Headers({
    'accept': 'application/json',
    Authorization: `Bearer ${getToken()}`
  });

const configFetch = { 
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

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

export async function getComment(URI) {
    await fetch(`${process.env.REACT_APP_URL_API}/comments/${handleUriToId(URI)}`, configFetch)
    .then(res => res.json())
    .then(json => console);
}

const handleUriToId = (uri) => {
    return uri.split('/')[3]
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
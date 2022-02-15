import axios from 'axios';
import { useState } from 'react'
import { getToken } from '../../Common'

const config = {
    headers: {
        'accept': 'application/json',
        Authorization: `Bearer ${getToken()}`
    }
}

export async function getNews() {
    return await axios.get(process.env.REACT_APP_URL_API + "/news", config)
    .then((res) => {
        sessionStorage.setItem('news', JSON.stringify(res.data))
        return res.data
    })
}

export async function getNew(id) {
    return await axios.get(`${process.env.REACT_APP_URL_API}/news/${id}`, config)
    .then((res) => {
        return res.data
    })
}

export async function postNews(data) {
    return await axios.post(process.env.REACT_APP_URL_API + "/news", data, config)
    .then((res) => {
        return res.data
    })
}

export function deleteNews() {

}

export function patchNews() {

}
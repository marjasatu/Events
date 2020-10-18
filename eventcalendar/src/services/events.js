import axios from 'axios'
const baseUrl = 'http://api.hel.fi/linkedevents/v1/event/?'

const getAll = (startdate, enddate, division, keyword, text) => {
    const url=`${baseUrl}&start=${startdate}&end=${enddate}&division=${division}&keyword=${keyword}&text=${text}&super_event_type=none&include=keywords,location`
    const request = axios.get(url)
    return request.then(response => response.data.data)
}


export default {getAll}
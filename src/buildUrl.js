import qs from 'qs';

var buildUrl = function(url, params){
    if(!params) return url;
    return url+'?'+qs.stringify(params);
}

export default buildUrl

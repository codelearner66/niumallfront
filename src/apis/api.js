import service from './apiconfig';
/**

 * post请求

 * @param url  请求地址

 * @param params 请求参数

 * @returns

 */

export const postRequest=(url,params)=>{

    return service.post(url,params)
}

/**

 *  get请求

 * @param url  请求地址

 * @param params  请求参数
 * @return

 */

export const getRequest=(url,params)=>{

    return service.get(url, params);

}

/**

 * put请求

 * @param url  请求地址

 * @param params  请求参数

 * @returns

 */

export const putRequest=(url,params)=>{

    return service.put(url,params);

}

/**

 * delete请求

 * @param url  请求地址

 * @param params  请求参数

 * @returns  返回的数据

 */

export const deleteRequest=(url,params)=>{
    return service.delete(url,params);

}
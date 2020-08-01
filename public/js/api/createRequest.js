/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
  let xhr = new XMLHttpRequest,     
      formData = new FormData,
      url = options.url;
  
  xhr.responseType = 'json';
  xhr.withCredentials = true;
  xhr.responseType = options.responseType;

  if(options.method === 'GET') {
    url += '?';      
    for (let key in options.data) {        
      url += `${key}=${options.data[key]}&`;
    };
    
    url = url.substring(0, url.length - 1);
  } else {
    for (let key in options.data) {
      formData.append(key, options.data[key]);
    };
  };    

  xhr.open(options.method, url);

  try {
    if(options.method === 'GET'){      
      xhr.send();
    } else {
      xhr.send(formData);
    };

    xhr.addEventListener('load', () => {
      options.callback(xhr.response.error, xhr.response);    
    });
    
  } catch (error) {
    options.callback(error);    
  };
  
  return xhr;
};
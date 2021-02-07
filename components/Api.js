class API {
    static request(endPoint, method, body) {
      const api = `${process.env.URL_BASE}/api/`
      const data = {
        method,
        headers: {
        },
      }
  
      if (localStorage.getItem('token') !== null) {
        data.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
      }
  
      if (method === 'POST' || method === 'PUT') {
        data.body = JSON.stringify(body)
      }
  
      return new Promise((resolve, reject) => {
        fetch(api + endPoint, data)
          .then(async (response) => {
            if (response.status >= 400) {
              const { message } = await response.json()
              throw new Error(message)
            }
            return response.json()
          })
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    }
    static requestForm(endPoint, method, body) {
      const api = `${process.env.URL_BASE}/api/`
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
  
        xhr.open(method, api + endPoint, true)
        xhr.onload = () => {
          if (xhr.status !== 200) {
            reject(xhr.statusText)
          }
        }
        xhr.upload.onprogress = () => {
          // const complete = (evt.loaded / evt.total) * 100
          // const progress = parseInt(complete, 10)
        }
        xhr.onerror = () => {
          Promise.reject(Error('Network Error'))
        }
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4 && xhr.status === 200) {
            resolve(xhr.response)
          }
        }
  
        xhr.send(body)
      })
    }
  }
  
  export default API
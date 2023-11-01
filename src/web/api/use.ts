import request from 'umi-request'

const getUserInfo = (params?: any) => {
  return request.get('http://localhost:3000/api/getUserInfo', {
    data: {
      ...params
    }
  })
}

export default getUserInfo

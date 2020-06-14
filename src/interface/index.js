let base = "http://localhost:9000"
let online_url ={
    checkName:base+'/account/check_username',
    checkPhone:base+'/account/check_phone',
    verification:base+'/message/verification',
    register:base+'/account/register'
}

export default online_url
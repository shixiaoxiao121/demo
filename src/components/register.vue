<template>
    <div>
        <div style="display: flex;justify-content: center;margin-top: 10%">
            <el-card>
                <div style="margin-top: 8%"></div>
                <div style="width: 350px">
                    <el-input autocomplete="off" placeholder="昵称" v-model="user.username"></el-input>
                    <div class="error_message">{{errMsg.name_error_message}}</div>
                    <el-input placeholder="密码（6-16个字符组成，区分大小写）" type="password" v-model="user.password"></el-input>
                    <div class="error_message">{{errMsg.psw_error_message}}</div>
                    <el-input placeholder="填写常用手机号码" v-model="user.phone"></el-input>
                    <div class="error_message">{{errMsg.phone_err_message}}</div>
                    <div>
                        <el-input placeholder="填写验证码" v-model="captcha"></el-input>
                        <el-button @click="sendCaptcha" class="button_captcha" type="primary">点击获取</el-button>
                        <div class="error_message">{{errMsg.captcha_err_message}}</div>
                    </div>
                    <div>
                        <el-button @click="doRegister" class="button_register" type="primary">
                            注册
                        </el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>

    export default {
        name: "register",
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    phone: '',
                },
                errMsg:{
                    name_error_message:'',
                    psw_error_message:'',
                    phone_err_message: '',
                    captcha_err_message: '',
                },
                captcha: '',
                re_captcha: '',
            }
        },
        watch:{
            'user.username':function(val){
                if (val.length === 0) {
                    this.errMsg.name_error_message= '请告诉我你的昵称吧';
                }else {
                    this.errMsg.name_error_message='';
                }
            },
            'user.password':function(val){
                if (val.length < 6) {
                    this.errMsg.psw_error_message= '密码不能小于6个字符';
                }else {
                    this.errMsg.psw_error_message='';
                }
            }
        },
        methods: {
            sendCaptcha() {
                if (!/^1[0-9]{10}$/.test(this.user.phone)) {
                    this.errMsg.phone_err_message = '手机号格式错误';
                    return;
                }
                //todo 发送验证码
                alert('abc');
                this.re_captcha='abc';
                this.errMsg.phone_err_message = '';
            },
            doRegister() {
                //todo
                if (this.captcha !=='' && this.captcha === this.re_captcha) {
                    if (this.user.username.length === 0) {
                        this.errMsg.name_error_message= '请告诉我你的昵称吧';
                    }
                    if (this.user.password.length < 6) {
                        this.errMsg.psw_error_message= '密码不能小于6个字符';
                    }
                    if(this.errMsg.name_error_message ==='' && this.errMsg.psw_error_message ===''&& this.errMsg.phone_err_message ===''){
                        //todo注册
                    }
                }else {
                    this.errMsg.captcha_err_message='验证码不正确';
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .error_message {
        height: 25px;
        color: #f45d90;
        font-size: 12px;
        text-align: right;
    }

    .button_captcha {
        width: 120px;
        height: 36px;
        position: absolute;
        transform: translate(-102%, 6%);
        /* top: 2px; */
        padding: 0 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .button_register {
        width: 100%;
    }
</style>
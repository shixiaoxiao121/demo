<template>
    <div class="register_page">
        <div style="display: flex;justify-content: center;padding-top: 10%">
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
                        <el-button @click="sendCaptcha" class="button_captcha" type="primary"
                                   v-bind:disabled="isDisabled">{{content}}
                        </el-button>
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

    import router from "../router/router";

    const TIME_OUT = 60;
    export default {
        name: "register",
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    phone: '',
                },
                errMsg: {
                    name_error_message: '',
                    psw_error_message: '',
                    phone_err_message: '',
                    captcha_err_message: '',
                },
                captcha: '',
                re_captcha: '',
                content: '获取验证码',
                isDisabled: false,
                timer: null,
                count: ''
            }
        },
        watch: {
            'user.username': function (val) {
                if (val.length === 0) {
                    this.errMsg.name_error_message = '请告诉我你的昵称吧';
                } else {
                    let params = {
                        username: this.user.username,
                    }
                    this.$fetch(this.$onlineUrl.checkName, params)
                        .then(res => {
                            if (!res.success) {
                                this.errMsg.name_error_message = res.message;
                            }
                        }).catch(err => {
                        alert(err)
                    })

                    this.errMsg.name_error_message = '';
                }
            },
            'user.password': function (val) {
                if (val.length < 6) {
                    this.errMsg.psw_error_message = '密码不能小于6个字符';
                } else {
                    this.errMsg.psw_error_message = '';
                }
            }
        },
        methods: {

            sendCaptcha() {
                if (!/^1[0-9]{10}$/.test(this.user.phone)) {
                    this.errMsg.phone_err_message = '手机号格式错误';
                    return;
                }
                //check phone
                this.$fetch(this.$onlineUrl.checkPhone, {phone: this.user.phone})
                    .then(res => {
                        if (!res.success) {
                            this.errMsg.phone_err_message = res.message;
                        }else {
                            //发送验证码
                            this.$fetch(this.$onlineUrl.verification, {phone: this.user.phone})
                                .then(res => {
                                    if (res.success) {
                                        this.re_captcha = res.message;
                                        this.errMsg.phone_err_message = '';
                                    }
                                }).catch(err => {
                                alert(err)
                            })
                        }
                    }).catch(err => {
                    alert(err)
                })

                if (!this.timer) {
                    this.count = TIME_OUT;
                    this.isDisabled = true;
                    this.timer = setInterval(() => {
                        if (this.count > 1 && this.count <= TIME_OUT) {
                            this.count--;
                            this.content = this.count + "s";
                        } else {
                            this.isDisabled = false;
                            this.content = '获取验证码';
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }


                this.isDisabled = true;
            },
            doRegister() {
                if (this.captcha !== '' && this.captcha === this.re_captcha) {
                    if (this.user.username.length === 0) {
                        this.errMsg.name_error_message = '请告诉我你的昵称吧';
                    }
                    if (this.user.password.length < 6) {
                        this.errMsg.psw_error_message = '密码不能小于6个字符';
                    }
                    if (this.errMsg.name_error_message === '' && this.errMsg.psw_error_message === '' && this.errMsg.phone_err_message === '') {
                        //todo注册
                        let params = {
                            username: this.user.username,
                            phone: this.user.phone,
                            password: this.user.password
                        }

                        this.$post(this.$onlineUrl.register, params)
                            .then(res => {
                                if (res.success) {
                                    //注册成功跳转登录界面
                                    localStorage.setItem("phone", this.user.phone);
                                    localStorage.setItem("psw", this.user.password);
                                    router.push({
                                        path: 'login'
                                    })
                                }else {
                                    alert(res.message)
                                }

                            }).catch(err => {
                            alert(err)
                        })
                    }
                } else {
                    this.errMsg.captcha_err_message = '验证码不正确';
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
        font-size: 13px;
    }

    .button_register {
        width: 100%;
    }

    .register_page {
        height: 100%;
        background-color: darkgray;
    }
</style>
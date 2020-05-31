<template>
    <div class="login_page">
        <div style="display: flex;justify-content: center;padding-top: 10%">
            <el-card style="width: 350px">
                <div>
                    <div style="margin-top: 8%"></div>
                    <el-input placeholder="请输入手机号码" v-model="user.phone"></el-input>
                    <div style="height: 20px"></div>
                    <el-input placeholder="请输入密码" type="password" v-model="user.password"></el-input>
                    <div style="height: 20px"></div>
                    <div>
                        <el-button @click="doLogin" class="button_register" style="width: 100%" type="primary">
                            登录
                        </el-button>
                    </div>
                    <div>
                        <el-link :underline="false" @click="toRegister" type="primary">没有账号?注册</el-link>
                        <el-link :underline="false" @click="toForgetPsw" style="float: right" type="primary">忘记密码
                        </el-link>
                    </div>
                    <div align="right">

                    </div>

                </div>


            </el-card>
        </div>
    </div>
</template>
<script>
    import router from "../router/router";

    export default {
        //单页面中不支持前面的data:{}方式
        data() {
            //相当于以前的function data(){},这是es5之前的写法，新版本可以省略掉function
            return {
                //之前是在里面直接写username，password等等，但是这里要写return
                //因为一个组件不管要不要被其他组件用，只要这样定义了，它就会认为可能这个组件会在其他的组件中使用
                //比如说在这里定义了一个变量，然后把这个组件引入到A组件中，A组件中修改了这个变量
                //同时这个组件也在B组件中引用了，这时候A里面一修改，B里面也变了，它们用的是一个值
                //可是一般来说可能希望在不同的组件中引用的时候，使用不同的值，所以这里要用return
                //这样在A组件和B组件分别引用这个变量的时候是不会互相影响的
                user: {
                    phone: '',
                    password: '',
                }
            }
        },
        created() {
            this.user.phone = localStorage.getItem("phone");
            this.user.password = localStorage.getItem("psw");
        },
        methods: {
            doLogin() {//一点击登录按钮，这个方法就会执行
                //todo 调用后台登录api

            },
            toRegister() {
                router.push({
                    path: 'register',
                })
            },
            toForgetPsw() {

            }
        }
    }
</script>
<style lang="less" scoped>
    .login_page{
        height: 100%;
        background-color: darkgray;
    }
</style>
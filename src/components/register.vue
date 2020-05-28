<template>
    <div>
        <div style="display: flex;justify-content: center;margin-top: 10%">
            <el-card style="width: auto">
                <table>
                    <tr style="height: 20px"></tr>
                    <tr>
                        <td>用户名</td>
                        <td>
                            <el-input placeholder="请输入用户名" v-model="user.username"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>密码</td>
                        <td>
                            <el-input placeholder="请输入密码" style="width: 250px" type="password"
                                      v-model="user.password"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>确认密码</td>
                        <td>
                            <el-input placeholder="请输入密码" style="width: 250px" type="password"
                                      v-model="user.re_password"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <!-- 占两行-->
                        <td colspan="2">
                            <el-button @click="doRegister" style="width:100%" type="primary">注册</el-button>
                        </td>
                    </tr>
                </table>
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
                    re_password: ''
                }
            }
        },
        methods :{
            doRegister(){
                if(this.user.password !== this.user.re_password){
                    alert("aaaa");
                }
            }
        }
    }
</script>

<style lang="less" scoped>

</style>
<template>
    <div class="page-index bg-fff h100 over-auto pictureTest2">
        <div class="header-wrap">
            <van-nav-bar title="测试图片反馈" left-text="" right-text="" left-arrow fixed z-index="10" class="header"
                         @click-left="onClickLeft"></van-nav-bar>
        </div>
        <div class="content">
            <van-form @submit="onSubmit">
                <van-field v-model="form.message" rows="2" label="留言" type="textarea" autosize
                           placeholder="请填写测试反馈，例如:图片正常显示！" maxlength="500" show-word-limit/>
                <van-field name="uploader" label="好评截图" class="uploadWrap">
                    <template #input>
                        <van-uploader v-model="fileList" :max-count="1"/>
                    </template>
                </van-field>
                <div class="btn-group">
                    <van-button block round color="linear-gradient(to right, #4bb0ff, #6149f6)" native-type="submit">
                        提交
                    </van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'pictureTest2',
        data() {
            return {
                form: {
                    message: "",
                    mark: "test2"
                },
                fileList: [],	//要上传的图片列表,(还未提交到后台)
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            onSubmit() {
                //console.log('submit', values);
                if (this.form.message == "") {
                    this.$toast("请输入反馈内容")
                } else if (this.fileList.length == 0) {
                    this.$toast("请上传好评截图")
                } else {
                    this.form.file = this.fileList.slice(0, 1).file
                    this.API.uploadTestPicture().then((data) => {
                        if (data.ErrorCode == 100) {
                            this.$toast({
                                duration: 800, // 持续展示 toast
                                forbidClick: true,
                                type: "success",
                                message: '提交成功，感谢您的反馈！',
                                onClose: () => {
                                    this.$router.back()
                                }
                            });
                        } else {
                            this.$toast({
                                type: "fail",
                                message: "提交失败，请重新提交！"
                            });
                        }

                    })
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    .page-index {
        .header {
            background: #EE580F;
            font-size: 17px;

            /deep/ .van-icon,
            /deep/ .van-nav-bar__title {
                color: #fff;
            }
        }

        .content {
            margin-top: 46px;
            padding: 0 10px;

            .uploadWrap {
                /deep/ .van-uploader__preview {
                    border: 1px solid #eee;
                }
            }

            .btn-group {
                margin-top: 50px;
            }
        }
    }
</style>

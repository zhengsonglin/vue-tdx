<template>
    <div class="page-index bg-fff h100 over-auto addFeedBack">
        <div class="header-wrap">
            <van-nav-bar :title="title" left-text="" right-text="" left-arrow fixed z-index="10" class="header"
                         @click-left="onClickLeft"/>
        </div>
        <div class="content">
            <div class="form-group">
                <div class="cell-row">
                    <div class="title">标题:</div>
                    <div class="cell-input">
                        <input type="text" class="title-input w100" v-model.trim="form.title" placeholder="请输入反馈标题"
                               :readonly="isDetail"/>
                    </div>
                </div>

                <div class="cell-row">
                    <div class="title">内容:</div>
                    <div class="cell-input">
                        <textarea v-model.trim="form.content" rows="5" class="content-input w100" placeholder="请输入反馈内容"
                                  :readonly="isDetail"></textarea>
                    </div>
                </div>

                <div class="cell-row" v-if="isDetail">
                    <div class="title">提交时间:</div>
                    <div class="cell-input">
                        <input type="text" class="title-input w100" :value="form.FTime" readonly/>
                    </div>
                </div>
            </div>

            <div class="btn-group" v-if="!isDetail">
                <van-button block round color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="submit">提交
                </van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import utils from "@/utils/utils"

    export default {
        name: 'addFeedBack',
        data() {
            return {
                form: {},
                title: "添加意见",
                FID: "",
                isDetail: false,
            }
        },

        created() {
            let {FID} = this.$route.query;
            this.FID = FID;
            this.isDetail = utils.isNotEmpty(FID);
            if (utils.isNotEmpty(FID)) {
                this.title = ""
                this.getFeedBackDetail()
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back();
            },
            //查询单条反馈详情
            getFeedBackDetail() {
                this.API.getFeedBackDetail({FID: this.FID}).then((data) => {
                    this.title = data.FName
                    this.form = {
                        title: data.FViewsTitle,
                        content: data.FViewsContent,
                        FTime: this.moment(data.FTime).format("YYYY-MM-DD hh:mm:ss")		//
                    }
                })
            },
            submit() {
                let {title, content} = this.form;
                if (utils.isNotEmptyAll(title, content)) {
                    this.API.addFeedBack({title, content}).then((data) => {
                        if (data.ErrorCode == 100) {
                            this.$toast({
                                duration: 600, // 持续展示 toast
                                forbidClick: true,
                                type: "success",
                                message: '提交成功',
                                onClose: () => {
                                    this.$router.back()
                                }
                            });
                        } else if (data.ErrorCode == 101) {
                            this.$toast({
                                //forbidClick: true,
                                type: "fail",
                                message: data.Content
                            });
                        } else {
                            this.$router.push("login")
                        }

                    })
                } else {
                    this.$toast("标题与内容不能为空！")
                }
            }
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
            margin-top: 46px; /*no*/
            padding: 20px 0;

            .form-group {
                padding: 0 20px;

                .cell-row {
                    display: flex;
                    margin: 30px 0 0;

                    .title {
                        width: 50px;
                        flex-basis: 50px;
                        font-size: 18px;
                        line-height: 38px;
                    }

                    .cell-input {
                        flex: 1;

                        input, textarea {
                            box-sizing: border-box;
                            border-radius: 6px;
                            text-indent: 8px;
                            border: 1px solid #ddd;
                            outline: none;
                            font-size: 16px;

                            &.title-input {
                                height: 40px;
                                line-height: 40px;
                            }

                            &.content-input {
                                padding: 5px 10px;
                                text-indent: 0;
                            }
                        }
                    }
                }
            }

            .btn-group {
                margin: 90px 15px 0;
            }
        }
    }
</style>

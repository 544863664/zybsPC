<template>
  <div class="Qyhall">
    <!-- 企业 -->
    <div class="body-wrap-4">
      <div class="wrap-4-title"></div>
      <div class="wrap-4-wrap">
        <el-tabs v-model="enterActiveName">
          <el-tab-pane label="热门企业" name="first">
            <div class="wrap-list" v-for="(item, index) in 5" :key="index">
              <div class="enter-title">
                <div class="enter-logo" @click="enterDetailfn(index)">
                  <img src="../../assets/images/common/enter.png" alt />
                </div>
                <div class="enter-name">
                  <div class="enter-name-star">
                    <img src="../../assets/images/common/star-off.png" alt />
                    <!-- <img src="../../assets/images/common/star-on.png" alt=""> -->
                  </div>
                  <div class="enter-name-list enter-name-list-title">中研博硕英才网{{index}}</div>
                  <div class="enter-name-list">上市公司</div>
                  <div class="enter-name-list">
                    今日招聘岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                  <div class="enter-name-list">
                    剩余岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                </div>
              </div>
              <div class="enter-detail">
                <div class="enter-data">
                  <div class="enter-data-list">在招岗位：</div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <div>10k-20k</div>
                    <!-- <div>面议</div> -->
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                </div>
                <div class="enter-jobs" @click="im('')">
                  <img src="../../assets/images/common/shipin-grey.png" alt />
                  <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                  <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                  立即沟通
                </div>
              </div>
            </div>
            <div style="width: 75rem;">
              <div class="wrap-seeall">
                查看更多
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="北京团" name="second">
            <div class="wrap-list" v-for="(item, index) in 5" :key="index">
              <div class="enter-title">
                <div class="enter-logo">
                  <img src="../../assets/images/common/enter.png" alt />
                </div>
                <div class="enter-name">
                  <div class="enter-name-star">
                    <img src="../../assets/images/common/star-off.png" alt />
                    <!-- <img src="../../assets/images/common/star-on.png" alt=""> -->
                  </div>
                  <div class="enter-name-list enter-name-list-title">中研博硕英才网{{index}}</div>
                  <div class="enter-name-list">上市公司</div>
                  <div class="enter-name-list">
                    今日招聘岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                  <div class="enter-name-list">
                    剩余岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                </div>
              </div>
              <div class="enter-detail">
                <div class="enter-data">
                  <div class="enter-data-list">在招岗位：</div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <div>10k-20k</div>
                    <!-- <div>面议</div> -->
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                </div>
                <div class="enter-jobs">
                  <img src="../../assets/images/common/shipin-grey.png" alt />
                  <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                  <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                  立即沟通
                </div>
              </div>
            </div>
            <div style="width: 75rem;">
              <div class="wrap-seeall">
                查看更多
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="天津团" name="third">
            <div class="wrap-list" v-for="(item,index) in 5" :key="index">
              <div class="enter-title">
                <div class="enter-logo">
                  <img src="../../assets/images/common/enter.png" alt />
                </div>
                <div class="enter-name">
                  <div class="enter-name-star">
                    <img src="../../assets/images/common/star-off.png" alt />
                    <!-- <img src="../../assets/images/common/star-on.png" alt=""> -->
                  </div>
                  <div class="enter-name-list enter-name-list-title">中研博硕英才网{{index}}</div>
                  <div class="enter-name-list">上市公司</div>
                  <div class="enter-name-list">
                    今日招聘岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                  <div class="enter-name-list">
                    剩余岗位:
                    <span style="color: rgba(255, 8, 0, 0.5);">184</span>个
                  </div>
                </div>
              </div>
              <div class="enter-detail">
                <div class="enter-data">
                  <div class="enter-data-list">在招岗位：</div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <div>10k-20k</div>
                    <!-- <div>面议</div> -->
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                  <div class="enter-data-list">
                    <div>区域市场经理</div>
                    <!-- <div>10k-20k</div> -->
                    <div>面议</div>
                  </div>
                </div>
                <div class="enter-jobs">
                  <img src="../../assets/images/common/shipin-grey.png" alt />
                  <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                  <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                  立即沟通
                </div>
              </div>
            </div>
            <div style="width: 75rem;">
              <div class="wrap-seeall">
                查看更多
                <i class="el-icon-caret-bottom"></i>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-dialog
        :visible.sync="positionDialogVisible"
        width="740px"
        :lock-scroll="true"
        :show-close="false"
        :modal="false"
      >
        <div class="dialog__body-wrap">
          <div class="dialog__body-wrap">招聘职位信息</div>
          <div class="dialog__body-wrap-list" v-for="(item, index) in 4" :key="index">
            <div class="dialog-list-left">
              <div class="list-left-title">2020届毕业生综合大型网络视频招聘会</div>
              <div>举办时间：2020-01-31 18:30至24:30</div>
              <div>办会规模：100家企业</div>
            </div>
            <div class="dialog-list-right">
              <div class="btn">
                <img src="../../assets/images/common/shipin-grey.png" alt />
                <!-- <img src="../../assets/images/common/shipin-green.png" alt=""> -->
                <!-- <img src="../../assets/images/common/shipin-red.png" alt=""> -->
                进入会场
              </div>
            </div>
          </div>
        </div>
        <span slot="title" class="dialog-header">
          <div class="dialog-header-wrap">
            <div class="dialog-header-top">
              <div class="header-top-left">
                <img src="../../assets/images/common/enter.png" alt />
              </div>
              <div class="header-top-right">
                <div class="header-top-right-title">中研博硕英才网有限责任公司</div>
                <div>
                  企业性质
                  <span>|</span>50-100
                  <span>|</span>行业性质
                </div>
                <div>地址地址地址地址地址地址地址地址地址地址地地址地址地址地址地址地址地址地址地址</div>
              </div>
            </div>
            <div class="dialog-header-down">
              <div class="header-down-title">企业单位简介：</div>
              <div
                class="header-down-text"
              >企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介企业单位简介</div>
            </div>
          </div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Qyhall",
  components: {},
  data() {
    return {
      enterActiveName: "first",
      positionDialogVisible: false,
      hxid: ""
    };
  },
  computed: {
    ...mapGetters({
      token: "getToken"
    }),
    ...mapState({
      Jobseekers: state => state.Jobseekers,
      HR: state => state.HR,
      userId: state => state.userId
    })
  },
  methods: {
    im(tUserId) {
      let fUserId = this.userId;
      let fUserRole = this.HR ? "HR" : "QZ";
      let fUserToken = this.token;

      let url = "https://bst.91boshuo.com/im/index.html?";

      url = url + "fUserId=" + fUserId;
      url = url + "&tUserId=" + tUserId;
      url = url + "&fUserRole=" + fUserRole;
      url = url + "&fUserToken=" + fUserToken;

      window.open(url);
    },
    enterDetailfn(item) {
      var that = this;
      that.positionDialogVisible = true;
      console.log(item);
    },
    getHotcenter(id) {
      var that = this;
      that.axios
        .get("/api/qz/bskhgl/list", {
          params: {
            hxid: id
          }
        })
        .then(function(response) {
          console.log("getHotcenter:", response);
          // if (response && response.data && response.data.code == 0) {
          // 	var data = response.data.page.list;
          // 	that.OnlineVenue = data;
          // }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getZtlist(id) {
      var that = this;
      that.axios
        .get("/api/qz/bsdwbmxx/ztListByHx", {
          params: {
            hxid: id
          },
          headers: {
            "content-type": "application/json"
            // 'token':token
          }
        })
        .then(function(response) {
          console.log("getZtlist:", response);
          // if (response && response.data && response.data.code == 0) {
          // 	var data = response.data.page.list;
          // 	that.OnlineVenue = data;
          // }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    var that = this;
    console.log(that.$route);
    that.hxid = that.$route.query.hxid;
    that.getHotcenter(that.hxid);
    that.getZtlist(that.hxid);
  }
};
</script>

<style scoped>
.body-wrap-4 .wrap-4-wrap .el-tab-pane {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-pack: distribute;
}
.body-wrap-4 .wrap-4-wrap {
  margin: 0 0 2.5rem;
}
.body-wrap-4 .wrap-4-wrap .wrap-list {
  width: 21.75rem;
  padding: 0.9375rem;
  margin-right: 1.875rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
  font-size: 0.9375rem;
  border: 1px solid #ff5656;
  background-color: #ffffff;
  background: url(../../assets/images/common/bg2.png) 50% 100% no-repeat;
}
.wrap-4-wrap .wrap-list .enter-title {
  color: rgb(58, 58, 58);
  display: flex;
}
.wrap-4-wrap .wrap-list .enter-logo {
  width: 90px;
  height: 90px;
  margin-bottom: 0.3125rem;
  border-radius: 10px;
  overflow: hidden;
}
.wrap-list .enter-logo > img {
  width: 100%;
  height: 100%;
}
.wrap-4-wrap .wrap-list .enter-name {
  width: 230px;
  margin-left: 1.25rem;
  position: relative;
  color: rgb(144, 144, 144);
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-star > img {
  width: 1.875rem;
  height: 1.875rem;
  position: absolute;
  right: 0;
  top: 0;
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-list {
  margin-bottom: 0.3125rem;
  font-size: 0.8125rem;
}
.wrap-4-wrap .wrap-list .enter-name .enter-name-list-title {
  font-size: 1.0625rem;
  color: #848484;
  font-weight: 600;
}
.wrap-4-wrap .wrap-list .enter-detail {
  color: rgb(144, 144, 144);
  height: 216px;
  position: relative;
}
.wrap-4-wrap .wrap-list .enter-data {
  padding: 0.3125rem;
  padding-bottom: 0.5rem;
}
.wrap-4-wrap .wrap-list .enter-data .enter-data-list {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 0.3125rem;
}
.wrap-4-wrap .wrap-list .enter-jobs {
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  width: 18.75rem;
  line-height: 3;
  margin: 0 auto;
  text-align: center;
  font-size: 1.0625rem;
  font-weight: bold;
  color: rgb(144, 147, 153);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  cursor: pointer;
}
.wrap-4-wrap .wrap-list .enter-jobs2 {
  color: rgb(40, 202, 66);
}
.wrap-4-wrap .wrap-list .enter-jobs3 {
  color: rgb(255, 83, 83);
}
.wrap-4-wrap .wrap-list .enter-jobs img {
  width: 1.5625rem;
  height: 1.3125rem;
  margin: 0;
}
.body-wrap-4 .wrap-4-wrap .wrap-list:nth-child(3n) {
  margin-right: 0;
}
.body-wrap-4 .wrap-4-wrap .wrap-seeall {
  width: 22.5rem;
  height: 1.5625rem;
  margin: 0.625rem auto 0;
  text-align: center;
  font-size: 0.9375rem;
  color: rgba(255, 8, 0, 0.5);
  line-height: 1.5625rem;
  border: 0.0625rem solid rgba(255, 8, 0, 0.5);
  cursor: pointer;
}
.body-wrap-4 .dialog-header-wrap {
  margin: 0.9375rem 0.9375rem 0;
  color: #8e8e8e;
}
.body-wrap-4 .dialog-header-wrap .dialog-header-top {
  display: flex;
  margin-bottom: 0.3125rem;
}
.body-wrap-4 .dialog-header-top .header-top-left img {
  width: 6.875rem;
  height: 6.875rem;
  margin-right: 1.25rem;
}
.body-wrap-4 .dialog-header-top .header-top-right div {
  margin-bottom: 0.1875rem;
}
.body-wrap-4 .dialog-header-top .header-top-right div span {
  margin: 0 0.1875rem;
  vertical-align: text-bottom;
}
.body-wrap-4 .dialog-header-top .header-top-right .header-top-right-title {
  font-size: 1.3125rem;
  color: #363636;
  font-weight: 600;
  margin-bottom: 0.8125rem;
}
.body-wrap-4 .dialog-header-wrap .dialog-header-down .header-down-text {
  margin-top: 0.125rem;
  text-indent: 2rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap {
  margin: 0 0.9375rem;
  padding-bottom: 0.125rem;
  display: inline-block;
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(255, 83, 83);
  border-bottom: 0.1875rem solid rgb(255, 83, 83);
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap-list {
  background-color: #ffffff;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #8e8e8e;
  margin: 0.9375rem 0.9375rem 0;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.0625rem solid rgb(255, 83, 83);
  overflow: hidden;
}
.body-wrap-4 .dialog__body-wrap .dialog__body-wrap-list:last-child {
  margin-bottom: 0;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-left div {
  margin-bottom: 0.125rem;
  width: 33.125rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-left .list-left-title {
  font-size: 1rem;
  color: #363636;
  font-weight: 600;
  margin-bottom: 0.3125rem;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn {
  width: 8.125rem;
  text-align: center;
  border: 1px solid rgb(255, 83, 83);
  color: rgb(255, 83, 83);
  margin-top: 15%;
  line-height: 1.6;
  color: rgb(144, 147, 153);
  cursor: pointer;
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn2 {
  color: rgb(40, 202, 66);
}
.body-wrap-4 .dialog__body-wrap-list .dialog-list-right .btn3 {
  color: rgb(255, 83, 83);
}
</style>

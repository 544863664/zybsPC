<template>
  <div class="Advertising">
    <!-- <div style="width: 500px;height: 380px;margin: 0px auto;">
			<iframe
				width="500px"
				height="380px"
				src="https://bsycbst.oss-cn-hangzhou.aliyuncs.com/qz/123/test.mp4"
				frameborder="0"
				allowfullscreen
			></iframe>
    </div>-->
    <div class="advertising advertising1" name="495x212">
      <el-carousel height="212px" arrow="never" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="(item, index) in bannerArr1" :key="index">
          <router-link :to="item.url" target="_blank">
            <div class="banner">
              <img :src="item.img" alt />
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="advertising advertising2" name="331x285">
      <el-carousel height="285px" arrow="never" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="(item, index) in bannerArr2" :key="index">
          <router-link :to="item.url">
            <div class="banner">
              <!-- <a href="https://bst.91boshuo.com/zppc/public/jobretrieve"> -->
                 <img :src="item.img" alt ></img>               
              <!-- </a> -->
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="advertising advertising3" name="495x212">
      <el-carousel height="212px" arrow="never" :interval="5000" indicator-position="none">
        <el-carousel-item v-for="(item, index) in bannerArr3" :key="index">
          <router-link :to="item.url" >
            <div class="banner">
              <img :src="item.img" alt/>
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="advertising advertising4" name="331x141">
      <el-carousel
        height="141px"
        arrow="never"
        direction="vertical"
        :interval="5000"
        indicator-position="none"
      >
        <el-carousel-item v-for="(item, index) in bannerArr4" :key="index">
          <router-link :to="item.url">
            <div class="banner">
              <img :src="item.img" alt  />
            </div>
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import adv_1_495x212 from "../../assets/images/advertising/0001-495x212.jpg"; //
import adv_2_495x212 from "../../assets/images/advertising/0002-495x212.jpg"; //
import adv_3_495x212 from "../../assets/images/advertising/0003-495x212.jpg"; //
import adv_4_495x212 from "../../assets/images/advertising/0004-495x212.jpg"; //
// import adv_5_495x212 from "../../assets/images/advertising/0005-495x212.jpg";

import adv_1_331x285 from "../../assets/images/advertising/0001-331x285.jpg";
// import adv_2_331x285 from "../../assets/images/advertising/0002-331x285.jpg";

import adv_1_331x141 from "../../assets/images/advertising/0001-331x141.jpg";
// import adv_2_331x141 from "../../assets/images/advertising/0002-331x141.jpg";

export default {
  name: "Advertising",
  components: {},
  data() {
    return {
		
    //   bannerArr1: [adv_1_495x212, adv_3_495x212],
    //   bannerArr2: [adv_1_331x285],
    //   bannerArr3: [adv_2_495x212, adv_4_495x212],
	//   bannerArr4: [adv_1_331x141]
	   bannerArr1:[{img:adv_1_495x212, url:"/public/enterDetail?dwid=439086346892476416"}, {img:adv_3_495x212,url:"/public/enterDetail?dwid=438313087511035904"}],
      bannerArr2: [{img:adv_1_331x285,url:"/public/enterDetail?dwid=439772575891980288"}],
      bannerArr3: [{img:adv_2_495x212,url:"/public/enterDetail?dwid=439190015939969024"}, {img:adv_4_495x212,url:"/public/enterDetail?dwid=439441617359732736"}],
      bannerArr4: [{img:adv_1_331x141,url:"/public/enterDetail?dwid=438782418271338496"}]
    };
  },
  methods: {
	
  }
};
</script>

<style scoped>
.Advertising {
  position: relative;
  width: 830px;
  height: 429px;
}

.Advertising .advertising {
  position: absolute;
  background-color: #f7f7f7;
  overflow: hidden;
}

.advertising1 {
  top: 0.0625rem;
  left: 0;
  width: 495px;
  height: 212px;
}

.advertising2 {
  top: 0.0625rem;
  right: 0;
  width: 331px;
  height: 285px;
}

.advertising3 {
  left: 0;
  bottom: 0;
  width: 495px;
  height: 212px;
}

.advertising4 {
  right: 0;
  bottom: 0;
  width: 331px;
  height: 141px;
}
</style>

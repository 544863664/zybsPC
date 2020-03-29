<template>
    <div>
        <iframe :src="url" frameborder="0" width="100%" id="myframe" onload=""></iframe>
    </div>
</template>

<script>
export default {
    props: {

    },
    components: {

    },
    data() {
        return {
            url:this.$route.query.url
            // url:'https://rtc.com/layim.html?&fUserToken=eyJhbGciOiJIUzUxMiJ9.eyJyb2xlSWQiOiJIUjAwMDEiLCJleHAiOjE1ODUxNTM1ODIsImlhdCI6MTU4NTExMDM4MiwianRpIjoiNDM5MDQ5OTk2NDg3MjMzNTM2In0.8TXjPYQqYtdFMkDFlcmhdIwcdSbIkSSuf6nNRwb9mP0CJFaM4ZdqI1nIrfWV6yLFaQswoq4vJVOAGmsgX5zmsQ&roleId=HR0001'
        };
    },
    computed: {

    },
    watch: {

    },
    methods: {
        setIframeHeight(iframe, h) {
            if (iframe) {
                var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
                if (iframeWin.document.body) {
                    iframe.height = h;
                }
            }
        },

        getchildren() {
            console.log(22)
        }
    },
    created() {
        
    },
    mounted() {
        let h = document.documentElement.clientHeight   
        this.setIframeHeight(document.getElementById('myframe'), h);
    },
};
</script>

<style scoped lang="less">

</style>

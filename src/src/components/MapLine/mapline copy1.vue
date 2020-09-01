<template>
  
</template>

<script>
// import "../../../node_modules/echarts/map/js/china.js";

export default {
  
};
</script>

<style lang="scss">
#zhongJiYouYu {
  background: #c3c3c380;
  padding: 5px 20px 30px 20px;
}
.count-block-wrapper {
  width: 49.4%;
  float: left;
  padding: 0 0.3%;
  .count-block {
    height: 625px;
    display: block;
    margin-top: 28px;
    background-color: #efefef;
    border: 1px solid #c03532;
    header {
      margin-top: -11px;
      text-align: center;
      .block-title {
        position: relative;
        display: inline-block;
        padding: 4px 11px;
        height: auto;
        font-size: 14px;
        line-height: 1.25;
        color: #fff;
        background-color: #c03532;
        border-radius: 12px;
        i {
          position: absolute;
          top: 0;
          display: block;
          border: 18px solid transparent;
        }
      }
    }
  }
}
* {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "Noto Sans CJK SC", "WenQuanYi Micro Hei", Arial,
    sans-serif;
  padding: 0;
  margin: 0;
}
.data-wapper {
  position: relative;
}
.label-group-wrapper {
  .group-5 {
    top: 29px;
    height: 169px;
    border: 2px solid #33a1ff;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -44px;
        background-color: #33a1ff;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #33a1ff;
        width: 23px;
      }
      .line-1 {
        top: 20%;
      }
      .line-2 {
        top: 40%;
      }
      .line-3 {
        top: 60%;
      }
      .line-4 {
        top: 80%;
      }
    }
  }
  .group-name {
    position: absolute;
    top: 50%;
    right: 10px;
    margin-top: -44px;
    padding: 4px 2px;
    width: 20px;
    color: #fff;
    font-size: 16px;
    line-height: 1;
  }
  .label-group-container {
    position: absolute;
    left: 40px;
  }
  .group-6 {
    top: 232px;
    height: 103px;
    border: 2px solid #c03532;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -52px;
        background-color: #c03532;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #c03532;
        width: 23px;
      }
      .line-1 {
        top: 33.3%;
      }
      .line-2 {
        top: 66.6%;
      }
    }
  }
  .group-7 {
    top: 367px;
    height: 136px;
    border: 2px solid #fd9162;
    border-right: none;
    .label-group {
      position: relative;
      width: 10px;
      height: 100%;
      .group-name {
        margin-top: -52px;
        background-color: #fd9162;
      }
      i {
        position: absolute;
        left: 0;
        display: block;
        height: 1px;
        border-top: 1px dashed transparent;
        border-top-color: #fd9162;
        width: 23px;
      }
      .line-1 {
        top: 25%;
      }
      .line-2 {
        top: 50%;
      }
      .line-3 {
        top: 75%;
      }
    }
  }
}
.count-summary {
  margin: 0 auto;
  text-align: center;
  position: relative;
  padding: 1px;
  div {
    padding: 15px 15px 6px;
    display: block;
    font-size: 14px;
    line-height: 1.2;
    border-radius: 4px;
    ul {
      margin: 0;
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
      .num-cell {
        background-color: #ee7741;
        color: #fff;
        border-radius: 2px;
        display: inline-block;
        margin: 0 2px;
        padding: 0 5px;
        font-size: 18px;
        line-height: 1.2;
        font-weight: 700;
      }
      .sp-cell {
        color: #ee7741;
        display: inline-block;
        margin: 0 2px;
        padding: 0 5px;
        font-size: 20px;
        line-height: 1.2;
        font-weight: 700;
      }
    }
    .count-summary-label {
      display: inline-block;
      white-space: nowrap;
      vertical-align: middle;
    }
  }
}
.mapName {
  padding-top: 10px;
  color: #c03532;
  font-weight: bold;
  font-size: 15px;
}

.bottom10 {
  border-bottom: 10px solid #f5f8fa;
}

</style>
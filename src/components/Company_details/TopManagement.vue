<template>
  <div slot="TopManagement" id="TopManagement">
    <div class="companyContent">
      <section class="block box-shadow" id="recruitmentInformation">
        <header class="block-header">
          <div class="block-title">
            <i class="icon icon-tips"></i>
            <span>高管团队列表</span>
          </div>
        </header>
        <div class="leader-list clearfix">
          <div class="leader-detail-item" v-for="(item,index) in licenceTable" :key="index">
            <section class>
              <header>
                <table class="leader-info">
                  <tbody>
                    <tr>
                      <td class="td-data">
                        <div>
                          <span class="leader-name">李新宏</span>
                          <span class="leader-gender">男</span>
                        </div>
                      </td>
                      <td class="td-label">
                        <div>职称:</div>
                      </td>
                      <td class="td-data">--</td>
                      <td class="td-label">
                        <div>任职日期:</div>
                      </td>
                      <td class="td-data">2016-02-19</td>
                    </tr>
                    <tr>
                      <td class="td-label"></td>
                      <td class="td-label">
                        <div>学历:</div>
                      </td>
                      <td class="td-data">硕士</td>
                      <td class="td-label">
                        <div>出生年月:</div>
                      </td>
                      <td class="td-data">1965-08</td>
                    </tr>
                  </tbody>
                </table>
              </header>
              <div class="leader-name-wrapper">
                <i></i>
                <div class="leader-pos">
                  <ul>
                    <li>
                      <span class="posName">董事长</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="content-wrapper" style="height: 200px;">
                <p
                  class="leader-info-content"
                >李新宏先生：1965年8月出生，中国国籍，无境外永久居留权，硕士学历。1985年7月至1987年9月，在南昌航空学院任教；1987年9月至1990年3月，在西北工业大学攻读硕士学位；1990年3月至1995年7月，在常州工学院任教；1995年7月至2000年11月，在常工院科技实业总公司计算机分公司任总经理；2000年11月至2004年5月，在常工电子任执行经理；2004年5月至2016年3月，在常工电子任执行董事兼总经理；2016年3月至今，在常电股份任董事长。</p>
              </div>
            </section>
          </div>
        </div>
        <div class="clearfix"></div>
      </section>
    </div>
   
     
  </div>
</template>  
  
<script>
export default {
  data() {
    return {
      
      input: "",
      time: "",
      licenceTable: [{}, {}, {}, {}, {}]
    };
  }
};
</script>  

<style lang="scss">
@import "../../styles/css/CompanyDetails/CompanyDetails.scss";
#TopManagement {
  .clearfix {
    clear: both;
  }
  .leader-detail-item {
    color: #666;
    font-size: 14px;
    margin: 0;
    float: left;
    padding: 5px;
    width: 49%;

    section {
      .leader-list {
        margin: 0 -5px;
        clear: both;
      }
      border: 1px solid #e9edef;
      header {
        display: block;
        margin: 0;
        padding: 10px;
        background: #f6f9fa;
        border-bottom: 1px solid #e9edef;
        overflow: hidden;
        .leader-info {
          width: 100%;
          border-collapse: collapse;
        }
      }
      .leader-name-wrapper {
        padding: 0;
        margin: 0;
        border-bottom: 1px solid #e9edef;
        position: relative;
        .leader-pos {
          height: 36px;
          line-height: 1.2;
          overflow: hidden;
          color: #333;
          position: relative;
          vertical-align: middle;
          ul {
            display: inline-block;
            white-space: nowrap;
            position: absolute;
            left: 0;
            padding: 0 10px;
            margin: 0;
            li {
              display: inline-block;
              padding: 10px 0;
              .posName {
                margin: 0 10px;
              }
            }
          }
        }
      }
      .content-wrapper {
        padding: 0;
        margin: 0;
        position: relative;
        min-height: 200px;
        overflow: auto;
        height: 200px;
        .leader-info-content {
          margin: 0;
          padding: 15px;
          text-align: justify;
        }
      }
    }
  }
}
</style>
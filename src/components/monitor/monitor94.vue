<template>
  <div id="monitors" slot="MapLine" class="monitoring_center">
    <div class="svg-container">
      <div style="padding-top: 48px;">
        <p class="hotCyl">
          <img src="../../assets/images/p10.png" class="monitImg" alt /> <span>航天器制造</span>
        </p>

        <p class="hotCyl">
          <img src="../../assets/images/p11.png" class="monitImg" alt /><span>航空器制作</span>
        </p>
        <p class="hotCyl">
          <img src="../../assets/images/p12.png" class="monitImg" alt /><span>高铁装备技术</span>
        </p>

        <p class="hotCyl">
          <img src="../../assets/images/p13.png" class="monitImg" alt /><span>数控机床</span>
        </p>
      </div>
      <div style="padding: 24px 0 56px;">
        <p class="hotCyl">
          <img src="../../assets/images/p14.png" class="monitImg" alt /> <span>核电装备制造</span>
        </p>

        <p class="hotCyl">
          <img src="../../assets/images/p15.png" class="monitImg" alt /><span>海洋装备制造</span>
        </p>
      
        <p class="hotCyl">
          <img src="../../assets/images/p16.png" class="monitImg" alt /><span>现代船舶制造</span>
        </p>
        <p class="hotCyl">
          <img src="../../assets/images/p17.png" class="monitImg" alt /><span>特高压输电电装置</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  beforeDestroy() {},

  methods: {}
};
</script>

<style lang="scss">
#monitors{
    .hotCyl{
        width: 160px;
    }
}

</style>
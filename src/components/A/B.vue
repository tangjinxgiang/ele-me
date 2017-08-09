<template>
  <ul>
      <E :agee="ageb"></E>
  </ul>
</template>
<script type="text/ecmascript-6">
  import E from './E'
  export default {
    props: [ 'ageb' ],
    components: {
      E
    }
  }
</script>
<style>

</style>

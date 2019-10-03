<template>
  <div class="loader-backdrop" :class="{'d-none':!active}">
    <img class="loader" src="../assets/logo.png"  />
  </div>
</template>
<script>
export default {
  name: 'Loader',
  props: ['active']
}
</script>
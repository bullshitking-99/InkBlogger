<script lang="ts" setup>
import user from "../../personal Tailor/user.json";

const curYear = new Date().getFullYear();
</script>

<template>
  <div class="footer">
    <p>{{ user.Title }}</p>
    <p>
      <i>{{ user.motto }}</i>
    </p>
    <br />
    <span v-if="curYear === Number(user.blogStartYear)">
      &copy; {{ curYear }} {{ user.name }}.&nbsp; Powered by
    </span>
    <span v-else>
      &copy; {{ user.blogStartYear }} - {{ curYear }} {{ user.name }}.&nbsp;
      Powered by
    </span>
    <a href="https://github.com/bullshitking-99/InkBlogger" target="_blank"
      >InkBlogger</a
    >.
  </div>
</template>

<style scoped lang="scss">
.footer {
  box-sizing: border-box;
  text-align: center;
  background-color: rgb(var(--footer-color));
  height: 200px;
  width: 100%;
  padding-top: 20px;
  line-height: 42px;
  p:first-child {
    font-size: 1.3em;
    font-weight: bold;
  }
  p:last-of-type {
    opacity: 0.5;
  }

  a {
    color: rgb(var(--link-color));
  }
}
</style>

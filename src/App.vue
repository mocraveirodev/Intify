<template>
  <div class="main">
    <app-header></app-header>
    <router-view name="navigation"></router-view>
    <transition name="slide" mode="out-in">
        <router-view ></router-view>
    </transition>
  </div>
</template>

<script>
  import Header from './components/Header.vue'

  export default {
    components: {
        appHeader: Header
    }
  }
</script>

<style lang="scss">
    body {
        background-color: #0D0D0D;
        font-family: 'Varela Round';
    }

    .main {
        width: 960px;
        margin: 0 auto;
    }

    .slide-leave-active {
        transition: opacity .2s ease;
        opacity: 0;
        animation: slide-out .2s ease-out forwards;
    }

    .slide-leave {
        opacity: 1;
        transform: translateX(0);
    }

    .slide-enter-active {
        animation: slide-in .2s ease-out forwards;
    }

    @keyframes slide-out {
        0% {
            transform: translateY(0);
        }
        100% {
            transform: translateY(-30px);
        }
    }

    @keyframes slide-in {
        0% {
            transform: translateY(-30px);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>

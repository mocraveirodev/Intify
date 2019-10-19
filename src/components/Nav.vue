<template>
  <div class="nav">
    <ul>
      <router-link to="/charts" tag="li" active-class="active" exact><a>Charts</a></router-link>
      <router-link to="/" tag="li" active-class="active" exact><a>Genres & Moods</a></router-link>
      <router-link to="/new-releases" tag="li" active-class="active" exact><a>New Releases</a></router-link>
    </ul>
  </div>

</template>

<script>
    export default {
    
    }
</script>

<style lang="scss" scoped>
  .nav {
    padding-bottom: 20px;
    
    ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: table;

      li {
        display: table-cell;
        padding: 6px 12px;

        &:first-child {
          padding-left: 0;
        }

        a {
          color: hsla(0,0%,100%,.25);
          text-decoration: none;
          display: inline-block;
          padding-bottom: 5px;
          position: relative;

          &:hover {
            color: #fff;
          }
        }

          &.active {

            a {
              color: #fff;
            }

            a:before {
              content: "";
              
              position: absolute;
              width: 50%;
              height: 1px;
              bottom: 0;
              left: 25%;
              border-bottom: 1px solid green;
            }
          }
      }
    }
  }

</style>

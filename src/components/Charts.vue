<template>
  <div class="charts-con">
    <div class="charts">
      <h1>Featured Charts:</h1>
      <ul>
        <router-link v-for="chart in charts" :to="`details/${chart.id}`" tag="li" active-class="active" exact>
          <div class="charts-wrapper">
            <div class="imgWrap"> 
                <img :src="chart.images[0].url" />    
            </div>
            <a>{{chart.name}}</a>
          </div>
        </router-link>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        charts : [],
      }
    },
    methods: {
      fetchCharts() {
        this.$http.get('https://api.spotify.com/v1/browse/categories/toplists/playlists?country=DK')
        .then(response => {
            return response.json()
        })
        .then(data => {
          const chart_items = data.playlists.items;

          for (let key in chart_items) {
            this.charts.push(chart_items[key]);
          }   
        });
      }
    },
    created() {
      this.fetchCharts();
    }
  }
</script>


<style lang="scss" scoped>
  .charts {
    h1 {
      color: #fff;
      margin-bottom: 0;
    }

    p {
      color: #fff;
      padding: 0;
      margin: 0;
    }

    .charts-wrapper {
      width: 200px;

      .imgWrap {
        width: 200px;
        height: 200px;
        margin-bottom: 5px;

        img {
            width: 100%;
            height: auto;
        }
      }

      a {
        color: #fff;
        text-decoration: none;
      }    
    }

    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;

      li {
          display: inline-block;
          padding: 40px 30px 40px 0px;
          vertical-align: top;

          &:last-child {
              clear: both;
          }
      }
    }    
  }
</style>

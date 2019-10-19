<template>
<div class="playlists-con">
  <div class="playlists">
      <h1 class="category">{{categoryName}}</h1>
      <p>Popular Playlists</p>
      <ul>
        <router-link v-for="playlist in playlists" :to="`details/${playlist.id}`" tag="li" active-class="active" exact>
            <div class="playlist-wrapper">
                <div class="imgWrap">
                    
                    <img :src="playlist.images[0].url" />    
                </div>
                <a>{{playlist.name}}</a>
                <span>{{playlist.description}}</span>
            </div>
        </router-link>
      </ul>
  </div>
  <div>
    <router-view></router-view>
  </div>
  
</div>

</template>

<script>
    import { eventBus } from '../main';

    export default {
        props: ['id'],
        data() {
            return {
                category: this.$route.params.id,
                playlists : [],
                categoryName: ''
            }
        },
        // watch: {
        //     '$route'(to, from) {
        //         this.id = to.params.id
        //     }
        // },
        methods: {
            fetchPlaylist() {
                this.$http.get('' + this.id + '/playlists')
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    console.log(' **DATA: ', data)
                    const playlist_items = data.playlists.items;
                    for (let key in playlist_items) {
                        this.playlists.push(playlist_items[key]);
                    }
                    
                    const category_name = this.$route.params.id;
                    this.categoryName = category_name;

                    eventBus.$emit('category-name', this.categoryName);   
                      
                })
            },
            goBack() {
                this.$router.go(-1)
            }
        },
        created() {
            this.fetchPlaylist();
        }
    }
</script>

<style lang="scss" scoped>

    .playlists-con {
        padding-top: 30px;

        h1 {
            color: #fff;
        }

        p {
            border-bottom: 1px solid hsla(0,0%,100%,.25);
            padding-bottom: 5px;
            color: #fff;
            margin: 0;            
        }

        .imgWrap {
            width: 200px;
            height: 200px;
            margin-bottom: 5px;

            img {
                width: 100%;
                height: auto;
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

        .playlist-wrapper {
            width: 200px;
            overflow: hidden;

            a {
                color: #fff;
                text-decoration: none;
            }
        }

        .category:first-letter {
            text-transform: capitalize;
        }        
    }
</style>

<template>
  <div class="playlist-details">
        <div class="playlist-top-section">
            <div class="playlist-image-wrap">
                <img :src="playListImage" alt="">
            </div>
            <div class="playlist-top-details">
                <div class="playlist-top-details-content">
                    <h3>Playlist</h3>
                    <h1>{{playlistName}}</h1>
                    <p>{{playListDescription}}</p>
                    <br />
                    <div class="playlist-link">
                        <a :href="playlistLink">PLAY</a>
                    </div>                    
                </div>
            </div>
               
        </div>
      <!-- <h1>Playlist Details for Playlist: <span class="playlist-name">{{playlistName}}</span></h1> -->
      <!-- <h1 @category-name="categoryName = $event">category: {{ categoryName }}</h1> -->
        <div class="playlist-details-table">
            <div class="table-row header">
                <div class="num">&nbsp;</div>
                <div class="text">Title</div>
                <div class="text">Artist</div>
            </div>
            <div class="table-row" v-for="(track, key) in tracks">
                <div class="num button">
                    <a v-if="track.track.preview_url" :href="track.track.preview_url" class="round-button"><i class="fa fa-play fa-2x"></i></a>
                </div>
                <div class="text">{{ track.track.name }}</div>
                <div class="text">
                    <div class="artists">
                        <span v-for="(artist, index) in track.track.artists">
                            <a :href="artist.external_urls.spotify" class="ext_link">{{artist.name}}</a><span v-if="index+1 < track.track.artists.length">, </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>


<script>
import { eventBus } from '../main';
export default {
    props: ['detailsId'],
    data() {
        return {
            id: this.$route.params.id,
            tracks : [],
            playlistName: '',
            playListImage: '',
            playListDescription: '',
            categoryName: '',
            playlistLink: ''
        }
    },
    watch: {
        '$route'(to, from) {
            this.path = from.params.path
        }
    },     
    beforeRouteEnter(to, from, next) {
        if (true) {
            next();
        } else {
            next(false);
        }
    },
    methods: {
        fetchPlaylistDetails() {
            this.$http.get('https://api.spotify.com/v1/users/spotify/playlists/' + this.detailsId)
            .then(response => {
                return response.json()
            })
            .then(data => {
                const playlist_tracks = data.tracks.items;
                for (let key in playlist_tracks) {
                    this.tracks.push(playlist_tracks[key])
                }
                this.playlistName = data.name;
                this.playListImage = data.images[0].url
                this.playListDescription = data.description

                this.playlistLink = data.uri
            })
        },
        goBack() {
            this.$router.go(-1)
        }
    },
    created() {
        this.fetchPlaylistDetails();

        eventBus.$on('category-name', category => {
            this.categoryName = category;
        })

    }
}
</script>

<style lang="scss" scoped>
    .playlist-details {
        padding-top: 30px;
        clear: both;

        h1 {
            color: #fff;
            margin-bottom: 2px;
        }

        .playlist-name {
            // font-style: italic;
        }

        .actionBtn {
            padding: 5px 10px;
            background-color: green;
            color: #fff;
        }

        .table-row {
            display: flex;
            display: -webkit-flex;
            flex-direction: row;
            -webkit-flex-direction: row;
            flex-grow: 0;
            -webkit-flex-grow: 0;
            flex-wrap: wrap;
            -webkit-flex-wrap: wrap;
            align-items: center;
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
            border-bottom: 1px solid hsla(0,0%,100%,.15);

            &:hover {
                background-color: hsla(0,0%,100%,.15);
            }

            .round-button {
                box-sizing: border-box;
                display:block;
                width:25px;
                height:25px;
                padding-top: 14px;
                padding-left: 8px;
                line-height: 20px;
                border: 1px solid #fff;
                border-radius: 50%;
                color:#f5f5f5;
                text-align:center;
                text-decoration:none;
                background-color: rgba(0,0,0,0.5);
                font-size:20px;
                font-weight:bold;
                transition: all 0.3s ease;
                position: relative;
            }
            .round-button:hover {
                background-color: rgba(0,0,0,0.8);
            }

            .fa-2x {
                font-size: 10px;
                position: absolute;
                left: 9px;
                top: 6px;
            }               
        }

        .text {
            flex-grow: 1;
            -webkit-flex-grow: 1;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            padding-right: 20px;
            color: #fff;
            width: 180px;
            &.preview {
                text-align: right
            }
        }        

        .num {
            width: 50px;
            color: #fff;
        }

        .text, .num {
            font-size: 14px;
        }

        .table-row {
            border-collapse: collapse;
            padding: 12px 5px;
        }

        .header {
            .text, .num {
                font-size: 12px;
                text-transform: uppercase;
            }
        }

        .ext_link {
            color: #fff;
            text-decoration: none;

            &:hover {
                border-bottom: 1px solid #fff;
            }
        }

        .playlist-top-section {
            padding-bottom: 25px;
            width: 100%;
            display: flex;

            &:after {
                clear: both;
                display: table;
                content: ''
            }            
        }
        .playlist-image-wrap {
            width: 300px;
            padding-right: 25px;

            img {
                width: 100%;
                height: auto;
            }


        }
        .playlist-top-details {
            position: relative;
            width: 100%;

            .playlist-top-details-content {
                position: absolute;
                bottom: 7%;
                h1 {
                    font-size: 42px;
                    margin-top: 5px;
                }

                h3 {
                    color: #fff;
                    margin-bottom: 0;
                    text-transform: uppercase;
                    font-size: 12px;
                    font-weight: 400;
                    letter-spacing: 2px;
                }

                p {
                    color: hsla(0,0%,100%,.25);
                    font-weight: 100;
                    font-size: 12px;
                    letter-spacing: 1px;                    
                }

                .playlist-link {

                    a {
                        padding: 12px 50px;
                        background-color: #00d95a;
                        color: #fff;
                        text-decoration: none;
                        border-radius: 20px;
                        font-size: 12px;
                        cursor: default;
                    }
                }               
            }
        }           
    }
</style>

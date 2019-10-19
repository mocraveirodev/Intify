<template>
  <div class="playlist-details">
        <div class="playlist-top-section">
            <div class="playlist-image-wrap">
                <img :src="releaseImage" alt="">
            </div>
            <div class="playlist-top-details">
                <div class="playlist-top-details-content">
                    <h3>{{releaseType}}</h3>
                    <h1>{{releaseName}}</h1>
                    <div class="artist">By 
                        <span v-for="(artist, index) in artistName">
                            <a :href="artist.external_urls.spotify" class="ext_link">{{artist.name}}</a><span v-if="index+1 < artistName.length">, </span>
                        </span>
                    </div>
                    <br />
                    <div class="playlist-link">
                        <a :href="playLink">PLAY</a>
                    </div> 										
                </div>
            </div>        
        </div>
        <div class="playlist-details-table">
            <div class="table-row header">
                <div class="num">#</div>
                <div class="text">Title</div>
                <div class="text">Artist</div>
            </div>
            <div class="table-row" v-for="(track, key) in newReleaseTracks">
                <div  @mouseover="showPlayBtn = true, showIndex = false " @mouseleave="showPlayBtn = false, showIndex = true" class="num button">
                        <a v-show="showPlayBtn" :href="track.uri" class="round-button"><i class="fa fa-play fa-2x"></i></a>
                        <!-- <some-component v-show="showPlayBtn"></some-component> -->
                        <span v-show="showIndex">{{ key + 1}}</span>
                </div>	
                <div class="text">{{ track.name }}</div>
                <div class="text">
                    <div class="artists">
                        <span v-for="(artist, index) in artistName">
                            <a :href="artist.external_urls.spotify" class="ext_link">{{artist.name}}</a><span v-if="index+1 < artistName.length">, </span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
    props: ['releaseId'],
        data() {
            return {
                id: this.$route.params.releaseId,
                newReleaseTracks : [],
                releaseType: '',
                releaseImage : '',
                releaseName: '',
                artistName: [],
                playLink: '',
                showPlayBtn: false,
                showIndex: true
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
            fetchNewReleaseDetails() {

                this.$http.get('https://api.spotify.com/v1/albums/' + this.id)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    const newrelease_tracks = data.tracks.items;
                    for (let key in newrelease_tracks) {
                        this.newReleaseTracks.push(newrelease_tracks[key])
                    }
                    
                    this.releaseImage = data.images[1].url;
                    this.releaseType = data.album_type;
                    this.releaseName = data.name;
                    this.playLink = data.uri;

                    const artists = data.artists;

                    for (let key in artists) {
                        this.artistName.push(artists[key])
                    }

                })               
            }
        },
        created() {
            this.fetchNewReleaseDetails();
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
            border-bottom: 1px solid hsla(0,0%,100%,.25);
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
        }        
        .text {
            width: 180px;
        }

        .num {
            width: 50px;
            color: #fff;
        }
        .table-row {
            border-collapse: collapse;
            padding: 12px 5px;
        }

        .header {
            .text {
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

								.artist {
									color: hsla(0,0%,100%,.25);
								}
            }
        }           
    }
</style>

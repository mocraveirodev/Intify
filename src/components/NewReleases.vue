<template>
  <div>
    <div class="releases">
			<h1>New Albums and Singles</h1>
			<ul>
				<li v-for="release in newReleases">
					<router-link :to="`new-releases/${release.id}`" tag="a" active-class="active" exact>
						<div class="releases-wrapper">
							<div class="imgWrap">
								<img :src="release.images[0].url" />    
							</div>
							<div class="release-info">
								<a :href="release.uri" class="info release">{{release.name}}</a>
								<a :href="release.artists[0].uri" class="info artist">{{release.artists[0].name}}</a>	
							</div>

						</div>
					</router-link>
				</li>

			</ul>
    </div>
		<router-view></router-view>
  </div>
</template>

<script>
	export default {
		data() {
			return {
				newReleases: []
			}
		},
		methods: {
			fetchNewReleases() {
				this.$http.get('https://api.spotify.com/v1/browse/new-releases?offset=0&limit=50')
				.then(response => {
					return response.json()
				})
				.then(data => {
					const new_releases = data.albums.items;
					console.log('rel: ', new_releases)

					for (let key in new_releases) {
						this.newReleases.push(new_releases[key]);
					}       
				});
			}
		},
		created() {
			this.fetchNewReleases();
		}
	}
</script>

<style lang="scss" scoped>
	.releases {

		h1 {
				color: #fff;
				margin-bottom: 0;
		}

		p {
				color: #fff;
				padding: 0;
				margin: 0;
		}

		.releases-wrapper {
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
				-webkit-appearance: none;
				&:hover {
					text-decoration: underline !important;
					color: #fff;
				}
			}

			.release-info {
				a {
					display: block;
					text-decoration: none;	
				}

				.artist {
					color: hsla(0,0%,100%,.25);
					text-decoration: none;
				}
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

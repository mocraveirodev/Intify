<template>
	
	<div class="nav">
		<ul>
			<router-link v-for="link in links" :to="`categories/${link.id}/playlists`" tag="li" active-class="active" exact>
				<div class="playlist-wrapper">
					<div class="imgWrap">
						<img :src="link.icons[0].url" />    
					</div>
					<a>{{link.name}}</a>
				</div>
			</router-link>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				links: []
			}
		},
		methods: {
			fetchAll() {
				this.$http.get('').then(response => {
					return response.json();
				}).then(data => {
					const items = data.categories.items;

					for (let key in items) {
						var ff = [];
						this.links.push(items[key]);
					}
				})
			}
		},
		created() {
			this.fetchAll();
		}
	}
</script>


<style lang="scss" scoped>
	ul {
		padding: 0;
		margin: 0;
		list-style-type: none;

		li {
				float: left;
				padding: 10px 10px 10px 0;

				a {
					text-decoration: none;
					font-size: 18px;
					color: #fff;
					position: absolute;
					left: 0;
					bottom: 5%;
					right: 0;
					text-align: center;
				}
			}
    }
    .imgWrap {
			width: 200px;
			height: 200px;

			img {
					width: 100%;
					height: auto
			}
    }

    .playlist-wrapper {
        position: relative;
    }

    .nav {
        clear: both;
    }
</style>




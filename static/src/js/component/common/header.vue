<template>
	<header>
		<div class="flag">
			<h2 v-link="{name: 'project', query: {id: 'all'}}">AMP</h2>			
		</div>
		<div class="user">
			asd
		</div>
	</header>
</template>


<style lang="less" scoped>
header{
	width: 98%;
	height: 44px;
	position: fixed;
	top: 0;
	left: 50%;
	background-color: rgba(255,255,255,0.3);
	transform: translateX(-50%);
	-webkit-transform: translateX(-50%);
	-moz-transform: translateX(-50%);
	-ms-transform: translateX(-50%);
	border-bottom-left-radius: 4px;
	border-bottom-right-radius: 4px;
	color: #fff;
	position: relative;
	text-align: justify; 
	font-size: 0;
}
header:after{
    content: '';
    display: inline-block;
    width: 100%;
    height: 0;
    font-size:0;
    line-height:0;
}
header>div{
	display: inline-block;
	vertical-align: middle;
}
.flag{
	font-size: 28px;
	line-height: 44px;
	width: 300px;
	text-align: center;
}
.flag h2{
	cursor: pointer;
}
.user{
	width: 300px;
	font-size: 32px;
	line-height: 44px;
}
</style>

<script lang="babel">
	
export default{
	name: 'Header',
	data: () => {
		return {

		}
	}
}


</script>
<template>
    <div class="home">
        <el-container>
            <el-aside width="80px">
            </el-aside>
            <el-container>
                <el-header>
                    <el-breadcrumb separator=">">
                        <el-breadcrumb-item :to="{ path: '/' }">Product</el-breadcrumb-item>
                        <el-breadcrumb-item>New Receipt Order</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="h-right">
                        <router-link to="">
                            <el-icon class="ico ico-angle-enlarge" :size="30"/>
                        </router-link>
                        <router-link to="">
                            <el-icon class="ico ico-message-more" :size="35"/>
                        </router-link>
                        <router-link to="">
                            <el-icon class="ico ico-cloud-down" :size="40"/>
                        </router-link>
                        <router-link to="">
                            <el-icon class="ico ico-circular-help" :size="35"/>
                        </router-link>
                        <router-link to="">
                            <strong>CN</strong>
                        </router-link>
                        <div class="user">
                            <el-avatar :src="imageUrl"/>
                            <router-link to=""><strong>UserName&nbsp;▶</strong></router-link>
                        </div>
                    </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>

export default {
    name: 'HomeView',
    data() {
        return {
            imageUrl: '',
        }
    },
}
</script>

<style scoped>
.home {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.el-container {
    height: 100%;
}

.el-aside {
    background-color: #001121
}

.el-header {
    padding-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px var(--el-border-color) var(--el-border-style);
}

.el-header a {
    text-decoration: none;
}

.h-right {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.user {
    width: 130px;
    font-size: small;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.el-main {
    padding: 0;
}
</style>
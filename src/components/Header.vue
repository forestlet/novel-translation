<script setup>
</script>

<template>
    <div class="header">
        <div class="left">
            <p class="title"> 📑 novel-translation</p>
        </div>

        <div class="right">
            <el-button-group class="lang_toggle">
                <el-button text> 中文 </el-button>
                <el-button text> EN </el-button>
                <el-button text> <i class="bi bi-translate"></i> </el-button>
            </el-button-group>

            <el-button text>
                <i class="bi bi-github"></i>
            </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .title {
        font-weight: 900;
    }

    .right {
        display: flex;
        align-items: center;

        .lang_toggle {
            margin-right: 12px;
        }
    }
}
</style>

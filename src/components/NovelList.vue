<script setup lang="ts">
import { novels, current_novel } from "@/data/novel"
import { router } from "@/router/router"
import { lang } from "@/data/lang"

let novel_names = Object.keys(novels)

const to_novel = (novel_name: string) => {
    router.push(`/novel/${novel_name}`)
    current_novel.value = novels[novel_name]
}
</script>

<template>
    <div class="content">
        <el-card v-for="novel_name in novel_names" shadow="never" @click="to_novel(novel_name)">
            <span v-if="lang == 'en' || lang == 'bi'">{{ novels[novel_name].en }}</span>
            <span v-if="lang == 'bi'">&nbsp&nbsp</span>
            <span v-if="lang == 'cn' || lang == 'bi'">{{ novels[novel_name].cn }}</span>
        </el-card>
    </div>
</template>

<style lang="scss">
.content {
    cursor: pointer;
    width: 72%;
    max-width: 720px;
    margin: auto;
    height: 100%;
    padding: 12px;

    --el-card-border-radius: 6px;

    .el-card {
        border: 2px solid var(--el-border-color-light);

        &:hover {
            border: 2px solid var(--el-color-info-light-5);
        }
    }
}
</style>

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
        <div class="content-item" v-for="novel_name in novel_names" @click="to_novel(novel_name)">
            <span v-if="lang == 'en' || lang == 'bi'">{{ novels[novel_name].en }}</span>
            <span v-if="lang == 'bi'">&nbsp&nbsp</span>
            <span v-if="lang == 'cn' || lang == 'bi'">{{ novels[novel_name].cn }}</span>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    width: 72%;
    max-width: 720px;
    margin: auto;
    height: 100%;
    padding: 12px;
    min-height: calc(100vh - 88px);

    .content-item {
        cursor: pointer;
        padding: 20px;
        border-radius: 0 6px 6px 0;
        border-left: 3px solid;
        margin: 7px;

        &:hover {
            background-color: var(--el-fill-color-lighter);
        }
    }
}
</style>

<script setup lang="ts">
import { novels } from "@/data/novel"
import { router } from "@/router/router"
import { ref } from "vue";
import { lang } from "@/data/lang"
import { current_novel, i_novel } from "@/data/novel"

let novel_name = router.currentRoute.value.params.novel_name

if (current_novel.value == "") {
    current_novel.value = novels[novel_name]
}

let cn_path = `/public/${novel_name}/${(current_novel.value as unknown as i_novel).cn}.md?raw`
let cn_txt = ref("")
import(cn_path).then(t => {
    cn_txt.value = (t.default).split("\r\n")
})

let en_path = `/public/${novel_name}/${(current_novel.value as unknown as i_novel).en}.md?raw`
let en_txt = ref("")
import(en_path).then(t => {
    en_txt.value = (t.default).split("\r\n")
})
</script>

<template>
    <div class="novel">
        <h1>
            <span>
                <span v-if="lang == 'en' || lang == 'bi'">{{ (current_novel as unknown as i_novel).en }}</span>
                <span v-if="lang == 'bi'">&nbsp&nbsp</span>
                <span v-if="lang == 'cn' || lang == 'bi'">{{ (current_novel as unknown as i_novel).cn }}</span>
            </span>
        </h1>
        <div v-for="index in cn_txt.length">
            <p v-if="lang == 'cn' || lang == 'bi'"> {{ cn_txt[index] }}</p>
            <p v-if="lang == 'en' || lang == 'bi'"> {{ en_txt[index] }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.novel {
    padding: 8px;
    background-color: var(--el-bg-color);
    width: 72%;
    max-width: 720px;
    margin: auto;
    text-align: justify;
    line-height: 2;
}
</style>

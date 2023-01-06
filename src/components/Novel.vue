<script setup lang="ts">
import { novels } from "@/data/novel"
import { router } from "@/router/router"
import { Ref, ref } from "vue";
import { lang } from "@/data/lang"
import { current_novel, i_novel } from "@/data/novel"

let novel_name = router.currentRoute.value.params.novel_name

if (current_novel.value == "") {
    current_novel.value = novels[novel_name]
}

let cn_path = `/${novel_name}/${(current_novel.value as unknown as i_novel).cn}.md?raw`
let cn_txt: Ref<string[]> = ref([""])

let en_path = `/${novel_name}/${(current_novel.value as unknown as i_novel).en}.md?raw`
let en_txt: Ref<string[]> = ref([""])

// 开发环境
if (import.meta.env.DEV) {
    import(cn_path).then(t => {
        cn_txt.value = (t.default).split("\r\n")
    })
    import(en_path).then(t => {
        en_txt.value = (t.default).split("\r\n")
    })
}
// 产品模式
else {
    fetch(window.location.href.split("/#/")[0] + cn_path)
        .then(res => { return res.text() })
        .then(text => {
            cn_txt.value = text.split("\n\n")
            console.log(cn_txt.value);
        })

    fetch(window.location.href.split("/#/")[0] + en_path)
        .then(res => { return res.text() })
        .then(text => { en_txt.value = text.split("\n\n") })
}
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
            <p v-if="lang == 'en' || lang == 'bi'"> {{ en_txt[index] }}</p>
            <p v-if="lang == 'cn' || lang == 'bi'"> {{ cn_txt[index] }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.novel {
    padding: 8px;
    width: 72%;
    max-width: 720px;
    margin: auto;
    text-align: justify;
    line-height: 2;

    p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;
    }
}
</style>

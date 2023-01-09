<script setup lang="ts">
import { novels } from "@/data/novel"
import { router } from "@/router/router"
import { reactive } from "vue";
import { lang } from "@/data/lang"
import { current_novel, i_novel } from "@/data/novel"

interface IContentList { "en": string[], "cn": string[] }
interface IText { "en": string[], "cn": string[] }

let novel_name = router.currentRoute.value.params.novel_name
let toc_list: IContentList = reactive({ "en": [], "cn": [] })

if (current_novel.value == "") {
    current_novel.value = novels[novel_name]
}

let path = {
    "cn": `/${novel_name}/${(current_novel.value as unknown as i_novel).cn}.md?raw`,
    "en": `/${novel_name}/${(current_novel.value as unknown as i_novel).en}.md?raw`
}
let txt: IText = reactive({ "cn": [], "en": [] })

const novel_parser = (txt: string, lang: "en" | "cn") => {
    let txt_list: string[]

    if (import.meta.env.DEV) {
        txt_list = txt.split("\r\n\r\n")
        // 好奇怪，还有个不可见字符 ﻿
        txt_list[0] = txt_list[0].slice(1,)
    }
    else {
        txt_list = txt.split("\n\n")
    }

    for (let i = 0; i < txt_list.length; i++) {
        // 大标题
        if (txt_list[i].startsWith("# ")) {
            txt_list[i] = txt_list[i].replace("# ", "")
            toc_list[lang].push(txt_list[i])

            // 脚注
            let regex = /(\[\d+\])/g
            let link = txt_list[i].replaceAll(regex, `<a id="${lang}-$1" href="#/novel/${novel_name}#${lang}-$1-comment" class="super">$1</a>`)
            txt_list[i] = `<h1 id="${txt_list[i]}"> ${link} </h1>`

            continue
        }
        // 副标题
        else if (txt_list[i].startsWith("## ")) {
            txt_list[i] = txt_list[i].replace("## ", "")
            toc_list[lang].push(txt_list[i])

            // 脚注
            let regex = /(\[\d+\])/g
            let link = txt_list[i].replaceAll(regex, `<a id="${lang}-$1" href="#/novel/${novel_name}#${lang}-$1-comment" class="super">$1</a>`)
            txt_list[i] = `<h2 id="${txt_list[i]}"> ${link} </h2>`

            continue
        }
        // 分割线
        else if (txt_list[i].startsWith("---")) {
            txt_list[i] = `<hr/>`
            continue
        }
        // 注释
        else if (txt_list[i].startsWith("[")) {
            let regex = /(\[\d+\])/g
            let len = txt_list[i].match(regex)![0].length

            // console.log(len)

            let link = `<a href="#/novel/${novel_name}#${lang}-${txt_list[i].slice(0, len)}">${txt_list[i].slice(0, len)}</a>`
            txt_list[i] = `<p id="${lang}-${txt_list[i].slice(0, len)}-comment" class="comment">
                               ${link} ${txt_list[i].slice(len,)}
                           </p>`
            continue
        }
        // 段落
        else {
            txt_list[i] = `<p> ${txt_list[i]} </p>`

            // 脚注
            let regex = /(\[\d+\])/g
            txt_list[i] = txt_list[i].replaceAll(regex, `<a id="${lang}-$1" href="#/novel/${novel_name}#${lang}-$1-comment" class="super">$1</a>`)
        }
    }
    return txt_list
}

// 开发环境
if (import.meta.env.DEV) {
    import(path["cn"]).then(t => {
        txt["cn"] = novel_parser(t.default, "cn")
    })
    import(path["en"]).then(t => {
        txt["en"] = novel_parser(t.default, "en")
    })
}
// 产品模式
else {
    fetch(window.location.href.split("/#/")[0] + path["cn"])
        .then(res => { return res.text() })
        .then(text => { txt["cn"] = novel_parser(text, "cn") })

    fetch(window.location.href.split("/#/")[0] + path["en"])
        .then(res => { return res.text() })
        .then(text => { txt["en"] = novel_parser(text, "en") })
}

</script>

<template>
    <div class="novel">
        <div class="toc">
            <el-popover placement="right" :width="300" trigger="hover">
                <template #reference>
                    <i class="bi bi-list"></i>
                </template>

                <ul>
                    <template v-for="index in toc_list['cn'].length">
                        <li v-if="lang == 'en' || lang == 'bi'">
                            <router-link :to="novel_name + '\#' + toc_list['en'][index - 1]">
                                {{ toc_list['en'][index - 1] }}
                            </router-link>
                        </li>
                        <li v-if="lang == 'cn' || lang == 'bi'">
                            <router-link :to="novel_name + '\#' + toc_list['cn'][index - 1]">
                                {{ toc_list['cn'][index - 1] }}
                            </router-link>
                        </li>
                    </template>
                </ul>
            </el-popover>
        </div>


        <div v-for="index in txt['cn'].length">
            <div v-if="lang == 'en' || lang == 'bi'" v-html="txt['en'][index - 1]"> </div>
            <div v-if="lang == 'cn' || lang == 'bi'" v-html="txt['cn'][index - 1]"></div>
        </div>

        <el-backtop :bottom="40">
            <i class="bi bi-arrow-up-short"></i>
        </el-backtop>
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

    .super {
        vertical-align: super;
        font-size: 0.6rem;
    }

    .toc {
        position: fixed;
        left: 12px;
        top: calc(50% - 20px);
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 1.1rem;
        margin-bottom: 1.5rem;

        &.comment {
            font-size: 0.8rem;
            color: var(--el-text-color-secondary);
        }
    }

    .el-backtop {
        border-radius: 4px;
        color: var(--el-text-color-secondary);
        --el-box-shadow-lighter: 0px 0px 2px #0000001f;

        &:hover {
            background-color: var(--el-fill-color)
        }
    }
}
</style>

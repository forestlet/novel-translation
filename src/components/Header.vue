<script setup lang="ts">
import { lang } from "@/data/lang"
import { useDark, useToggle } from '@vueuse/core'
import { ref } from "vue";
import { current_novel, i_novel } from "@/data/novel"
import { router } from "@/router/router";

const change_lang = (new_lang: string) => {
    lang.value = new_lang
}

let theme = ref(Boolean(window.matchMedia("(prefers-color-scheme: light)")))
const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
})
const toggleDark = () => {
    theme.value = !theme.value
    useToggle(isDark)()
}

const home = () => {
    router.push("/")
    current_novel.value = ""
}
</script>

<template>
    <div class="header">
        <div class="left">
            <p> <span class="logo" @click="home()"> 📑 Novel Translation </span> </p>

            <p class="title" v-if="current_novel">
                <span v-if="lang == 'en' || lang == 'bi'">{{ (current_novel as unknown as i_novel).en }}</span>
                <span v-if="lang == 'bi'">&nbsp&nbsp</span>
                <span v-if="lang == 'cn' || lang == 'bi'">{{ (current_novel as unknown as i_novel).cn }}</span>
            </p>
        </div>

        <div class="right">
            <el-button text @click="toggleDark()">
                <i v-if="theme" class="bi bi-moon"></i>
                <i v-else class="bi bi-sun"></i>
            </el-button>

            <el-button-group class="lang_toggle">
                <el-button text @click="change_lang('en')" :class="lang == 'en' ? 'active' : ''"> EN </el-button>
                <el-button text @click="change_lang('cn')" :class="lang == 'cn' ? 'active' : ''"> 中文 </el-button>
                <el-button text @click="change_lang('bi')" :class="lang == 'bi' ? 'active' : ''"> <i
                        class="bi bi-translate"></i> </el-button>
            </el-button-group>

            <el-button text>
                <a href="https://github.com/forestlet/novel-translation">
                    <i class=" bi bi-github"></i>
                </a>
            </el-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    background-color: var(--el-bg-color);
    padding: 0 8px;
    width: 72%;
    max-width: 720px;
    margin: auto;
    user-select: none;
    margin: 12px auto;

    .left {

        .logo {
            font-weight: 900;
            line-height: 32px;
            cursor: pointer;
        }

        .title {
            font-size: 12px;
            padding-left: 28px;
            position: relative;
            bottom: 6px;
            height: 0;
        }
    }

    .right {
        display: flex;
        align-items: center;

        .lang_toggle {
            margin: 0 12px;
        }

        .el-button {
            background-color: var(--el-bg-color-page);

            &:hover {
                background-color: var(--el-color-info-light-8);
            }
        }

        .active {
            background-color: var(--el-color-info-light-5);
        }
    }
}

@media only screen and (max-width: 400px) {
    .header {
        flex-direction: column-reverse;

        .left {
            text-align: center;

            .title {
                padding-left: 0;
                bottom: 0;
                height: 12px;
            }
        }
    }
}
</style>

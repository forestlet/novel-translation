// @ts-ignore
import novels_json from "/public/novels.json";
import { Ref, ref } from "vue";

export interface i_novel {
  cn: string;
  en: string;
}

export const novels = novels_json;
export let current_novel: Ref<i_novel> | Ref<string> = ref("");

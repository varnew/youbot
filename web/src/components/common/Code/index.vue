<script setup lang="ts">
import { computed, ref } from "vue";
import { NModal, NInput, NButton, useMessage } from "naive-ui";
import { useUserStore } from "@/store";
import { t } from "@/locales";
interface Props {
  visible: boolean;
}

interface Emit {
  (e: "update:visible", visible: boolean): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emit>();

const code = ref<string>("");

const show = computed({
  get() {
    return props.visible;
  },
  set(visible: boolean) {
    emit("update:visible", visible);
  },
});
const ms = useMessage();
const userStore = useUserStore();
function updateUserInfo(options: Partial<UserInfo>) {
  userStore.updateUserInfo(options);
  ms.success(t("common.success"));
  show.value = false;
}
</script>

<template>
  <NModal v-model:show="show" title="获取密钥" :auto-focus="false" preset="card" style="width: 95%; max-width: 640px">
    <img
      style="display: block; width: 200px; margin: 20px auto"
      referrerpolicy="no-referrer"
      src="https://upload-images.jianshu.io/upload_images/4752413-7f5281d25fa67702.png?imageMogr2/auto-orient/strip|imageView2/2/w/430/format/webp"
    />
    <div style="text-align: center; color: gray; font-size: 12px; margin-bottom: 20px">微信扫描二维码获取密钥，一次可供使用约1周！</div>
    <div class="flex items-center space-x-4">
      <span class="flex-shrink-0 w-[30px]">{{ $t("setting.code") }}</span>
      <div class="flex-1">
        <NInput v-model:value="code" style="width: 100%" />
      </div>
      <NButton size="tiny" text type="primary" @click="updateUserInfo({ code })">
        {{ $t("common.save") }}
      </NButton>
    </div>
  </NModal>
</template>

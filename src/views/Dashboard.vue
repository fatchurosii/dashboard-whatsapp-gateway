<template>
  Dashboard
  <button type="button" @click="modalForm?.show()" class="btn btn-primary">Show Modal</button>
  <button type="button" @click="modalDetail?.show()" class="btn btn-primary">Show Modal Detail</button>
  <CustomModal ref="modalForm" title="Judul" subtitle="Subjudul" size="modal-lg">
    <ModalBody>
      Konten modal di sini.
    </ModalBody>
    <ModalFooter>
      <button class="btn btn-primary" @click="modalForm?.hide()">Tutup</button>
    </ModalFooter>
  </CustomModal>

  <CustomModal ref="modalDetail" title="Judul" subtitle="Subjudul" size="modal-lg">
    <ModalBody>
      Detail
    </ModalBody>
    <ModalFooter>
      <button class="btn btn-primary" @click="modalDetail?.hide()">Tutup</button>
    </ModalFooter>
  </CustomModal>
</template>
<script setup lang="ts">
  import { CustomModal, ModalBody, ModalFooter} from "@src/components/main";

  import { initMetronicPlugin } from "@src/plugins/global";
  import {
    ref,
    onMounted
  } from "vue"

  const modalForm = ref<InstanceType<typeof CustomModal> | null>(null);
  const modalDetail = ref<InstanceType<typeof CustomModal> | null>(null);

  onMounted(() => {
    initMetronicPlugin();
  });
</script>
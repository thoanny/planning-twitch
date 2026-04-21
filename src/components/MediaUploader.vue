<template>
  <FileUpload
    mode="basic"
    accept="image/*"
    :multiple="true"
    :maxFileSize="maxFileSize"
    :showUploadButton="false"
    :showCancelButton="false"
    chooseLabel="Ajouter des médias"
    customUpload
    auto
    @uploader="customBase64Uploader"
  >
    <template #empty>
      <span>Drag and drop files to here to upload.</span>
    </template>
  </FileUpload>
</template>

<script setup>
import { db } from '@/db';
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const maxFileSize = 4 * 1024 * 1024;

const customBase64Uploader = async (event) => {
  event.files.forEach(async (file) => {
    const reader = new FileReader();
    let blob = await fetch(file.objectURL).then((r) => r.blob());

    reader.readAsDataURL(blob);
    reader.onloadend = async () => {
      // const base64data = reader.result;

      await db.medias
        .add({
          name: file.name,
          // data: base64data,
          data: blob,
        })
        .then((data) => {
          toast.add({
            severity: 'success',
            summary: 'Média',
            detail: "L'image a bien été ajoutée",
            life: 3000,
          });
        });
    };
  });
};
</script>

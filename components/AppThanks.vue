<script setup>
const isOpen = ref(false);

const { data } = await useAsyncData("tpotes", () =>
  $fetch("https://wp.thoanny.fr/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        tPotes(where: {orderby: {field: TITLE, order: ASC}}) {
          nodes {
            featuredImage {
              node {
                sourceUrl(size: THUMBNAIL)
              }
            }
            id
            title(format: RENDERED)
            tPotes {
              source
              startAt
            }
          }
        }
    }`,
    }),
  })
);
</script>

<template>
  <a
    href="#!"
    @click.prevent="isOpen = true"
    class="text-sm font-semibold text-primary hover:text-primary-600 inline-flex items-center gap-1"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      class="w-4 h-4"
    >
      <path
        d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z"
      />
    </svg>

    T-potes
  </a>

  <UModal v-model="isOpen">
    <UCard>
      <div>
        Merci à tous les <strong>T-potes</strong> qui me soutiennent dans mes
        projets, que ce soit sur
        <a
          href="https://twitch.tv/thoanny"
          target="_blank"
          class="font-semibold underline underline-offset-2 text-primary"
          >Twitch</a
        >
        ou
        <a
          href="https://www.patreon.com/thoanny"
          target="_blank"
          class="font-semibold underline underline-offset-2 text-primary"
          >Patreon</a
        >.

        <div v-if="data" class="flex flex-wrap gap-x-3 gap-y-2 mt-4">
          <span
            v-for="tpote in data.data.tPotes.nodes"
            :key="tpote.id"
            class="inline-flex gap-2 bg-gray-100 rounded-full items-center pr-4 font-semibold text-sm"
          >
            <UAvatar
              v-if="tpote.featuredImage.node.sourceUrl"
              :src="tpote.featuredImage.node.sourceUrl"
              size="sm"
              alt=""
              class="bg-white"
            />
            {{ tpote.title }}
          </span>
        </div>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>
import AppSidebar from '@/components/AppSidebar.vue';
import AppPreview from '@/components/AppPreview.vue';

const tourSteps = [
  {
    target: '[data-step="0"]',
    header: {
      title: 'Bienvenue !',
    },
    content: `Gérez les événements et les paramètres de votre planning grâce à cette barre latérale.`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="1"]',
    header: {
      title: 'Ajouter un événement',
    },
    content: `Cliquez sur ce bouton pour ajouter un nouvel événement à votre planning.`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="2"]',
    header: {
      title: "Modèles d'événement",
    },
    content: `Les modèles (Jour = Modèle) servent à créer des événements qui n'apparaissent pas dans votre planning.`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="2"]',
    header: {
      title: "Modèles d'événement",
    },
    content: `Modifiez cette option pour afficher/masquer les modèles dans votre liste d'événements.`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="3"]',
    header: {
      title: 'Organiser les événements',
    },
    content: `Glisez-déposez les événements pour changer leur ordre d'affichage.`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="3"]',
    header: {
      title: 'Gérer les événements',
    },
    content: `Dupliquez, modifiez ou supprimez vos événements en cliquant droit sur ceux-ci (laissez appuyé sur écran tactile).`,
    params: {
      enableScrolling: false,
    },
  },
  {
    target: '[data-step="4"]',
    header: {
      title: 'Aperçu du planning',
    },
    content: `Affichez la version paysage ou portrait de votre planning. Ce deux formats vous offrent une large gamme de diffusion sur les réseaux sociaux numériques.`,
    params: {
      enableScrolling: false,
      placement: 'left-start',
    },
  },
  {
    target: '[data-step="4"]',
    header: {
      title: 'Aperçu du planning',
    },
    content: `Cliquez sur l'image d'aperçu pour l'agrandir en plein écran.`,
    params: {
      enableScrolling: false,
      placement: 'left-start',
    },
  },
  {
    target: '[data-step="4"]',
    header: {
      title: 'Télécharger le planning',
    },
    content: `Téléchargez l'image en cliquant droit sur celle-ci (laissez appuyé sur écran tactile).`,
    params: {
      enableScrolling: false,
      placement: 'left-start',
    },
  },
];
</script>

<template>
  <div class="container mx-auto h-full">
    <div class="flex flex-col-reverse lg:flex-row gap-4 h-full p-4 mx-auto container">
      <AppSidebar />
      <AppPreview />
    </div>
  </div>
  <v-tour
    name="myTour"
    :steps="tourSteps"
    :options="{
      highlight: true,
      labels: {
        buttonSkip: 'Passer',
        buttonPrevious: 'Précédent',
        buttonNext: 'Suivant',
        buttonStop: 'Terminer',
      },
    }"
  ></v-tour>
</template>

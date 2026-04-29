<template>
  <Button icon="pi pi-question-circle" label="Aide" size="small" link @click="handleStartTour" />
  <VTour
    :steps="steps"
    ref="vtour"
    :buttonLabels="{ next: 'Suivant', back: 'Précédent', done: 'Terminer', skip: 'Passer' }"
    :backdrop="true"
    :highlight="true"
  />
</template>

<script setup>
import { VTour } from '@globalhive/vuejs-tour';
import { Button } from 'primevue';
import { ref } from 'vue';

const steps = [
  {
    target: '[data-step="0"]',
    content:
      'Gérez les événements et les paramètres de votre planning grâce à cette barre latérale.',
  },
  {
    target: '[data-step="1"]',
    content: 'Cliquez sur ce bouton pour ajouter un nouvel événement à votre planning.',
  },
  {
    target: '[data-step="2"]',
    content:
      "Les modèles (Jour = Modèle) servent à créer des événements qui n'apparaissent pas dans votre planning.",
  },
  {
    target: '[data-step="2"]',
    content:
      "Modifiez cette option pour afficher/masquer les modèles dans votre liste d'événements.",
  },
  {
    target: '[data-step="3"]',
    content: "Glissez-déposez les événements pour changer leur ordre d'affichage.",
  },
  {
    target: '[data-step="3"]',
    content: 'Cliquez sur un événement pour le modifier, le dupliquer ou le supprimer.',
  },
  {
    target: '[data-step="4"]',
    content:
      'Affichez la version paysage ou portrait de votre planning. Ces deux formats vous offrent une large gamme de diffusion sur les réseaux sociaux numériques.',
  },
  {
    target: '[data-step="4"]',
    content: "Cliquez sur l'image d'aperçu pour l'agrandir en plein écran.",
  },
];

const vtour = ref();

const handleStartTour = () => {
  vtour.value.startTour();
};
</script>

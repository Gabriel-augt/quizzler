<script setup>
import Home from './components/Home.vue';
import Questions from './components/Questions.vue';
import Results from './components/Results.vue';

import { useI18n } from 'vue-i18n';
const { locale } = useI18n({ useScope: 'global' });

import { ref } from 'vue';

const homeLayout = ref(true);
const questionsLayout = ref(false);
const resultsLayout = ref(false);
const setLanguage = ref('');
const onScores = ref(0);

function start(lang) {

  homeLayout.value = false;
  questionsLayout.value = true;
  setLanguage.value = lang;
  locale.value = lang;
  
}

function quizScore (score) {
  onScores.value = score;
}

function quizCompleted () {

  questionsLayout.value = false;
  resultsLayout.value = true;
  
}

</script>

<template>

    <div>
      
      <Home @startGame="start" v-if="homeLayout" />

      <Questions @quizFinished="quizCompleted" @scores="quizScore" :mainLanguage='setLanguage' v-if="questionsLayout" />
      
      <Results :scoresX="onScores" v-if="resultsLayout"/>

    </div>

</template>

<style scoped>
</style>

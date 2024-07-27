<script setup>
import Home from './components/Home.vue'
import Questions from './components/Questions.vue'

import { ref } from 'vue';

let homeLayout = ref(true);
let questionsLayout = ref(false);

function start() {
    homeLayout.value = false;
    questionsLayout.value = true;
}

</script>

<template>
    <div>
        <Home @startGame="start()" v-if="homeLayout"/>
        
        <transition name="fade">
            <Questions v-if="questionsLayout" />
        </transition>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

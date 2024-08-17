<script setup>
import { onMounted, ref } from "vue";

const scoreboard = ref(true);
const credits = ref(false);
const loader = ref(true);

const props = defineProps(['scoresX']);

const refresh = () => {
  location.reload(true);
};

const finished = () => {
  scoreboard.value = false;
  credits.value = true;
};

onMounted(() => {

    setTimeout(() => {
        loader.value = false;
    }, 1300);

})

</script>

<template>

    <div class="flex flex-col justify-center text-rose-800 w-screen h-screen items-center xl:bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">

        <div v-if="loader" class="flex flex-col justify-center absolute z-50 w-screen h-screen items-center select-none bg-gradient-to-tr from-purple-400 to-blue-400">

            <p class="loader"></p>

            <p class="dotsLoading mt-5 text-blue-1000 text-lg font-bold font-quicksand">
                {{ $t('loadingResults') }}
            </p>

        </div>

        <main class="flex justify-center items-center w-screen h-screen">
            
            <section class="flex justify-center items-center flex-col text-center space-y-7 w-screen h-screen bg-[url('/src/assets/bg-Results.png')] bg-center bg-cover bg-no-repeat select-none drop-shadow-lg xl:rounded-xl xl:w-7/12 xl:h-2/3 bgResults">
                
                <div v-if="scoreboard">
                    
                    <h2 class="text-3xl font-quicksand font-bold"> {{ $t('result') }} </h2>
                    
                    <h1 class="text-9xl font-quicksand font-bold">{{ props.scoresX }}/10</h1>
                    
                    <div class="space-y-5">
                        <p class="text-3xl font-quicksand font-bold mt-10"> {{ $t('playAgain') }} </p>
                        
                        <button @click="refresh()" class="mx-7 hover:scale-110 hover:duration-300">
                            <img src="../assets/selected.svg">
                        </button>
                        
                        <button @click="finished()" class="mx-7 hover:scale-110 hover:duration-300">
                            <img src="../assets/cancel.svg" />
                        </button>
                        
                    </div>
                    
                </div>

                <transition name="slide-fade">
                
                <div v-if="credits">
                    
                    <h2 class="text-4xl font-quicksand font-bold mb-4 my-60"> {{ $t('thanks') }}</h2>
                    
                    <p class="text-4xl">&#128516</p>
                    
                    <a href="https://linktr.ee/gabriel_augt" target="_blank">
                        <img src="../assets/gb.png" class="w-96">
                    </a>
                    
                </div>

                </transition>
                
                
            </section>
            
        </main>

    </div>

</template>

<style scoped>
/* loader */
.loader {
  width: 120px;
  height: 22px;
  border-radius: 20px;
  color: #514b82;
  border: 2px solid;
  position: relative;
}

.loader::before {
  content: "";
  position: absolute;
  margin: 2px;
  inset: 0 100% 0 0;
  border-radius: inherit;
  background: currentColor;
  animation: l6 1.3s infinite;
}

@keyframes l6 {
    100% {inset:0}
}

/* Transition effects */
.slide-fade-enter-active {
    transition: all .5s ease-out;
}

.slide-fade-enter-from {
    transform: translateX(50px);
    opacity: 0;
}

/* Dots loading */
.dotsLoading {
  width: fit-content;
  font-family: monospace;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1.3s steps(4) infinite;
  content:"..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}

@media (max-height: 760px) {
    
  .bgResults { 
    height: 100vh;
  }
}

</style>
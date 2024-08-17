<script setup>
import { onMounted, ref } from 'vue';

const emit = defineEmits(['startGame']);
const loader = ref(true);
const homePage = ref(true);
const languages = ref(false);

function goToLanguage () {
    homePage.value = false;
    languages.value = true;
}

function clickStart (lang) {
    languages.value = false;
    emit("startGame", lang);
}

onMounted(() => {

    setTimeout(() => {
        loader.value = false;
    }, 2000);
})

</script>

<template>

    <div class="flex flex-col justify-center w-screen h-screen items-center bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">

        <div v-if="loader" class="flex flex-col justify-center absolute z-50 w-screen h-screen items-center bg-gradient-to-tr from-purple-400 to-blue-400">

            <p class="loader"></p>

        </div>

        <section class="flex justify-center flex-col bg-bgHome bg-center bg-cover bg-no-repeat items-center select-none w-screen h-screen xl:shadow-md xl:rounded-xl xl:w-7/12 xl:h-2/3">

            <div v-if="homePage">

                <h1 class="text-8xl font-quicksand font-bold h-28 my-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-300 md:ml-48 md:my-0 lg:ml-28 xl:ml-48">
                    Quizzler
                </h1>
    
                
                <button @click="goToLanguage()" class="text-4xl inline-flex items-center font-quicksand font-bold tracking-widest ml-36 bg-clip-text text-transparent bg-gradient-to-l from-orange-300 to-violet-500 sm:ml-48 md:ml-96 lg:ml-72 xl:ml-96">
                    <img src="../assets/play.svg" class="h-20 ml-3 animate-bounce xl:animate-none xl:hover:scale-110 xl:hover:duration-300 sm:h-16">
                </button>
                
            </div>

            <transition name="slide-fade">

                <div v-if="languages" class="flex row justify-center gap-x-16">
                    
                    <figure class="text-center font-quicksand font-bold w-20 sm:w-28">
                        <img @click="clickStart('en')" class="rounded-xl mb-0.5 cursor-pointer" src="../assets/us.svg">
                        <figcaption>English</figcaption>
                    </figure>
                    
                    <figure class=" text-center font-quicksand font-bold w-20 sm:w-28">
                        <img @click="clickStart('pt_BR')" class="rounded-xl mb-0.5 cursor-pointer" src="../assets/br.svg">
                        <figcaption>Português</figcaption>
                    </figure>
                    
                    <figure class="text-center font-quicksand font-bold w-20 sm:w-28">
                        <img @click="clickStart('es')" class="rounded-xl mb-0.5 cursor-pointer" src="../assets/es.svg">
                        <figcaption>Español</figcaption>
                    </figure>
                    
                </div>
                
            </transition>

        </section>
           
    </div>

</template>

<style scoped>
/* loader */
.loader {
  width: 100px;
  height: 100px;
  background: #FFF;
  display: inline-block;
  border-radius: 50%;
  box-sizing: border-box;
  animation: animloader 1s ease-in infinite;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
} 
/* Transition effects */
.slide-fade-enter-active {
  transition: all .5s ease-out;
}

.slide-fade-enter-from {
    transform:  translateX(50px);
    opacity: 0;
}


</style>
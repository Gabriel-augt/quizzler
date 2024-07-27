<script setup>
const emit = defineEmits(["startGame"])
    
function clickStart () {
    emit("startGame");
}

</script>

<template>
    <div class="flex flex-col justify-center w-screen h-screen items-center bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">
        <section class="flex justify-center flex-col bg-bgHome bg-center bg-cover bg-no-repeat items-center select-none w-screen h-screen xl:shadow-md xl:rounded-xl xl:w-7/12 xl:h-2/3">
            
            <h1 class="text-8xl font-quicksand font-bold h-28 my-5 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-orange-300 md:ml-48 md:my-0 lg:ml-28 xl:ml-48">
                Quizzler
            </h1>

            
            <button @click="clickStart()" class="text-4xl inline-flex items-center font-quicksand font-bold tracking-widest ml-36 bg-clip-text text-transparent bg-gradient-to-l from-orange-300 to-violet-500 sm:ml-48 md:ml-96 lg:ml-72 xl:ml-96">
                Iniciar
                <img src="../assets/arrow-right.png" class="h-11 ml-2 p-1 animate-bounce">
            </button>
        </section>
        
    </div>

</template>

<style scoped>
</style>
<template>
    <div class="flex flex-col justify-center text-rose-800 w-screen h-screen items-center xl:bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">
        <main class="flex justify-center items-center w-screen h-screen">
            <section class="flex justify-center items-center flex-col text-center space-y-7 w-screen h-screen bg-[url('/src/assets/bg-2.png')] bg-center bg-cover bg-no-repeat select-none xl:shadow-md xl:rounded-xl xl:w-7/12 xl:h-2/3">

                <h2 class="text-3xl font-quicksand font-bold">Resultado</h2>

                <h1 @point="pointsGame()" class="text-9xl font-quicksand font-bold">{{}}/10</h1>
                
                <section class="space-y-5">
                    <p class="text-3xl font-quicksand font-bold">Jogar novamente?</p>
                    
                    <button @click="refresh()" class="mx-7 hover:scale-110 hover:duration-300">
                        <img src="../assets/selected.svg">
                    </button>

                    <button class="mx-7 hover:scale-110 hover:duration-300">
                        <img src="../assets/cancel.svg">
                    </button>

                </section>
            </section>
        </main>
    </div>
</template>

<script setup>

const refresh = () => {
  location.reload(true);
};
</script>
<style scoped>
    
</style>
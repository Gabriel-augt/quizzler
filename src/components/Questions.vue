<script setup>
import questions from "@/questions/questions.js";
import { computed, ref } from "vue";

const countQuestion = ref(1);
let score = ref(0);
const activeQuiz = ref(true);
const quizCompleted = ref(false);
const scoreboard = ref(true);
const credits = ref(false);
const answerA = ref(null);
const answerB = ref(null);
const answerC = ref(null);
const answerD = ref(null);

//Non-repeating random numbers
const randomQuestions = computed(() => {
  let questionX = new Set();

  while (questionX.size < 30) {
    let randomNum = Math.floor(Math.random() * 30);
    questionX.add(randomNum);
  }

  return Array.from(questionX);
});

const randomOptions = computed(() => {
  let optionX = new Set();

  while (optionX.size < 4) {
    let randomNum = Math.floor(Math.random() * 4);
    optionX.add(randomNum);
  }

  return Array.from(optionX);
});

const getQuestions = computed(() => {
  const searchQuestion = randomQuestions.value[countQuestion.value-1];

  return questions[searchQuestion].question;
});

const getOptions = computed(() => {

  const searchOptions = randomQuestions.value[countQuestion.value-1];
  const shuffledQuestions = [];

  for (let op in randomOptions.value) {
    shuffledQuestions.push(questions[searchOptions].options[randomOptions.value[op]]);
  }
  
  return shuffledQuestions;
});

const nextAnswers = () => {
  return countQuestion.value++;
};

const selected = (optn) => {
  
  const optnUser = optn.textContent;
  const answers = randomQuestions.value[countQuestion.value-1];
  const checkAnswer = questions[answers].answer;

  if (optnUser == checkAnswer) {
    score.value++;
  }

  if (countQuestion.value == 10) {
    quizCompleted.value = true;
    activeQuiz.value = false;
  }

  nextAnswers();
};

const refresh = () => {
  location.reload(true);
};

const finished = () => {
  scoreboard.value = false;
  credits.value = true;
};


</script>

<template>
  <div class="flex flex-col justify-center w-screen h-screen overflow-hidden items-center bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">

    <section
      v-if="activeQuiz"
      class="flex justify-center items-center text-center flex-col bg-[url('/src/assets/bg-questions.jpg')] bg-center bg-cover bg-no-repeat w-screen h-screen select-none xl:shadow-md xl:rounded-xl xl:w-7/12 xl:h-2/3">

      <h3
        class="text-blue-1000 text-2xl mb-5 shadow-md rounded-xl p-2 font-quicksand">
        Questão {{ countQuestion }}/{{ 10 }}
      </h3>

      <h2 class="text-blue-1000 font-semibold text-3xl font-quicksand mb-5 p-5 xl:w-3/6">
        {{ getQuestions }}
      </h2>

      <section class="flex flex-row items justify-center w-full">

        <div class="flex flex-col items-start text-left w-80 gap-5 font-quicksand font-semibold text-2xl sm:w-96">

          <div @click="selected(answerA)" class="bg-yellow-200 p-5 rounded-lg w-full hover:bg-yellow-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-yellow-300 text-yellow-800 px-3 rounded-full shadow-md">A</span>
            <span ref="answerA" class="ml-5 text-yellow-900 tracking-wide"> {{ getOptions[0] }} </span>
          </div>

          <div @click="selected(answerB)" class="bg-cyan-200 p-5 rounded-lg w-full hover:bg-cyan-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-cyan-300 text-cyan-800 px-3 rounded-full shadow-md">B</span>
            <span ref="answerB" class="ml-5 text-violet-900 tracking-wide"> {{ getOptions[1] }} </span>
          </div>

          <div @click="selected(answerC)" class="bg-emerald-300 p-5 rounded-lg w-full hover:bg-emerald-100  hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-emerald-400 text-emerald-800 px-3 rounded-full shadow-md">C</span>
            <span ref="answerC" class="ml-5 text-emerald-900 tracking-wide"> {{ getOptions[2] }} </span>
          </div>

          <div @click="selected(answerD)" class="bg-red-300 p-5 rounded-lg w-full hover:bg-red-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-red-400 text-red-800 px-3 rounded-full shadow-md">D</span>
            <span ref="answerD" class="ml-5 text-red-900 tracking-wide"> {{ getOptions[3] }} </span>
          </div>
          
        </div>
      </section>
    </section>
    
    <transition name="fade">

      <section v-if="quizCompleted" class="flex flex-col justify-center text-rose-800 w-screen h-screen items-center lg:bg-gradient-to-tr lg:from-purple-400 lg:to-blue-400">
        
        <main class="flex justify-center items-center w-screen h-screen">

          
          <section
          class="flex justify-center items-center flex-col text-center space-y-7 w-screen h-screen bg-[url('/src/assets/bg-results.png')] drop-shadow-lg bg-center bg-cover bg-no-repeat rounded-xl select-none xl:w-7/12 xl:h-2/3">

          <div v-if="scoreboard">

            <h2 class="text-3xl font-quicksand font-bold">Resultado</h2>
            
            <h1 class="text-9xl font-quicksand font-bold">{{ score }}/10</h1>

              <div class="space-y-5">
                <p class="text-3xl font-quicksand font-bold">Jogar novamente?</p>
              
                <button @click="refresh()" class="mx-7 hover:scale-110 hover:duration-300">
                  <img src="../assets/selected.svg" />
                </button>
              
                <button @click="finished()" class="mx-7 hover:scale-110 hover:duration-300">
                  <img src="../assets/cancel.svg" />
                </button>
              </div>

          </div>
                    
              <div v-if="credits">

                <h2 class="text-4xl font-quicksand font-bold mb-4 my-60">Obrigado pela visita!</h2>

                <p class="text-4xl">&#128516</p>

                <a href="https://linktr.ee/gabriel_augt" target="_blank">
                  <img src="../assets/gb.png" class="w-96">
                </a>
              </div>
              
          </section>
        </main>
      </section>
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

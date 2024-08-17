<script setup>
import { computed, onMounted, ref } from "vue";

const loader = ref(true);
const countQuestion = ref(1);
const score = ref(0);
const activeQuiz = ref(true);
const quizCompleted = ref(false);
const answerA = ref(null);
const answerB = ref(null);
const answerC = ref(null);
const answerD = ref(null);
const shuffledQuestion = ref('');
const shuffledOptions = ref([]);
const answer = ref('');

const emit = defineEmits(['scores', 'quizFinished']);
const props = defineProps(['mainLanguage']);

const quizLanguage = (locale) => {
  
  const setLocale =  import(`../questions/questions-${locale}.js`) .then(( {default: questions}) => {

    const searchQuestion = randomQuestions.value[countQuestion.value-1];
  
    shuffledQuestion.value = questions[searchQuestion].question;
    getOptions(questions[searchQuestion].options);
    answer.value = questions[searchQuestion].answer;

  });
  
};

quizLanguage(props.mainLanguage)

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

const getOptions = (opts) => {

   for (let op in randomOptions.value) {
    shuffledOptions.value[op] = opts[randomOptions.value[op]];
  };
};

const nextAnswers = () => {
  return countQuestion.value++;
};

const selected = (optn) => {
  
  const optnUser = optn.textContent;
  const checkAnswer = answer.value;

  if (optnUser == checkAnswer) {
    score.value++;
    emit("scores", score.value);
  }

  if (countQuestion.value == 10) {
    quizCompleted.value = true;
    activeQuiz.value = false;
    emit("quizFinished");
  }
  
  quizLanguage(props.mainLanguage, nextAnswers());

};

onMounted(() => {
  
  setTimeout(() => {
    loader.value = false;
  }, 1300);

})

</script>

<template>

  <div class="flex flex-col justify-center w-screen h-screen overflow-hidden items-center bg-gradient-to-tr xl:from-purple-400 xl:to-blue-400">

    <div v-if="loader" class="flex flex-col justify-center absolute z-50 w-screen h-screen items-center select-none bg-gradient-to-tr from-purple-400 to-blue-400">

      <p class="loader"></p>

      <p class="dotsLoading mt-5 text-blue-1000 text-lg font-bold font-quicksand">
        {{ $t('loadingQuestions') }}
      </p>

    </div>


    <section v-if="activeQuiz"
      class="flex justify-center items-center text-center flex-col bg-[url('/src/assets/bg-questions.jpg')] bg-center bg-cover bg-no-repeat w-screen h-screen select-none xl:shadow-md xl:rounded-xl xl:w-7/12 xl:h-2/3 bgQuestions">
      
      <h3 class="text-blue-1000 text-2xl mb-5 shadow-md rounded-xl p-2 font-quicksand">
        {{ $t('question') }} {{ countQuestion }}/{{ 10 }}
      </h3>
      
      <h2 class="text-blue-1000 font-semibold text-3xl font-quicksand mb-5 p-5 xl:w-3/6">{{ shuffledQuestion }}</h2>
      
      <section class="flex flex-row items justify-center w-full">
        
        <div class="flex flex-col items-start text-left w-80 gap-5 font-quicksand font-semibold text-2xl sm:w-96">
          
          <div @click="selected(answerA)" class="bg-yellow-200 p-5 rounded-lg w-full hover:bg-yellow-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-yellow-300 text-yellow-800 px-3 rounded-full shadow-md">A</span>
            <span ref="answerA" class="ml-5 text-yellow-900 tracking-wide">{{ shuffledOptions[0] }}</span>
          </div>
          
          <div @click="selected(answerB)" class="bg-cyan-200 p-5 rounded-lg w-full hover:bg-cyan-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-cyan-300 text-cyan-800 px-3 rounded-full shadow-md">B</span>
            <span ref="answerB" class="ml-5 text-violet-900 tracking-wide">{{ shuffledOptions[1] }}</span>
          </div>
          
          <div @click="selected(answerC)" class="bg-emerald-300 p-5 rounded-lg w-full hover:bg-emerald-100  hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-emerald-400 text-emerald-800 px-3 rounded-full shadow-md">C</span>
            <span ref="answerC" class="ml-5 text-emerald-900 tracking-wide">{{ shuffledOptions[2] }}</span>
          </div>
          
          <div @click="selected(answerD)" class="bg-red-300 p-5 rounded-lg w-full hover:bg-red-100 hover:scale-105 hover:duration-200 cursor-pointer">
            <span class="bg-red-400 text-red-800 px-3 rounded-full shadow-md">D</span>
            <span ref="answerD" class="ml-5 text-red-900 tracking-wide"> {{shuffledOptions[3] }}</span>
          </div>
          
        </div>
        
      </section>
      
    </section>

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

/* Dots loading */
.dotsLoading {
  width: fit-content;
  font-family: monospace;
  clip-path: inset(0 3ch 0 0);
  animation: l4 1.3s steps(4) infinite;
  content:"..."
}
@keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}

@media (max-height: 840px) {
  
  .bgQuestions { 
    height: 100vh;
  }
}

</style>

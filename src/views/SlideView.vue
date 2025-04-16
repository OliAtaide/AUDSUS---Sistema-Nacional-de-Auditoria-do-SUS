<script setup>
import NavButtons from "@/components/NavButtons.vue";
import NotFound from "@/components/NotFound.vue";
import SlideFive from "@/slides/SlideFive.vue";
import SlideFour from "@/slides/SlideFour.vue";
import SlideLast from "@/slides/SlideLast.vue";
import SlideOne from "@/slides/SlideOne.vue";
import SlideSeven from "@/slides/SlideSeven.vue";
import SlideSix from "@/slides/SlideSix.vue";
import SlideThree from "@/slides/SlideThree.vue";
import SlideTwo from "@/slides/SlideTwo.vue";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
var id = route.params.id;

const isMounted = ref(false);
const isComplete = ref(false);
const comp = ref(NotFound);

const next = ref(false);
const prev = ref(false);

const slides = [
  SlideOne,
  SlideTwo,
  SlideThree,
  SlideFour,
  SlideFive,
  SlideSix,
  SlideSeven,
  SlideLast,
];

const titles = [
  "Dados Básicos",
  "Introdução",
  "Metodologia",
  "Constatação",
  "Evidência",
  "Fonte de evidência",
  "Responsável",
];

function getComp() {
  const idint = Number.parseInt(id) - 1;
  prev.value = idint > 0;

  next.value = Number.parseInt(id) < slides.length;
  comp.value = computed(() => {
    for (let i = 0; i < slides.length; i++) {
      if (i == idint) {
        return slides[i];
      }
    }

    return NotFound;
  });

  isMounted.value = true;
}

onMounted(() => {
  getComp();
});

watch(
  () => route.params.id,
  (newId) => {
    isMounted.value = false;
    isComplete.value = false;
    prev.value = false;
    next.value = false;
    id = newId;
    getComp();
  }
);
</script>

<template>
  <div class="card card-main">
    <div class="card-body">
      <ul class="nav">
        <li class="nav-item" v-for="i in slides.length - 1" :key="i">
          <router-link
            :to="`${i}`"
            class="nav-link"
            :class="
              i < $route.params.id
                ? 'active'
                : i == $route.params.id
                ? 'current'
                : ''
            "
            aria-current="page"
          >
            <div class="number">
              <i v-if="i < $route.params.id" class="bi bi-check"></i>
              <span v-else>
                {{ i }}
              </span>
            </div>
            {{ titles[i - 1] }}
          </router-link>
        </li>
      </ul>
      <div :if="isMounted.value" class="container main p-3">
        <component :if="comp.value" :is="comp.value" />
      </div>
    </div>
  </div>
  <NavButtons
    :id="Number.parseInt($route.params.id)"
    :prev="prev"
    :next="next"
  ></NavButtons>
</template>

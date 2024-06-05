<script setup lang="ts">
import { randomUUID } from 'uncrypto'

const state = useSharedState<{ [key: string]: { x: number, y: number } }>()

const me = randomUUID()

function handleUpdate (event: TouchEvent | MouseEvent) {
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY

  if (clientX && clientY) {
    state.value[me] = { x: clientX, y: clientY }
  }
}
</script>

<template>
  <div @mousemove.passive="handleUpdate" @touchstart.passive="handleUpdate" @touchend="handleUpdate" @touchmove="handleUpdate">
    <svg><defs><symbol viewBox="0 0 24 24" id="mage-mouse-pointer"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.4" d="m6.244 3.114l12.298 8.66A.693.693 0 0 1 18.346 13l-4.62.877a.565.565 0 0 0-.334.82l2.31 4.377a.693.693 0 0 1-.22.981l-1.663.866a.693.693 0 0 1-.935-.289l-2.31-4.387a.577.577 0 0 0-.866-.232L6.325 19.27a.692.692 0 0 1-1.155-.554V3.703a.693.693 0 0 1 1.074-.589"></path></symbol></defs></svg>
    <svg v-for="{ x, y }, id in state" height="24" width="24" :style="{ color: colorHash(id).hex, left: x, top: y }">
      <use xlink:href="#mage-mouse-pointer" />
    </svg>
  </div>
</template>

<style>
div {
  width: 100vw;
  height: 100vh;
}
svg {
  position: absolute;
}
</style>

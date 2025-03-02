<script setup>
import { ref } from 'vue'

defineProps({
    title: {
        type: String,
        required: true,
    },
})

const isHovered = ref(false)
</script>

<template>
    <div 
        class="relative group block p-2 h-full w-full" 
        @mouseenter="isHovered = true" 
        @mouseleave="isHovered = false"
    >
        <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-500 ease-in"
            enter-from-class="opacity-0 scale-95"
            enter-to-class="opacity-100 scale-100"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
        >
            <span 
                v-if="isHovered" 
                class="absolute inset-0 h-full w-full bg-purple-800/[0.4] block rounded-3xl z-10"
            ></span>
        </transition>

        <div
            class="rounded-2xl h-full w-full p-2 overflow-hidden bg-gray-800 border border-white/[0.2] group-hover:border-purple-700 relative z-20"
        >
            <div class="relative z-50">
                <div class="p-4">
                    <h4 class="text-zinc-100 font-bold tracking-wide mt-4">{{ title }}</h4>
                    <div class="mt-3 text-zinc-400 tracking-wide leading-relaxed text-sm">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

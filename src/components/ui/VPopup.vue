<script setup lang="ts">
defineProps<{
    isOpen: boolean
    title?: string
}>()

const emit = defineEmits(['close'])
</script>

<template>
    <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center bg-black/80 bg-opacity-50 z-50">
            <div class="bg-white rounded-lg shadow-lg w-1/2 p-5 relative">
                <div class="flex justify-between items-center border-b pb-2">
                    <h2 class="text-lg font-semibold">{{ title || 'Popup' }}</h2>
                    <button @click="emit('close')" class="text-gray-500 hover:text-gray-700">✖</button>
                </div>

                <div class="mt-4">
                    <slot />
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

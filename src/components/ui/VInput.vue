<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

interface InputFieldProps {
    modelValue: string
    label: string
    placeholder?: string
    type?: string
    error?: string
    required?: boolean
}

const props = defineProps<InputFieldProps>()
const emit = defineEmits(['update:modelValue'])

const inputClasses = computed(() => [
    'appearance-none relative block w-full px-3 py-3 border rounded-lg bg-gray-700 placeholder-gray-400 text-white',
    'focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300',
    props.error ? 'border-red-500' : 'border-gray-600',
])

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
    <div>
        <label :for="label" class="sr-only">{{ label }}</label>
        <input
            :id="label"
            :name="label"
            :type="props.type || 'text'"
            :placeholder="props.placeholder || label"
            :value="props.modelValue"
            :required="props.required"
            @input="handleInput"
            :class="inputClasses"
        />
        <p v-if="props.error" class="text-red-500 text-sm mt-1">{{ props.error }}</p>
    </div>
</template>

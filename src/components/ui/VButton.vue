<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
    type: {
        type: String as PropType<'button' | 'submit' | 'reset'>,
        default: 'button',
    },
    variant: {
        type: String as PropType<'primary' | 'secondary' | 'outline' | 'danger'>,
        default: 'primary',
    },
    size: {
        type: String as PropType<'sm' | 'md' | 'lg'>,
        default: 'md',
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
    icon: String,
    iconPosition: {
        type: String as PropType<'left' | 'right'>,
        default: 'left',
    },
    ariaLabel: String,
})

const emit = defineEmits(['click'])

const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

const variantClasses = computed(
    () =>
        ({
            primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
            secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
            outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-purple-500',
            danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
        }[props.variant])
)

const sizeClasses = computed(
    () =>
        ({
            sm: 'px-3 py-1.5 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        }[props.size])
)

const handleClick = (e: MouseEvent) => {
    if (!props.disabled && !props.loading) {
        emit('click', e)
    }
}
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :aria-label="ariaLabel"
        :class="[
            baseClasses,
            variantClasses,
            sizeClasses,
            {
                'opacity-50 cursor-not-allowed': disabled || loading,
                'cursor-wait': loading,
            },
        ]"
        @click="handleClick"
    >
        <span
            v-if="icon && !loading"
            class="material-icons"
            :class="{
                'mr-2': iconPosition === 'left' && $slots.default,
                'ml-2': iconPosition === 'right' && $slots.default,
            }"
        >
            {{ icon }}
        </span>

        <span v-if="$slots.default">
            <slot />
        </span>
    </button>
</template>

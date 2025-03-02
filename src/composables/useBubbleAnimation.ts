// composables/useBubbleAnimation.ts
import { ref, onMounted } from 'vue'

export function useBubbleAnimation(bubbleCount = 5) {
    const bubbles = ref<{ top: string, left: string, size: string, delay: string, duration: string }[]>([])

    const initializeBubbles = () => {
        bubbles.value = Array.from({ length: bubbleCount }).map(() => ({
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: `${100 + Math.random() * 150}px`,
            delay: `${Math.random() * 1}s`,
            duration: `${3 + Math.random() * 2}s`,
        }))
    }

    onMounted(initializeBubbles)

    return { bubbles }
}

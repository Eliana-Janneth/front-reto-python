<script setup>
import { ref, reactive } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useRegister, useBubbleAnimation } from '@composables'
import { notify } from '@kyvg/vue3-notification'
import { VInput } from '@components'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = reactive({
    username: '',
    password: '',
    confirmPassword: '',
    terms: '',
})

const router = useRouter()

const { register, user, loading, error } = useRegister()
const { bubbles } = useBubbleAnimation()

const handleSignUp = async () => {
    errors.username = ''
    errors.password = ''
    errors.confirmPassword = ''
    errors.terms = ''

    let isValid = true
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!username.value) {
        errors.username = 'Username is required'
        isValid = false
    } else if (!emailPattern.test(username.value)) {
        errors.username = 'Username must be a valid email address'
        isValid = false
    }

    if (!password.value) {
        errors.password = 'Password is required'
        isValid = false
    } else if (password.value.length < 6) {
        errors.password = 'Password must be at least 6 characters'
        isValid = false
    }

    if (!confirmPassword.value) {
        errors.confirmPassword = 'Please confirm your password'
        isValid = false
    } else if (confirmPassword.value !== password.value) {
        errors.confirmPassword = 'Passwords do not match'
        isValid = false
    }

    if (!isValid) return

    try {
        loading.value = true

        await register({ username: username.value, password: password.value })
        if (user) {
            router.push('/login')
            notify({
                title: `Account created successfully! Welcome, ${username.value}! 🎉`,
                type: 'success',
            })
        }
    } catch (error) {
        notify({
            title: `Sign up failed. Please try again.`,
            type: 'error',
        })
    } finally {
        loading.value = false
    }
}
</script>

<style>
@keyframes pulse {
    0%,
    100% {
        opacity: 0.2;
        transform: scale(1);
    }
    50% {
        opacity: 0.3;
        transform: scale(1.05);
    }
}

.animate-pulse {
    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden"
    >
        <div class="absolute inset-0 overflow-hidden">
            <div
                v-for="(bubble, index) in bubbles"
                :key="index"
                class="animate-pulse absolute rounded-full opacity-20 bg-purple-500"
                :style="{
                    width: bubble.size,
                    height: bubble.size,
                    top: bubble.top,
                    left: bubble.left,
                    animationDelay: bubble.delay,
                    animationDuration: bubble.duration,
                }"
            ></div>
        </div>

        <div
            class="w-full max-w-md p-8 space-y-8 bg-gray-800 bg-opacity-80 rounded-xl shadow-2xl backdrop-blur-sm relative z-10"
        >
            <div class="text-center">
                <h2 class="mt-6 text-3xl font-extrabold text-white">Create your account</h2>
            </div>
            <form class="mt-8 space-y-6" @submit.prevent="handleSignUp">
                <div class="rounded-md shadow-sm space-y-4">
                    <VInput
                        v-model="username"
                        label="Username"
                        placeholder="Enter your username"
                        :error="errors.username"
                        required
                    />
                    <VInput
                        v-model="password"
                        label="Password"
                        placeholder="Enter your password"
                        type="password"
                        :error="errors.password"
                        required
                    />
                    <VInput
                        v-model="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type="password"
                        :error="errors.password"
                        required
                    />
                </div>

                <p v-if="errors.terms" class="text-red-500 text-sm mt-1">{{ errors.terms }}</p>
                <div>
                    <button
                        type="submit"
                        :disabled="loading"
                        class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-300"
                    >
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg
                                v-if="!loading"
                                class="h-5 w-5 text-purple-400 group-hover:text-purple-300 transition-colors duration-300"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                            </svg>
                            <svg
                                v-else
                                class="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    class="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    stroke-width="4"
                                ></circle>
                                <path
                                    class="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                ></path>
                            </svg>
                        </span>
                        {{ loading ? 'Creating account...' : 'Sign up' }}
                    </button>
                </div>

                <div class="text-center mt-4">
                    <p class="text-sm text-gray-400">
                        Already have an account?
                        <router-link
                            to="/login"
                            class="font-medium text-purple-400 hover:text-purple-300 transition-colors duration-300"
                        >
                            Sign in
                        </router-link>
                    </p>
                </div>
            </form>
        </div>
    </div>
</template>

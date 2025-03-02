<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
    toggleSidebar: () => void
    sidebarOpen: boolean
    toggleProfileMenu: () => void
    profileMenuOpen: boolean
    profileDropdown: object
}>()

const router = useRouter()

const logout = () => {
    localStorage.clear()
    router.push('/login')
}
const username = localStorage.getItem('username') || 'John Doe'
const avatarUrl = localStorage.getItem('avatarUrl') || 'https://api.dicebear.com/9.x/fun-emoji/svg'

const usernameWithoutDomain = computed(() => {
    return username.split('@')[0] || username
})
</script>

<template>
    <header class="z-10 py-4 shadow-sm bg-gray-800 bg-opacity-80">
        <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
                <button @click="toggleSidebar" class="p-1 mr-4 rounded-md hover:bg-purple-700">
                    <span class="material-icons text-white">{{ sidebarOpen ? 'menu_open' : 'menu' }}</span>
                </button>
                <h2 class="text-xl font-semibold text-white">Vulnerabilities API</h2>
            </div>

            <div class="flex items-center space-x-4">
                <div class="relative" ref="profileDropdown">
                    <button @click="toggleProfileMenu" class="flex items-center space-x-2 focus:outline-none">
                        <img
                            class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                            :src="avatarUrl"
                            alt="User avatar"
                        />
                        <span class="hidden md:block text-sm font-medium text-white">{{ usernameWithoutDomain }}</span>
                        <span class="material-icons text-sm text-white">
                            {{ profileMenuOpen ? 'arrow_drop_up' : 'arrow_drop_down' }}
                        </span>
                    </button>

                    <div
                        v-if="profileMenuOpen"
                        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 transform origin-top-right transition-all duration-200 ease-in-out"
                        :class="{
                            'scale-100 opacity-100': profileMenuOpen,
                            'scale-95 opacity-0': !profileMenuOpen,
                        }"
                    >
                        <button
                            class="block px-4 py-2 text-sm w-full text-purple-800 hover:bg-purple-100 hover:text-purple-800 transition-colors duration-300"
                            @click="logout"
                        >
                            Log out!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

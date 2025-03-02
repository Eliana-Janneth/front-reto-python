<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Sidebar from './ui/VSidebar.vue'
import Navbar from './ui/VNavbar.vue'

const sidebarOpen = ref(true)
const profileMenuOpen = ref(false)
const profileDropdown = ref(null)

const menuItems = ref([
    { name: 'Vulnerabilities', icon: 'troubleshoot', path: '/vulnerabilities', active: true },
    { name: 'Vulnerabilities to fix', icon: 'pending', path: '/vulnerabilities-fixed', active: false },
    { name: 'Summary', icon: 'analytics', path: '/vulnerabilities-summary', active: false },

])

const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
}

const toggleProfileMenu = () => {
    profileMenuOpen.value = !profileMenuOpen.value
}

const handleClickOutside = (event) => {
    if (profileDropdown.value && !profileDropdown.value.contains(event.target)) {
        profileMenuOpen.value = false
    }
}

const checkScreenSize = () => {
    if (window.innerWidth < 1024) {
        sidebarOpen.value = false
    } else {
        sidebarOpen.value = true
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
    window.addEventListener('resize', checkScreenSize)
    checkScreenSize()
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
    window.removeEventListener('resize', checkScreenSize)
})
</script>

<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar :sidebarOpen="sidebarOpen" :toggleSidebar="toggleSidebar" :menuItems="menuItems" />

        <div
            v-if="sidebarOpen"
            @click="toggleSidebar"
            class="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden transition-opacity duration-300"
        ></div>

        <div class="flex-1 flex flex-col transition-all duration-300" :class="{ 'lg:ml-64': sidebarOpen }">
            <Navbar
                :toggleSidebar="toggleSidebar"
                :toggleProfileMenu="toggleProfileMenu"
                :profileMenuOpen="profileMenuOpen"
                :profileDropdown="profileDropdown"
                :sidebarOpen="sidebarOpen"
            />

            <main class="flex-1 overflow-y-auto p-6 bg-gray-500">
                <div class="max-w-7xl mx-auto">
                    <router-view />
                </div>
            </main>
        </div>
    </div>
</template>

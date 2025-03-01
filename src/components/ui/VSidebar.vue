<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface MenuItem {
    path: string
    icon: string
    name: string
    active: boolean
}

defineProps<{
    sidebarOpen: boolean
    toggleSidebar: () => void
    menuItems: MenuItem[]
}>()
</script>

<template>
    <div
        class="fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-all duration-300 ease-in-out"
        :class="{ '-translate-x-full': !sidebarOpen, 'translate-x-0': sidebarOpen }"
    >
        <div class="flex items-center justify-between h-16 px-4 border-b">
            <div class="flex items-center">
                <span class="text-xl font-semibold text-gray-800">Dashboard Vulnerailities</span>
            </div>
            <button @click="toggleSidebar" class="p-1 rounded-md hover:bg-gray-200 lg:hidden">
                <span class="material-icons">close</span>
            </button>
        </div>

        <nav class="mt-5 px-2">
            <div v-for="(item, index) in menuItems" :key="index" class="mb-2">
                <router-link
                    :to="item.path"
                    class="flex items-center px-4 py-3 text-gray-700 rounded-md transition-colors duration-200 hover:bg-blue-50 hover:text-blue-600"
                    :class="{ 'bg-blue-50 text-blue-600': item.active }"
                >
                    <span class="material-icons mr-3">{{ item.icon }}</span>
                    <span class="transition-opacity duration-200" :class="{ 'opacity-0': !sidebarOpen }">{{
                        item.name
                    }}</span>
                </router-link>
            </div>
        </nav>
    </div>
</template>

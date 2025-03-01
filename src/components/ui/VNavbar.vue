<script setup lang="ts">
defineProps<{
    toggleSidebar: () => void
    sidebarOpen: boolean    
    toggleProfileMenu: () => void
    profileMenuOpen: boolean
    profileDropdown: object
}>()
</script>

<template>
    <header class="z-10 py-4 bg-white shadow-sm">
        <div class="flex items-center justify-between px-4">
            <div class="flex items-center">
                <button @click="toggleSidebar" class="p-1 mr-4 rounded-md hover:bg-gray-200">
                    <span class="material-icons">{{ sidebarOpen ? 'menu_open' : 'menu' }}</span>
                </button>
                <h2 class="text-xl font-semibold text-gray-800">Welcome Back</h2>
            </div>

            <div class="flex items-center space-x-4">
                <button class="p-1 rounded-full hover:bg-gray-200 relative">
                    <span class="material-icons">notifications</span>
                    <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>

                <div class="relative" ref="profileDropdown">
                    <button @click="toggleProfileMenu" class="flex items-center space-x-2 focus:outline-none">
                        <img
                            class="w-8 h-8 rounded-full object-cover border-2 border-gray-200"
                            src="https://randomuser.me/api/portraits/men/1.jpg"
                            alt="User avatar"
                        />
                        <span class="hidden md:block text-sm font-medium text-gray-700">John Doe</span>
                        <span class="material-icons text-gray-600 text-sm">
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
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                        <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                    </div>
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import DotLoader from 'vue-spinner/src/DotLoader.vue'

export default {
    data() {
        return {
            isLoading: true,
            color: '#a918f2',
            size: '40px',
        };
    },
    components: {
        DotLoader
    },
};
</script>

<template>
    <div class="flex items-center justify-center h-full">
        <dot-loader :loading="isLoading" :color="color" :size="size"></dot-loader>
    </div>
</template>
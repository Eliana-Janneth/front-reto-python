<script setup lang="ts">
import { computed, ref } from 'vue'

interface Column {
    header: string
    key: string
    width?: string
    sortable?: boolean
    component?: any
}

interface Pagination {
    currentPage: number
    totalPages: number
}

const props = defineProps<{
    columns: Column[]
    data: any[]
    loading?: boolean
    error?: string
    pagination?: Pagination | null
}>()

const emit = defineEmits(['row-click', 'page-change', 'action'])

const handleAction = (action: string, item: any) => {
    emit('action', { action, data: item })
}

const sortColumn = ref<string | null>(null)
const sortDirection = ref<'asc' | 'desc'>('asc')

const sortedData = computed(() => {
    if (!sortColumn.value) return props.data
    return [...props.data].sort((a, b) => {
        const valA = sortColumn.value ? a[sortColumn.value] : ''
        const valB = sortColumn.value ? b[sortColumn.value] : ''

        if (valA < valB) return sortDirection.value === 'asc' ? -1 : 1
        if (valA > valB) return sortDirection.value === 'asc' ? 1 : -1
        return 0
    })
})

const sortData = (key: string) => {
    if (sortColumn.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
    } else {
        sortColumn.value = key
        sortDirection.value = 'asc'
    }
}

const paginatedData = computed(() => {
    if (!props.pagination) return sortedData.value

    const start = (props.pagination.currentPage - 1) * 10
    const end = start + 10
    return sortedData.value.slice(start, end)
})

</script>
<template>
    <div class="relative overflow-x-auto rounded-lg shadow-sm">
        <div v-if="loading" class="p-4 text-center text-gray-500">Cargando datos...</div>

        <div v-else-if="error" class="p-4 text-center text-red-500">
            {{ error }}
        </div>

        <div v-else-if="!data?.length" class="p-4 text-center text-gray-500">No se encontraron registros</div>

        <table v-else class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th
                        v-for="(column, index) in columns"
                        :key="index"
                        scope="col"
                        class="px-6 py-3"
                        :style="{ width: column.width ? column.width : 'auto' }"
                    >
                        <div class="flex items-center gap-1">
                            <span>{{ column.header }}</span>
                            <button
                                v-if="column.sortable"
                                @click="sortData(column.key)"
                                class="p-1 hover:bg-gray-200 rounded"
                            >
                                ↗️
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
    <tr
        v-for="(item, rowIndex) in paginatedData"
        :key="rowIndex"
        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        @click="emit('row-click', item)"
    >
        <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4">
            <slot
                v-if="column.component || $slots[column.key]"
                :name="column.key"
                :row="item"
                :action="handleAction"
            >
                <component
                    v-if="column.component"
                    :is="column.component"
                    :row="item"
                    @action="(action: string) => handleAction(action, item)"
                />
            </slot>
            <span v-else>
                {{ item[column.key] }}
            </span>
        </td>
    </tr>
</tbody>

        </table>

        <!-- Paginación -->
        <div
            v-if="pagination && pagination.totalPages > 1"
            class="flex items-center justify-between px-4 py-3 bg-white"
        >
            <div class="text-sm text-gray-700">
                Página {{ pagination?.currentPage || 1 }} de {{ pagination?.totalPages || 1 }}
            </div>
            <div class="flex gap-2">
                <button
                    @click="emit('page-change', pagination.currentPage - 1)"
                    :disabled="pagination.currentPage <= 1"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                    Anterior
                </button>
                <button
                    @click="emit('page-change', pagination.currentPage + 1)"
                    :disabled="pagination.currentPage >= pagination.totalPages"
                    class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 disabled:opacity-50"
                >
                    Siguiente
                </button>
            </div>
        </div>
    </div>
</template>

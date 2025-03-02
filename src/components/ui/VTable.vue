<script setup lang="ts">
import { computed, ref } from 'vue'
import { VSpinner } from '@components'

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
    <div class="relative overflow-x-auto rounded-lg shadow-md bg-gray-800">
        <div v-if="loading" class="p-8 text-center text-white">
            <VSpinner />
        </div>

        <div v-else-if="error" class="p-8 text-center text-red-500">
            {{ error }}
        </div>

        <div v-else-if="!data?.length" class="p-8 text-center text-gray-400">No records found</div>

        <table v-else class="w-full text-sm text-left text-gray-300">
            <thead class="text-xs uppercase bg-gray-700 text-gray-300">
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
                                class="p-1 hover:bg-gray-600 rounded transition-colors duration-200"
                            >
                                <svg
                                    class="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                                    ></path>
                                </svg>
                            </button>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr
                    v-for="(item, rowIndex) in paginatedData"
                    :key="rowIndex"
                    class="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
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
                                @action="(action) => handleAction(action, item)"
                            />
                        </slot>
                        <span v-else>
                            {{ item[column.key] }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>

        <div
            v-if="pagination && pagination.totalPages > 1"
            class="flex items-center justify-between px-4 py-3 bg-gray-800 border-t border-gray-700"
        >
            <div class="text-xs text-gray-400">
                Page {{ pagination?.currentPage || 1 }} of {{ pagination?.totalPages || 1 }}
            </div>
            <div class="flex gap-2 text-sm">
                <button
                    @click="emit('page-change', pagination.currentPage - 1)"
                    :disabled="pagination.currentPage <= 1"
                    class="px-4 py-2 text-gray-300 bg-gray-700 rounded gap-1 hover:bg-gray-600 disabled:opacity-50 transition-colors duration-200 flex items-center"
                >
                <span class="material-icons" style="font-size: 14px;"> arrow_back_ios </span>

                    Previous
                </button>
                <button
                    @click="emit('page-change', pagination.currentPage + 1)"
                    :disabled="pagination.currentPage >= pagination.totalPages"
                    class="px-4 py-2 text-gray-300 bg-gray-700 rounded hover:bg-gray-600 gap-1 disabled:opacity-50 transition-colors duration-200 flex items-center"
                >
                    Next
                    <span class="material-icons" style="font-size: 14px;"> arrow_forward_ios </span>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Lunar, Solar } from 'lunar-typescript';
import { ref } from 'vue';

const searchContent = ref<string>();
const dateRange = ref<[]>();

const columns = [
    {
        title: '日期',
        dataIndex: 'solar',
        key: 'solar',
    },
    {
        title: '农历',
        dataIndex: 'lunar',
        key: 'lunar',
    },
    {
        title: '节日',
        dataIndex: 'festival',
        key: 'festival',
    },
    {
        title: '详情',
        dataIndex: 'fullStr',
        key: 'fullStr',
    },
]

const dateList = ref<{
    solar: string,
    lunar: string,
    festival: string,
    fullStr: string
}[]>([])

function onSearch() {
    dateList.value = []
    if (!dateRange.value) {
        throw Error("先选择日期！")
    }
    const dateRangeValues = dateRange.value.values()
    const startDate: Date = dateRangeValues.next().value.toDate()
    const endDate: Date = dateRangeValues.next().value.toDate()

    let tempDate = new Date(startDate)
    while (tempDate <= endDate) {
        const solar = Solar.fromDate(tempDate);
        const lunar = solar.getLunar()
        const fullLunarStr = lunar.toFullString()
        if (fullLunarStr.includes(searchContent.value ?? "")) {
            dateList.value.push(
                {
                    solar: solar.toString(),
                    lunar: lunar.toString(),
                    festival: lunar.getFestivals().join(","),
                    fullStr: fullLunarStr
                })
        }
        tempDate.setDate(tempDate.getDate() + 1)
    }
}

</script>
<template>
    <div class="search-page">
        <a-row class="search-filter">
            <a-space>
                <a-range-picker v-model:value="dateRange" />

                <a-input-search v-model:value="searchContent" placeholder="搜索内容" style="width: 200px" @search="onSearch" />

            </a-space>
        </a-row>
        <a-row>
            <a-table class="search-list" :columns="columns" :data-source="dateList"></a-table>
        </a-row>
    </div>
</template>
<style lang="less" scoped>
.search-page {
    position: absolute;
    margin: 30px 15%;
    margin-top: 70px;
    padding: 20px;
    width: 70%;
}

.search-filter {
    right: 0%;
    width: 100%;
    margin: 10px;
}

.search-list {
    width: 100%;
}
</style>


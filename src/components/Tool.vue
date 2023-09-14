<script lang="ts" setup>
import { ref, watch } from 'vue';
import { SettingOutlined, CloudDownloadOutlined } from '@ant-design/icons-vue';
import { createEvents } from "ics";
import FileSaver from 'file-saver';
import { Solar } from "lunar-typescript"


const settingOpen = ref(false);
const year = ref(new Date().getFullYear());
const plainOptions = ref(['农历', '节日'])
const checkedList = ref(['农历', '节日']);

function openSettingPage() {
    settingOpen.value = true
}

function saveSetting() {
    settingOpen.value = false
}

function exportICS() {
    let exportValue = []
    const startDate = new Date(year.value, 0, 1)
    const endDate = new Date(year.value, 11, 31)
    let tempDate = new Date(startDate)
    while (tempDate <= endDate) {
        const solar = Solar.fromDate(tempDate);
        const lunar = solar.getLunar()
        if (checkedList.value.includes("农历")) {
            exportValue.push({
            title: lunar.getMonth() + '月' + lunar.getDay(),
            start: [solar.getYear(), solar.getMonth(), solar.getDay(), 0, 0],
        });
        }
        if (checkedList.value.includes("节日") && lunar.getFestivals().length > 0) {
            exportValue.push({
                title: lunar.getFestivals().join(","),
                start: [solar.getYear(), solar.getMonth(), solar.getDay(), 0, 0],
            });
        }
        tempDate.setDate(tempDate.getDate() + 1)
    }

    createEvents(exportValue, (error, value) => {
        let blob = new Blob([value], { type: "text/plain;charset=utf-8" });
        FileSaver.saveAs(blob, new Date().toLocaleDateString() + ".ics");
        console.log(error);
    })
}

</script>
<template >
    <div class="tool-page">
        <a-card hoverable size="small" style="width: 200px">
            <template #cover>
                <img alt="example" src="/lunar.png" />
            </template>
            <template #actions>
                <setting-outlined key="setting" @click="openSettingPage">设置</setting-outlined>
                <CloudDownloadOutlined @click="exportICS">导出</CloudDownloadOutlined>
            </template>
            <a-card-meta title="导出日历" description="导出ics日历文件" style="font-size: 8px;">
                <template #avatar>
                    <a-avatar src="/export.png" />
                </template>
            </a-card-meta>
        </a-card>

        <a-modal ref="modalRef" v-model:open="settingOpen" :wrap-style="{ overflow: 'hidden' }" @ok="saveSetting">
            <a-form>
                <a-form-item label="年份">
                    <a-input v-model:value="year" />
                </a-form-item>
                <a-form-item label="类型">
                    <a-checkbox-group v-model:value="checkedList" :options="plainOptions" />
                </a-form-item>
            </a-form>
            <template #title>
                <div ref="modalTitleRef" style="width: 100%; cursor: move">设置</div>
            </template>
        </a-modal>
    </div>
</template>

<style>
.tool-page {
    position: absolute;
    margin: 30px 15%;
    margin-top: 70px;
    padding: 20px;
    width: 70%;
}
</style>
  
  
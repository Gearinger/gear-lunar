<script setup lang="ts">
import { computed, ref } from 'vue';
import { Dayjs } from 'dayjs';
import CalendarItem from './CalendarItem.vue';
import { Solar, Lunar, LunarUtil } from 'lunar-typescript';

const value = ref<Dayjs>();

const dateDetailOpen = ref(false);
const selectDate = ref<Lunar>();

const dateDetailTitle = computed(() => selectDate?.value?.getSolar().toString())

const dateDetailStr = computed(
    () => (selectDate?.value?.getMonthInChinese() ?? "") + "月" + selectDate?.value?.getDayInChinese()
)

const yi = computed(() => selectDate?.value?.getDayYi())
const ji = computed(() => selectDate?.value?.getDayJi())

function selectDateHandle(date: Dayjs) {
    selectDate.value = Solar.fromDate(date.toDate()).getLunar();

    dateDetailOpen.value = true;
}

function afterOpenChange() {

}

</script>

<template>
    <a-watermark class="lunar-body" content="Gear - 黄历" :font="{ color: 'rgba(200,10,10,0.08)' }">
        <a-row>
            <a-calendar class="canlendar" v-model:value="value" @select="selectDateHandle">
                <template #dateCellRender="{ current }">
                    <CalendarItem :date="current.toDate()">

                    </CalendarItem>
                </template>
            </a-calendar>
        </a-row>

        <a-drawer class="date-detail" v-model:open="dateDetailOpen" width="450" root-class-name="root-class-name"
            :root-style="{ color: 'blue' }" style="color: rgba(240,180,0, 1)" :title="dateDetailTitle" placement="right"
            @after-open-change="afterOpenChange">
            <a-row>
                <a-col span="16">
                    <a-row style="border:thin dashed; padding: 10px;">
                        <a-col span="12">宜</a-col>
                        <a-col span="12">忌</a-col>
                    </a-row>
                    <a-row>
                        <a-col span="12" class="date-detail-yi">
                            {{ yi?.join("、") }}
                        </a-col>
                        <a-col span="12" class="date-detail-ji">
                            {{ ji?.join("、") }} </a-col>
                    </a-row>
                </a-col>
                <a-col class="date-detail-num" span="8">
                    <span style="font-size: 38px;">
                        {{ dateDetailStr }}
                    </span>
                    <div style="font-size:8px;">
                        {{ selectDate?.getYearInGanZhi() + "年·"
                            + selectDate?.getMonthInGanZhi() + "月·"
                            + selectDate?.getDayInGanZhi() + "日" }}
                    </div>
                </a-col>
            </a-row>
            <a-row>
                <a-col span="8">
                    <a-row class="grid-item" style="height: 80px;border: thin dashed;">
                        <div>胎神</div>
                        {{ selectDate?.getDayPositionTai() }}
                    </a-row>
                    <a-row class="grid-item" style="height: 80px;border: thin dashed;">
                        星宿
                        {{ (selectDate?.getXiu() ?? "") + selectDate?.getXiuLuck() }}
                    </a-row>
                </a-col>
                <a-col class="grid-item" span="8" style="border-top: thin dashed;">
                    <div>彭祖</div>
                    {{ (selectDate?.getPengZuGan() ?? "") + selectDate?.getPengZuZhi() }}
                </a-col>
                <a-col span="8">
                    <a-row class="grid-item" style="height: 80px;border: thin dashed;">
                        <div>五行</div>
                        {{ selectDate?.getBaZiWuXing().join("、") }}
                    </a-row>
                    <a-row class="grid-item" style="height: 80px;border: thin dashed;">
                        <div>冲煞</div>
                        <div>{{ selectDate?.getChongDesc() }}</div>
                        <div>煞{{ selectDate?.getDaySha() }}</div>
                    </a-row>
                </a-col>
            </a-row>
            <a-row>
                <a-col class="date-detail-shichen" span="2" v-for="i in 12">
                    {{ LunarUtil.convertTime(((i - 1) * 2).toString().padStart(2, "0") + ":00") +
                        Lunar.fromYmdHms(selectDate?.getYear() ?? 0, selectDate?.getMonth() ?? 0, selectDate?.getDay() ?? 0,
                            i, 0, 0).getTimeTianShenLuck() }}
                </a-col>
            </a-row>
        </a-drawer>

    </a-watermark>
</template>

<style>
.lunar-body {
    margin: 30px 15%;
    margin-top: 70px;
}

.canlendar {
    top: 60px;
}

.date-detail {
    justify-content: center;
    text-align: center;
    padding: 5px;
}

.date-detail-yi {
    writing-mode: vertical-lr;
    border-right: thin dashed;
    border-left: thin dashed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    max-height: 300px;
}

.date-detail-ji {
    color: rgba(100, 100, 100, 0.5);
    writing-mode: vertical-lr;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 10px;
    max-height: 300px;
}

.date-detail-num {
    letter-spacing: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    writing-mode: vertical-lr;
    border-right: thin dashed;
    border-top: thin dashed;
    border-left: thin dashed;
}

.date-detail-shichen {
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 5px;
    height: 60px;
    border: thin dashed;
    writing-mode: vertical-lr;
}

.grid-item {
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    min-height: 100px;
    height: 200px;
}
</style>
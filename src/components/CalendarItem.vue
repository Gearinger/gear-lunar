<script setup lang="ts">
import { Solar } from 'lunar-typescript';
import { computed } from 'vue';

const prop = defineProps<{
    date: any
}>()


const lunar = computed(() => Solar.fromDate(prop.date).getLunar())

const dayTianShen = computed(() => lunar.value.getDayTianShen())
const dayTianShenLuck = computed(() => lunar.value.getDayTianShenLuck())

const month = computed(() => lunar.value.getMonthInChinese())
const day = computed(() => lunar.value.getDayInChinese())



const festivals = computed(() => lunar.value.getFestivals())
const otherFestivals = computed(() => lunar.value.getOtherFestivals())

</script>
<template>
    <div class="calendar-item">
        <span class="item-lunar-str">{{ month + "月" + day }}</span>
        <span :style="dayTianShenLuck == '凶' ? 'color:red' : 'color:green'">
            ({{ dayTianShenLuck }})
        </span>
        <div class="calendar-item-festival" v-show="festivals.length" v-for="festival in festivals">{{ festival }}</div>
        <div class="calendar-item-other-festival" v-show="otherFestivals.length" v-for="festival in otherFestivals">{{ festival }}</div>
    </div>
</template>
<style lang="less">
.calendar-item {
    color: rgb(15, 15, 18);
    opacity: 0.5;
    font-size: 6px;
    overflow: hidden;
    overflow-y: hidden;
    overflow-x: hidden;
}

.calendar-item-yi {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.calendar-item-ji {
    white-space: nowrap;
    text-overflow: ellipsis;
    width: 100%;
}

.calendar-item-festival{
    color: rgb(200, 60, 0);
}


</style>


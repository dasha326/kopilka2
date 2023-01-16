<template>
    <v-sheet
        :rounded="true"
        class="number-card d-flex"
        :color="color"
        @click="$emit('click', number)"
    >
        <div class="cards-list-card__title">{{number}}</div>
    </v-sheet>
</template>

<script>
    export default {
        name: "NumberCard",
        props: {
            color: String,
            number: Number
        }
    }
</script>

<style scoped>
    .number-card{
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1/1;
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
    }
</style>
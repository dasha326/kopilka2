<template>
    <v-form ref="form" lazy-validation>
        <v-text-field name="login" label="Логин" required />
        <v-text-field name="email" label="E-mail" required />
        <v-text-field name="password" label="Пороль" type="password" required/>
        <v-text-field name="password-repeat" label="Повторить пороль" type="password" required/>
        <h4>Дополнительная информация</h4>
        <v-text-field name="name" label="Ваше имя" />
        <v-text-field name="question" label="Как к вам обращаться" />
        <v-text-field name="birth" label="Дата рождения" />
        <v-btn color="purple" class="mr-4">Зарегистрироваться</v-btn>
    </v-form>
</template>

<script>
    export default {};
</script>
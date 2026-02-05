<template>
  <div class="container-login">
    <div class="container-login__group">
      <aside class="container-login__group__banner">
        <h1 class="container-login__group__banner__title">
          Bem-vindo(a)! 👋
        </h1>
        <p class="container-login__group__banner__text">
          Por favor, faça seu login para começar uma aventura na Área do Cliente
        </p>
      </aside>

      <form class="container-login__group__form" @submit.prevent="onSubmit">
        <img class="logo-ongold" src="" alt="" />

         <img
              className="logo-ongold"
              src="../.././assets/image/logo_ongold.webp"
              alt=""
            />

        <!-- Campo E-mail -->
        <label class="container-login__group__form__label">
          <span>E-mail de usuário</span>

          <input class="container-login__group__form__label__input" type="text" placeholder="Ex.: joaogomes@gmail.com"
            required name="email" id="email" v-model="form.email" @blur="touched.email = true" />

          <span v-if="touched.email && errors.email" class="error-message">
            {{ errors.email }}
          </span>
        </label>

        <!-- Campo Senha -->
        <label class="container-login__group__form__label">
          <span>Senha</span>

          <div class="password-field">
            <input class="container-login__group__form__label__input" :type="isPasswordVisible ? 'text' : 'password'"
              name="password" id="password" required autocomplete="on" maxlength="20" v-model="form.password"
              @blur="touched.password = true" />

            <button type="button" class="password-toggle-btn" @click="togglePasswordVisibility"
              :aria-label="isPasswordVisible ? 'Esconder senha' : 'Mostrar senha'">
              <i :class="isPasswordVisible ? 'bi bi-eye' : 'bi bi-eye-slash'"></i>
            </button>
          </div>

          <span v-if="touched.password && errors.password" class="error-message">
            {{ errors.password }}
          </span>
        </label>

        <button type="button" class="container-login__group__form__link" @click="handleSolicitarRecuperacao">
          Esqueceu sua senha?
        </button>

        <input class="container-login__group__form__button-submit" type="submit" value="Entrar"
          :disabled="!isValid || isLoading" />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useApi } from '../../hooks/useApi'
import { useRouter } from 'vue-router';
const router = useRouter()
// Estado do formulário
const form = reactive({
  email: '',
  password: ''
})

const touched = reactive({
  email: false,
  password: false
})

const isPasswordVisible = ref(false)
const isLoading = ref(false)

// Validação simples (raiz, clássica, funciona)
const errors = computed(() => {
  const e: Record<string, string> = {}

  if (!form.email) e.email = 'E-mail obrigatório'
  else if (!form.email.includes('@')) e.email = 'E-mail inválido'

  if (!form.password) e.password = 'Senha obrigatória'
  else if (form.password.length < 6) e.password = 'Mínimo 6 caracteres'

  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}

function handleSolicitarRecuperacao() {
  console.log('🔐 Solicitar recuperação de senha')
}

async function onSubmit() {
  try {
    const resonse = await useApi({
      endpoint: '/login',
      method: 'POST',
      body: form
    });
    if (resonse) {
      router.push('/');
    }
  } catch (error) {
    alert(error);
  }
}
</script>

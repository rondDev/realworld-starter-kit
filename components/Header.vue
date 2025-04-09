<script setup lang="ts">
let s = false;
const route = useRoute();
console.log(route.path);
useHead({
  title: 'Conduit',
  link: [
    { rel: 'stylesheet', href: 'https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic',
    },
    { rel: 'stylesheet', href: 'https://demo.productionready.io/main.css' },
  ],
});
</script>
<template>
  <nav class="navbar navbar-light" v-if="!s">
    <div class="container">
      <a class="navbar-brand" href="/">conduit</a>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <NuxtLink class="nav-link" :class="{ active: route.path === '/' }" href="/">Home</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{ active: route.path === '/login' }" href="/login">Sign in</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{ active: route.path === '/register' }" href="/register">Sign up</NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
  <nav class="navbar navbar-light" v-else="s">
    <div class="container">
      <NuxtLink class="navbar-brand" href="/">conduit</NuxtLink>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <!-- Add "active" class when you're on that page" -->
          <NuxtLink class="nav-link active" :class="{ active: route.path === '/' }" href="/">Home</NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{ active: route.path === '/editor' }" href="/editor"> <i
              class="ion-compose"></i>&nbsp;New Article </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{ active: route.path === '/settings' }" href="/settings"> <i
              class="ion-gear-a"></i>&nbsp;Settings </NuxtLink>
        </li>
        <li class="nav-item">
          <NuxtLink class="nav-link" :class="{ active: route.path.startsWith('/profile') }" href="/profile/eric-simons">
            <img src="" class="user-pic" />
            Eric Simons
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>

</template>

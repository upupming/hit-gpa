<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info" class="nav-background">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand class="mr-5" to="/"
        ><font-awesome-icon icon="home" /> 哈工大本科生 GPA
        计算器</b-navbar-brand
      >

      <!-- <b-collapse is-nav> for grouping and hiding navbar contents by a parent breakpoint. -->
      <b-collapse is-nav id="nav_collapse">
        <!-- Right aligned nav items -->
        <b-navbar-nav class="mr-auto">
          <b-nav-item-dropdown v-if="user" right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <font-awesome-icon icon="user" /> {{ user.username }}
            </template>
            <b-dropdown-item
              href="#"
              v-on:click="$store.dispatch('logout', 1000)"
              >退出登录</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-button
            class="mx-3"
            v-if="$route.path === '/'"
            variant="dark"
            @click="$store.dispatch('getGrade', { bvToast: $bvToast })"
          >
            <font-awesome-icon icon="sync" /> 同步成绩
          </b-button>
        </b-navbar-nav>

        <b-navbar-nav
          v-for="(navRoute, navRouteIndex) in navRoutes"
          v-bind:key="`navRoutes-${navRouteIndex}`"
        >
          <b-nav-item
            v-for="(navItem, navItemIndex) in navRoute"
            v-bind:key="`navItem-${navRouteIndex}-${navItemIndex}`"
            :active="$route.path === navItem.route"
            :to="navItem.route"
            ><font-awesome-icon :icon="navItem.icon" />
            {{ navItem.label }}</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      navRoutes: [
        // [
        //   {
        //     label: '资料管理',
        //     icon: 'book',
        //     route: '/materials'
        //   }
        // ]
      ]
    }
  },
  computed: {
    ...mapState(['user', 'gradeData'])
  }
}
</script>

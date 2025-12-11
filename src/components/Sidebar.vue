<template>
  <div
    id="kt_app_sidebar"
    class="app-sidebar flex-column"
    data-kt-drawer="true"
    data-kt-drawer-name="app-sidebar"
    data-kt-drawer-activate="{default: true, lg: false}"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="225px"
    data-kt-drawer-direction="start"
    data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
  >
    <!-- Logo -->
    <div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
      <a href="index.html">
        <img alt="Logo" src="/assets/media/logos/default-dark.svg" class="h-25px app-sidebar-logo-default" />
        <img alt="Logo" src="/assets/media/logos/default-small.svg" class="h-20px app-sidebar-logo-minimize" />
      </a>

      <div
        id="kt_app_sidebar_toggle"
        class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
        data-kt-toggle="true"
        data-kt-toggle-state="active"
        data-kt-toggle-target="body"
        data-kt-toggle-name="app-sidebar-minimize"
      >
        <i class="ki-duotone ki-black-left-line fs-3 rotate-180">
          <span class="path1"></span>
          <span class="path2"></span>
        </i>
      </div>
    </div>

    <!-- Sidebar menu -->
    <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
      <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper">
        <div
          id="kt_app_sidebar_menu_scroll"
          class="scroll-y my-5 mx-3"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
          data-kt-scroll-wrappers="#kt_app_sidebar_menu"
          data-kt-scroll-offset="5px"
          data-kt-scroll-save-state="true"
        >
          <div class="menu menu-column menu-rounded menu-sub-indention fw-semibold fs-6" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="false">
            <!-- Render menu from JSON -->
            <template v-for="(item, idx) in menu" :key="item.key || idx">
              <!-- Simple menu heading / separator -->
              <div v-if="item.type === 'heading'" class="menu-item pt-5">
                <div class="menu-content">
                  <span class="menu-heading fw-bold text-uppercase fs-7">{{ item.title }}</span>
                </div>
              </div>

              <!-- Single link -->
              <div v-else-if="!item.children" class="menu-item">
                <router-link
                  :to="item.to"
                  class="menu-link"
                  :class="isActive(item) ? 'active' : ''"
                >
                  <span class="menu-icon" v-if="item.icon" v-html="item.icon"></span>
                  <span class="menu-title">{{ item.title }}</span>
                </router-link>
              </div>

              <!-- Accordion with children -->
              <div
                v-else
                :class="['menu-item menu-accordion', isOpen(item) || isActiveAncestor(item) ? 'show' : '', isActiveAncestor(item) ? 'active' : '']"
                :data-kt-menu-trigger="'click'"
              >
                <span class="menu-link" @click.prevent="toggle(item)">
                  <span class="menu-icon" v-if="item.icon" v-html="item.icon"></span>
                  <span class="menu-title">{{ item.title }}</span>
                  <span class="menu-arrow"></span>
                </span>

                <div class="menu-sub menu-sub-accordion" :class="isOpen(item) || isActiveAncestor(item) ? 'show' : ''">
                  <div v-for="(child, cidx) in item.children" :key="child.key || cidx" class="menu-item">
                    <router-link :to="child.to" class="menu-link" :class="isActive(child) ? 'active' : ''">
                      <span class="menu-bullet"><span class="bullet bullet-dot"></span></span>
                      <span class="menu-title">{{ child.title }}</span>
                    </router-link>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

/**
 * MenuItem type
 * - to: router link target (string or named)
 * - key: optional unique key
 * - title: label
 * - icon: optional HTML string for icon (we render with v-html to keep current markup)
 * - children: optional array of MenuItem
 * - type: 'heading' for headings
 */
type MenuItem = {
  key?: string;
  title?: string;
  to?: any;
  icon?: string;
  children?: MenuItem[];
  type?: 'heading' | undefined;
};

// Example JSON menu (you can move this to a separate file e.g. /src/data/menu.ts or fetch from API)
const menu = ref<MenuItem[]>([
  {
    key: 'dashboard',
    title: 'Dashboard',
    to: { name: 'dashboard' },
    icon: `<i class="ki-duotone ki-calendar-8 fs-2"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span></i>`
  },
  {
    type: 'heading',
    title: 'Menu'
  },
  {
    key: 'master',
    title: 'Master',
    icon: `<i class="ki-duotone ki-address-book fs-2"><span class="path1"></span><span class="path2"></span><span class="path3"></span></i>`,
    children: [
      {
        key: 'master-user',
        title: 'User',
        to: { path: '/master/user', name: 'master-user' }
      }
    ]
  }
]);

// store of opened accordions (by key)
const openKeys = ref<Record<string, boolean>>({});

// helpers
function isActive(item: MenuItem) {
  const name = route.name?.toString();
  if (!name) return false;

  if (item.to && (typeof item.to === 'object' ? item.to.name : item.to) ) {
    const toName = typeof item.to === 'object' ? item.to.name : item.to;
    if (toName && toName === name) return true;
  }

  if (item.key && item.key === name) return true;

  return false;
}

function isActiveAncestor(item: MenuItem): boolean {
  if (!item.children) return false;
  return item.children.some((ch) => {
    if (isActive(ch)) return true;
    if (ch.children) {
      return ch.children.some((g) => isActive(g));
    }
    return false;
  });
}

function isOpen(item: MenuItem) {
  if (!item.key) return false;
  return !!openKeys.value[item.key];
}

function toggle(item: MenuItem) {
  if (!item.key) return;
  openKeys.value[item.key] = !openKeys.value[item.key];
}

watch(
  () => route.name,
  () => {
    menu.value.forEach((it) => {
      if (it.key && it.children) {
        openKeys.value[it.key] = isActiveAncestor(it);
      }
    });
  },
  { immediate: true }
);
</script>

<style scoped>
</style>

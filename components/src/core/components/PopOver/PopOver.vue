<template>
  <div class="oxd-pop-over">
    <div @click="togglePopOver" class="oxd-pop-over-button">
      <slot name="button"></slot>
    </div>
    <transition name="transition-fade-down">
      <div
        class="oxd-pop-over-content"
        v-if="isActive"
        v-click-outside="closePopOver"
        role="dialog"
        @keyup.esc="closePopOver"
        v-focus-trap
        v-dropdown-direction
        v-horizontal-direction
      >
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import {defineComponent, onBeforeUnmount, ref, watch} from 'vue';
import clickOutsideDirective from '../../../directives/click-outside';
import dropdownDirectionDirective from '../../../directives/dropdown-direction';
import popoverHorizontalDirectionDirectiveDirectionDirective from '../../../directives/popover-direction';
import focusTrapDirective from '../../../directives/focus-trap';

export default defineComponent({
  name: 'oxd-pop-over',

  directives: {
    'click-outside': clickOutsideDirective,
    'dropdown-direction': dropdownDirectionDirective,
    'horizontal-direction': popoverHorizontalDirectionDirectiveDirectionDirective,
    'focus-trap': focusTrapDirective,
  },

  props: {
    show: {
      type: Boolean,
      default: false,
    },
    persistent: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:show'],
  setup(props) {
    const isActive = ref<boolean>(props.show);

    const handleOutsideClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.oxd-pop-over')) {
        e.stopPropagation();
        e.preventDefault();
      }
    };

    const enableClickFreeze = () => {
      document.addEventListener('click', handleOutsideClick, true);
    };

    const disableClickFreeze = () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };

    const togglePopOver = () => {
      isActive.value = !isActive.value;
      props.persistent && isActive.value
        ? enableClickFreeze()
        : disableClickFreeze();
    };

    const closePopOver = (e: Event) => {
      if (!props.persistent && isActive.value) {
        isActive.value = false;
        disableClickFreeze();
        e.stopPropagation();
      }
    };

    watch(
      () => props.show,
      () => {
        togglePopOver();
      },
    );

    onBeforeUnmount(() => disableClickFreeze());

    return {
      isActive,
      togglePopOver,
      closePopOver,
    };
  },
});
</script>

<style src="./pop-over.scss" lang="scss" scoped></style>

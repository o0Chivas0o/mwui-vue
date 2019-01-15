import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'

Vue.component('w-icon', Icon);
Vue.component('w-button', Button);
Vue.component('w-button-group', ButtonGroup);

new Vue({
    el: '#app',
    data: {
        loading: false
    }
});

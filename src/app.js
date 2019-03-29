import Vue from "vue";
import Button from "./button";
import Icon from "./icon";
import ButtonGroup from "./button-group";
import Input from "./input";

Vue.component("w-icon", Icon);
Vue.component("w-button", Button);
Vue.component("w-button-group", ButtonGroup);
Vue.component("w-input", Input);

new Vue({
  el: "#app",
  data: {
    loading: false
  }
});

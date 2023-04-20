<template>
  <div>
    <div style="position: relative">
      <input
        autocomplete="off"
        style="position: relative"
        :type="inputType"
        :placeholder="placeholder"
        :class="classes"
        :name="name"
        v-model="password"
        v-on:input="$emit('input', $event.target.value)"
      />
      <a
        style="
          cursor: pointer;
          position: absolute;
          top: 50%;
          right: 7px;
          transform: translateY(-50%);
        "
        @click.prevent="togglePassword"
      >
        <svg
          :style="iconStyle"
          v-show="inputType === 'password'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M.2 10a11 11 0 0 1 19.6 0A11 11 0 0 1 .2 10zm9.8 4a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0-2a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"
          />
        </svg>

        <svg
          :style="iconStyle"
          v-show="inputType !== 'password'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M12.81 4.36l-1.77 1.78a4 4 0 0 0-4.9 4.9l-2.76 2.75C2.06 12.79.96 11.49.2 10a11 11 0 0 1 12.6-5.64zm3.8 1.85c1.33 1 2.43 2.3 3.2 3.79a11 11 0 0 1-12.62 5.64l1.77-1.78a4 4 0 0 0 4.9-4.9l2.76-2.75zm-.25-3.99l1.42 1.42L3.64 17.78l-1.42-1.42L16.36 2.22z"
          />
        </svg>
      </a>
    </div>
    <div v-show="!verified" style="margin-top: 0.5rem" :class="errorClasses">
      {{ failedValidationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: "InputPassword",

  props: {
    classes: {
      type: String,
      required: false,
    },
    errorClasses: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
    placeholder: {
      type: String,
      required: false,
    },
    failedValidationMessage: {
      type: String | Boolean,
      required: false,
      default: false,
    },
    validationRegex: {
      type: String | Boolean,
      required: false,
      default: false,
    },
    iconSize: {
      type: String,
      required: false,
      default: "1.25rem",
    },
    iconColor: {
      type: String,
      required: false,
      default: "#a0aec0",
    },
  },

  data() {
    return {
      inputType: "password",
      password: "",
    };
  },

  computed: {
    verified() {
      if (!this.password) return true;
      if (!this.validationRegex || !this.failedValidationMessage) return true;
      return this.checkPassword();
    },
    iconStyle() {
      return {
        height: this.iconSize,
        width: this.iconSize,
        color: this.iconColor,
        fill: "currentColor",
      };
    },
  },

  methods: {
    togglePassword() {
      this.inputType = this.inputType === "password" ? "text" : "password";
    },

    checkPassword() {
      let re = new RegExp(this.validationRegex, "g");
      return re.test(this.password);
    },
  },
};
</script>

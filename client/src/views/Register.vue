<template>
    <div class="col-md-12">
      <div class="card card-container">
        <img
          id="profile-img"
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          class="profile-img-card"
        />
        <form name="form" @submit.prevent="handleRegister">
          <div v-if="!successful">
            <div class="form-group">
              <label for="email">Email</label>
              <input
                v-model="user.email"
                v-validate="{ required:true, email:true, max:50 }"
                type="email"
                class="form-control"
                name="email"
              />
            </div>
            <div class="alert alert-danger" v-show="errors.has('email')">
              <div>{{errors.first('email')}}</div>
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                v-model="user.password"
                v-validate="{ required: true, min: 10, regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/ }"
                type="password"
                class="form-control"
                name="password"
                ref="password"
              />
            </div>
            <h6>Password requires 1 of each of the following:</h6>
            <ul>
              <li>Minimum of 10 characters</li>
              <li>Uppercase and lowercase letter</li>
              <li>Number</li>
              <li>Special character</li>
            </ul>
            <div class="form-group">
              <label for="password_confirmation">Confirm Password</label>
              <input
                v-validate="'confirmed:password'"
                type="password"
                class="form-control"
                name="password_confirmation"
                data-vv-as="password"
              />              
            </div>
            <div class="alert alert-danger" v-show="errors.has('password') || errors.has('password_confirmation')">
              <div v-if="errors.has('password')">
                {{ errors.first('password') }}
              </div>
              <div v-if="errors.has('password_confirmation')">
                {{ errors.first('password_confirmation') }}
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block">Sign Up</button>
            </div>
          </div>
        </form>
  
        <div
          v-if="message"
          class="alert"
          :class="successful ? 'alert-success' : 'alert-danger'"
        >{{message}}</div>
      </div>
    </div>
  </template>
  
  <script>
  import User from '../models/user';
  
  export default {
    name: 'RegisterPage',
    data() {
      return {
        user: new User('', ''),
        successful: false,
        message: '',
        dict: {
          custom: {
            password: {
              regex: 'Password requires 1 of each of the following: uppercase letter, lowercase letter, number, special character.'
            }
          }
        }
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    mounted() {
      if (this.loggedIn) {
        this.$router.push('/profile');
      }
    },
    methods: {
      handleRegister() {
        this.message = '';
        this.$validator.localize('en', this.dict)
        this.$validator.validateAll().then(isValid => {
          if (isValid) {
            this.$store.dispatch('auth/register', this.user).then(
              data => {
                this.message = data.message;
                this.successful = true;
              },
              error => {
                this.message =
                  (error.response && error.response.data) ||
                  error.message ||
                  error.toString();
                this.successful = false;
              }
            );
          }
        });
      }
    }
  };
  </script>
  
  <style scoped>
  label {
    display: block;
    margin-top: 10px;
  }
  
  .card-container.card {
    max-width: 350px !important;
    padding: 40px 40px;
  }
  
  .card {
    background-color: #f7f7f7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  }
  
  .profile-img-card {
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
  }
  </style>
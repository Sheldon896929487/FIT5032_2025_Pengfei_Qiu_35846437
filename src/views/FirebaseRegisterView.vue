<template>
   <h1>Create an Account</h1>
   <p><input type="text" placeholder="Email" v-model = "email" /></p>
   <p><input type="password" placeholder="Password" v-model="password" /> </p>
   <p>
     <select v-model="role">
       <option value="user">User</option>
       <option value="admin">Admin</option>
       <option value="guest">Guest</option>
     </select>
   </p>
   <p> <button @click="register">Save to Firebase </button></p>
 </template>

 <script setup>
import { ref } from 'vue';
import {getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth"
import {useRouter} from "vue-router"
const email = ref("")
const password = ref("")
const role = ref("user")
const router = useRouter()
const auth = getAuth()

const register = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(()=>{
        console.log("Firebase Register Sucessful!")   
        // 保存角色到用户profile
        updateProfile(auth.currentUser, { displayName: role.value }).then(() => {
            console.log("角色已保存:", role.value)
        router.push("/FireLogin")
        })
    }).catch((error)=> {
        console.log(error.code);
    })
};
</script>
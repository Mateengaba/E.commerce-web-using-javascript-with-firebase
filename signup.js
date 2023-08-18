
// Import the functions you need from the SDKs you need
import {
    doc, setDoc
} from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { db, auth } from "./firebaseConfig.js";


const spinner = document.getElementById("spinner")




const signupBtn = document.querySelector("#signupBtn")
signupBtn.addEventListener("click", signUp)

async function signUp(e) {
    try {
        const firstName = document.getElementById("firstName").value
        const lastName = document.getElementById("lastName").value

        const phoneNumber = document.getElementById("phoneNumber").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        // const userType = document.getElementById("userType")


        if (!firstName || !phoneNumber || !email || !password) {
            alert("required field are missing")
            return
        }
        if (userType.selectedIndex === 0) {
            alert("please select user type")
            return
        }

        
        
        signupBtn.className = "spinner-dis-inline-block"
        signupBtn.innerHTML = ` <div class="spinner" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>`
        const userAuth = await createUserWithEmailAndPassword(auth, email, password)
        console.log(userAuth.user.uid)
        const uid = userAuth.user.uid
        const userObj = {
            firstName,
            phoneNumber,
            email,
            accountActivate: true,
            uid,
            // type: "admin"
            type: userType.value
        }

      
        const userRef = doc(db, "users", uid);
        const userDB = await setDoc(userRef, userObj)
        window.location.assign("./login.html")
    } catch (error) {
        console.log("error", error.message)
        alert(error.message)
        signupBtn.className = "btn btn-danger"
        signupBtn.innerHTML = `signup`
    }


}



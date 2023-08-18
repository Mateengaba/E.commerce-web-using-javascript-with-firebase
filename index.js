import { getFirestore, collection, addDoc,  getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { auth, db } from "./firebaseConfig.js";

import { ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


import { storage } from "./firebaseConfig.js"



window.addEventListener("load", getProduct)


const productCollection = collection(db, "product")
const productParent = document.getElementById("productParent")

async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        // console.log('doc', doc.data())
        const id = doc.id
        const productdata = doc.data()
        const itemCard =`
        <div class="col-4">
        <div class="card" style="width: 18rem;">
            <img src=${productdata.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productdata.name}</h5>
                <p class="card-text">${productdata.desc}</p>
                <h3 class="card-title">${productdata.price}</h3>

                <a class="btn btn-primary" onclick="getOrder('${id}')">order</a>
            </div>
        </div>
    </div>
        `
        productParent.innerHTML += itemCard

    })

}



async function getOrder (id){
    const uid = auth.currentUser.uid;
    // console.log('uid current user ======>', uid);
    const disheRef = doc(db, "product", id);
    const disheSnap = await getDoc(disheRef);

    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (disheSnap.exists() || userSnap.exists()) {
        console.log("dishe data kia hai", disheSnap.data());
        console.log("user data user kia hai", userSnap.data());
        const disheData = disheSnap.data();
        const userData = userSnap.data();


        const obj = {
            orderImage: productdata.imageUrl,
            orderName: productdata.name,
            orderPrice: productdata.price,
            // userName: userData.userName,
            userDesc: productdata.desc,
            // uid: disheData.userId,
            id,

        }
        console.log('obj ', obj);
        await addDoc(orderRef, obj)
        alert("your order placed successfully ", )


    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }


}

window.getOrder = getOrder;

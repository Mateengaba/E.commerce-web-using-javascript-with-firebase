import { getFirestore, collection, addDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

import { auth, db, doc, signOut ,storage } from "./firebaseConfig.js";

import { ref, uploadBytesResumable, getDownloadURL ,  } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-storage.js";


// import {  } from "./firebaseConfig.js"

const productCollection = collection(db, "product")
const ProductForm = document.getElementById("ProductForm")
ProductForm.addEventListener("submit", addproduct)
window.addEventListener("load", getProduct)
const productParent = document.getElementById("productParent")




async function getProduct() {
    console.log("getProduct")
    const getProduct = await getDocs(productCollection)
    getProduct.forEach(function (doc) {
        console.log('doc==========>', doc.data())
        const id = doc.id
        const productdata = doc.data()
        productParent.innerHTML += `
        <div class="col-4">
        <div class="card" style="width: 18rem;">
            <img src=${productdata.imageUrl} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${productdata.name}</h5>
                <p class="card-text">${productdata.desc}</p>
                <h3 class="card-title">${productdata.price}</h3>

                <a class="btn btn-primary" onclick="deletedata('${id}')">Delet</a>
            </div>
        </div>
    </div>
        `
    })

} 

// delete buttun funtion

const deletedata = async(id)=>{

    await deleteDoc(doc(db, "product", id));
}

window.deletedata = deletedata
//....



// logOut Acount

const logOutAcount = () => {
    signOut(auth).then(() => {
alert("logout successfuly")
        setTimeout(() => {
            window.location.replace('/index.html')
        }, 2000);

    }).catch((error) => {
        const errorMessage = error.message
        swal("Oops", errorMessage, "error")

    });
}
window.logOutAcount = logOutAcount;
//....


// addproduct

async function addproduct(e) {
    try {
        e.preventDefault()
        const productName = e.target.productName.value
        const productDesc = e.target.productDesc.value
        const productPrice = e.target.productPrice.value
        const productImage = e.target.productImage
        // console.log("productImage", productImage.files[0])

        const imageUrl = await uploadImage(productImage.files[0])

        const user = JSON.parse(localStorage.getItem("user"))
        const productObj = {
            name: productName,
            desc: productDesc,
            price: productPrice,
            userUid: user.uid,
            imageUrl: imageUrl.imageUrl
        }
        console.log("add", productObj)

        await addDoc(productCollection, productObj)
        alert("product added successfully")


    } catch (error) {
        alert(error.message)
    }


}
//....


//image upload

function uploadImage(file) {
    return new Promise(function (resolve, reject) {

        // Create the file metadata
        /** @type {any} */

        let imageUrl;
        const metadata = {
            contentType: 'image/jpeg'
        };

        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageRef = ref(storage, 'productImages/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on('state_changed',
            function (snapshot) {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },

            (error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                reject({
                    message: "something went wrong"
                })
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    resolve({
                        imageUrl: downloadURL
                    })
                });
            }
        );


    })
}








//....

// window.addproduct = addproduct
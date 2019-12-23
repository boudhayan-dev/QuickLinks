// Change the input fiel to file name
$('#pageImage').on('change', function (e) {
    let fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName);
})


async function makeRequest(url, config) {
    try {
        const response = await fetch(url, config);
        return {
            "status": response.status,
            "payload": await response.json()
        };
    }
    catch (error) {
        console.log(error);
        return {
            "status": null,
            "payload": error.message
        };
    }
}


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});




// This will asynchronously post new LINK request
$(".submitForm").submit(async function (oEvent) {
    oEvent.preventDefault()
    let errorMessage = document.getElementById("linkAddError");
    let link = document.getElementById("pageLink").value;
    let name = document.getElementById("pageName").value;
    let description = document.getElementById("pageDescription").value;
    let imageB64 = document.getElementById("pageImage").files[0];
    if (imageB64){
        imageB64 = await toBase64(imageB64);
    }
    else{
        imageB64="";
    }
    
    if (link.length > 0 && name.length > 0) {
        let payload = { link, name, description, imageB64 };
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        let response = await makeRequest("/add", config)
        if ("errorMessage" in response.payload) {
            errorMessage.innerText = response.payload.errorMessage
            return
    
        }
        location.reload()
    }
    else {
        errorMessage.innerText = "Please provide link details"
    }

})



// Delete a link
$(".deleteLink").click(async function(oEvent) {
    let link = this.name;
    let payload = { link };
    let config = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    }
    let response = await makeRequest("/deleteLink", config)
    if ("errorMessage" in response.payload) {
        console.log(response.payload.errorMessage)
        return

    }
    location.reload()
    
})



$(".deleteUserProfile").click(function () {
    console.log("Delete user profile")
})
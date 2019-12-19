$('#pageImage').on('change', function (e) {
    let fileName = e.target.files[0].name;
    $('.custom-file-label').html(fileName);
})



// const toBase64 = file => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
// });

async function makeRequest(url, config) {
    try {
        const response = await fetch(url, config);
        return {
            "status": response.status,
            "payload": (response.status == 200 ? "" : await response.json())
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



$(".submitForm").submit(async function (oEvent) {
    oEvent.preventDefault()
    let errorMessage = document.getElementById("error-message");
    errorMessage.style.visibility = "hidden";

    let link = document.getElementById("pageLink").value;
    let name = document.getElementById("pageName").value;
    let description = document.getElementById("pageDescription").value;
    let image = document.getElementById("pageImage").files[0];
    if(image){
        image = await toBase64(image);
    }
    else{
        image="";
    }
    
    if (link.length > 0 && name.length > 0) {
        let payload = { link, name, description, image };
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        let response = await makeRequest("/add", config)
        if (response.status == "200") {
            console.log("Successfully added new link")
            $('#addLinkModal').modal('hide')
    
        }
        else {
            errorMessage.style.visibility = "visible";
            console.log("There was an error adding new link")
        }

    }
    else {
        console.log("Please provide link and name")
    }

})


// async function Main() {
//     const file = document.querySelector('#myfile').files[0];
//     console.log(await toBase64(file));
// }
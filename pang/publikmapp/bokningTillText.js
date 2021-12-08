let saveFile = () => {
    	
    // Get the data from each element on the form.
    const datum = document.getElementById('txtDate');
    const antal = document.getElementById('txtAntal');
    const tid = document.getElementById('txtTid');
    const name = document.getElementById('txtName');
    const email = document.getElementById('txtEmail');
    const msg = document.getElementById('msg');
    
    // This variable stores all the data.
    let data = 
        '\r Datum: ' + datum.value + ' \r\n ' +
        'Antal: ' + antal.value + ' \r\n ' + 
        'Tid: ' + tid.value + ' \r\n ' + 
        'Email: ' + email.value + ' \r\n ' + 
        'Name:  '+ name.value +  ' \r\n ' + 
        'Message: ' + msg.value;
    
    // Convert the text to BLOB.
    const textToBLOB = new Blob([data], { type: 'text/plain' });
    const sFileName = 'formData.txt';	   // The file to save the data.

    let newLink = document.createElement("a");
    newLink.download = sFileName;

    if (window.webkitURL != null) {
        newLink.href = window.webkitURL.createObjectURL(textToBLOB);
    }
    else {
        newLink.href = window.URL.createObjectURL(textToBLOB);
        newLink.style.display = "none";
        document.body.appendChild(newLink);
    }

    newLink.click(); 
}// DETTA SKRIPT SKA SKICKA INFO TILL INDEX.JS EFTER VALIDERING, SEDAN FÅ TBX SVAR
// MED UPPDATERAD HEMSIDA.



//loads user's info to each coresponding parameter when user presses submit


window.addEventListener('load',function(){


    let payment = document.getElementById("payment")
    var payment_label = this.document.getElementById("payment_label")
    payment.onchange = function(){
       
        if(payment.value=="Paypal"){
            payment_label.innerHTML = "Paypal Id"
        }
        else{
            payment_label.innerHTML = "Credit Id"
        }
    }

//-----------------------Submit Button-------------------------------
    let submit_button = document.getElementById("submit_form_button")
submit_button.onclick = function(){
//-----------------------Προσωπικά Στοιχεία Χρήστη-------------------------------
    let name = document.getElementById("txt_name")    
    let email = document.getElementById('txt_email')
    let address = document.getElementById('txt_address')
    let date_of_birth = document.getElementById('date_of_birth')
    let year_check = new Date(date_of_birth.value)
    let current_year = new Date()
    if(current_year.getFullYear()-year_check.getFullYear()<18){
        // ||current_year.getMonth()<year_check.getMonth() || current_year.getDate()<year_check.getDate()
        date_of_birth.setCustomValidity("Θα πρέπει να είστε 18 χρονών και άνω για να κάνετε εγγραφή σε αυτή την ιστοσελίδα")
    }
    else if(current_year.getFullYear()-year_check.getFullYear()==18 ){
        if(current_year.getMonth()<year_check.getMonth()){
            date_of_birth.setCustomValidity("Θα πρέπει να είστε 18 χρονών και άνω για να κάνετε εγγραφή σε αυτή την ιστοσελίδα")
        }
        else if(current_year.getMonth()=year_check.getMonth()){
            if( current_year.getDate()<year_check.getDate()){
                date_of_birth.setCustomValidity("Θα πρέπει να είστε 18 χρονών και άνω για να κάνετε εγγραφή σε αυτή την ιστοσελίδα")
            }
            else{
                date_of_birth.setCustomValidity('')
            }
        }
        else{
            date_of_birth.setCustomValidity('')
        }
    }
    else if(Math.abs(current_year.getFullYear()-year_check.getFullYear())>100){
        date_of_birth.setCustomValidity("Παρακαλώ εκχωρήστε έγκυρη ημερομηνία γέννησης")
    }
    else{

        date_of_birth.setCustomValidity('')
    }
    let phone_number = document.getElementById('number_phone')

//-----------------------Στοιχεία Χρήστη Ιστοσελίδας-------------------------------
    let username = document.getElementById('txt_username')
    let password = document.getElementById('pword')
    let sec_password = document.getElementById('sec_pword')
    
    if(!( password.value === sec_password.value)){
        password.setCustomValidity("Οι κωδικοί δεν είναι ίδιοι")
    }
    else if(password.value==username.value){
        password.setCustomValidity("Το password δεν μπορεί να είναι το ίδιο με το username")
    }
    else{
        password.setCustomValidity('')
    }
    

    


   
    

}
})
 // Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyC9eBYFbzaEIEEz6b-AbdPm51sB2uw1iuU",
    authDomain: "poshtik-spit.firebaseapp.com",
    databaseURL: "https://poshtik-spit-default-rtdb.firebaseio.com",
    projectId: "poshtik-spit",
    storageBucket: "poshtik-spit.appspot.com",
    messagingSenderId: "960606229224",
    appId: "1:960606229224:web:537cd5afa859d96b1bef5d"
};
function validateform(){
    const name = document.querySelector("#form-name").value;
    const username = document.querySelector("#form-username").value;
    const gender = document.querySelector("#form-gender").value;
    console.log(name);
    if (name.trim() == "" || username.trim() == "" || gender == "") {
      alert("form not completely filled");
    } else {
      // writeToDatabase(name, username, gender);
      readOrders();

    }
  };

  function date_time(id)
          {
            date = new Date;
            year = date.getFullYear();
            month = date.getMonth();
            months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');
            d = date.getDate();
            day = date.getDay();
            days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
            h = date.getHours();
            if(h<10){
              h = "0"+h;
            }
            m = date.getMinutes();
            if(m<10){
              m = "0"+m;
            }
            s = date.getSeconds();
            if(s<10){
             s = "0"+s;
            }
            result = ''+days[day]+'<br>'+months[month]+' '+d+' '+year+'<br> '+h+':'+m+':'+s;
            document.getElementById(id).innerHTML = result;
            setTimeout('date_time("'+id+'");','1000');
            return true;
          }

  const writeToDatabase = (name, username, gender) => {
    firebase
      .database()
      .ref("Registration/" + Date.now())
      .set({
        name: name,
        user: username,
        gender: gender,
      });
  };

//   document.querySelector("#register").addEventListener("click", () => {
//     validateForm();
//   });

  const readFromDatabaseOn = (id) => {
    s="";
    firebase
      .database()
      .ref(id)
      .on("value", function (snapshot) {
        s +=snapshot.val().name+ "<br>";
        snapshot.val().user;
        snapshot.val().gender;
      });
  };

  const readFromDatabaseOnce = (id) => {
    firebase
      .database()
      .ref(id)
      .once("value", function (snapshot) {
        console.log(snapshot.val().name);
        console.log(snapshot.val().user);
        console.log(snapshot.val().gender);
      });
  };

  function get_user(id){
    s="<tr>";
    firebase
      .database()
      .ref("Users/"+id)
      .on("value", function (snapshot) {
        s +='<th scope="row">'+(snapshot.val().name)+ '</th>';
        s +='<td>'+(snapshot.val().email)+ '</td>';
        document.getElementById("res").innerHTML+=s;
        return;
      });
    
  }
  const readOrders = () => {
    firebase.database().ref("Food Order").on("value", function (snapshot) {
        snapshot.forEach(function (Order) {
          document.getElementById('res').innerHTML="";
          console.log(Order.key);
          firebase.database().ref("Users/"+Order.key).once("value", function (User) {
            var s="<tr>";
            s +='<th scope="row">'+(User.val().name)+ '</th>';
            s +='<td>'+(User.val().email)+ '</td>';
            s +='<td>'+(Order.val().Item)+ '</td>';
            s +='<td>₹'+(Order.val().Cost)+ '</td>';
            s+'</tr>';
            document.getElementById("res").innerHTML+=s;
          });
        });
      });
  };

  const updateUserDetails = (id, age) => {
    firebase
      .database()
      .ref("Registration/" + id)
      .update({
        age: age,
      });
  };

  const removeUserDetails = (id) => {
    firebase
      .database()
      .ref("Registration/" + id)
      .remove();
  };

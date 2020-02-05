        var EmpDetails=[];
        fetchUser();
    function fetchUser(){
        fetch("https://jsonplaceholder.typicode.com/users")
        .then(successResponse => {
            if (successResponse.status != 200) {
              return null;
            } else {
              return successResponse.json();
            }
          },
          failResponse => {
            return null;
          })
        .then((json) => {
            EmpDetails.push(json)
            EmpDetails=EmpDetails[0];
            Listitr(EmpDetails);
        })
    }

    function Listitr(userList){
        
        var list = "<thead><tr><th onclick='sortTable()'>Id</th><th>Name</th><th>Username</th><th>Email</th><th>Company</th><th>Edit/Delete</th></tr></thead>";
        for(i=0;i<userList.length;i++){
            list += `<tbody id = "emp"><tr> <td> ${userList[i].id} </td> <td> ${userList[i].name} </td> <td> ${userList[i].username} </td> <td> ${userList[i].email} </td> 
            <td> ${userList[i].company.name} </td> <td><button id = "edit-btn" onclick="editUserWindow(${userList[i].id})">Edit</button>&nbsp;&nbsp;<button id = "delete-btn" onclick = "deleteUser(${userList[i].id})">Delete</button> </td></tr></tbody>`;
        }
        
        document.getElementById("userTable").innerHTML = list;
        
    }
    function editUserWindow(id){
        document.getElementById("editDiv").style.display = 'block';
        document.getElementById("userTable").style.display = 'none';
        var UserDetailsEdit = EmpDetails[id-1]
        document.getElementById("id").value=UserDetailsEdit.id;
	    document.getElementById("name").value=UserDetailsEdit.name;
	    document.getElementById("userName").value=UserDetailsEdit.username;
	    document.getElementById("email").value=UserDetailsEdit.email;
	    document.getElementById("company").value=UserDetailsEdit.company.name;
    }
    function SaveUser(){
        var id = document.getElementById("id").value; 
        var obj2 = {name: document.getElementById("company").value};
        var obj = {
            id: document.getElementById("id").value,
            name: document.getElementById("name").value,
            username: document.getElementById("userName").value,
            email: document.getElementById("email").value,
            company: obj2   
        }
        EmpDetails[id-1] = obj; 
        console.log(EmpDetails);
        reload();
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
            method:`PUT`,
            body: JSON.stringify(obj)
        })
        .then(response=>response.json)
        .then(json=>console.log(json))
    }
    function deleteUser(id){
        fetch(`https://jsonplaceholder.typicode.com/users/${id-1}`, {
    	method: 'DELETE'   
        })
        EmpDetails.splice(id-1,1);
        document.getElementById("msg").style.display = 'block';
	    setTimeout(function(){document.getElementById("msg").style.display = 'none';},5000);
        Listitr(EmpDetails);
    }
    function reload(){
        document.getElementById("editDiv").style.display = 'none';
        document.getElementById("userTable").style.display = 'block';
        Listitr(EmpDetails);
    }

    function validateForm() {
        var editName = document.forms["editForm"]["name"].value;
        if (editName == "") {
          alert("Name must be filled out");
          return false;
          
        }

        var userName = document.forms["editForm"]["userName"].value;
        if (userName == "" || userName.length<8) {
          alert("Username should be more than 8 characters");
          return false;
          
        }

        var email = document.forms["editForm"]["email"].value;
        var atposition=email.indexOf("@");  
        var dotposition=email.lastIndexOf(".");  
        if (atposition<1 || dotposition<atposition+2 || dotposition+2>=email.length){  
            alert("Please enter a valid e-mail address \n atpostion:"+atposition+"\n dotposition:"+dotposition);  
        return false;  
        }  

        var company = document.forms["editForm"]["company"].value;
        if (company == "") {
          alert("Company Name should be entered");
          return false;
          
        }
        SaveUser();
      } 

      function sortTable() { 
        var table, i, first, second; 
        table = document.getElementById("userTable"); 
        var switching = true; 
        while (switching) { 
            switching = false; 
            var rows = table.rows; 
            for (i = 1; i < (rows.length - 1); i++) { 
                var Switch = false; 
                first = rows[i].getElementsByTagName("TD")[0]; 
                second = rows[i + 1].getElementsByTagName("TD")[0]; 
                if (first.innerHTML.toLowerCase() <= second.innerHTML.toLowerCase()) 
                    { 
                    Switch = true; 
                    break; 
                } 
            } 
            if (Switch) { 
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                switching = true; 
            } 
        } 
}

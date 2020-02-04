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
        var list = "<th>Id</th><th>Name</th><th>Username</th><th>Email</th><th>Company</th><th>Edit/Delete</th>";
        for(i=0;i<userList.length;i++){
            list += `<tr> <td> ${userList[i].id} </td> <td> ${userList[i].name} </td> <td> ${userList[i].username} </td> <td> ${userList[i].email} </td> 
            <td> ${userList[i].company.name} </td> <td><button class = "btn btn-primary" onclick="editUserWindow(${userList[i].id})">Edit</button>&nbsp;&nbsp;<button class="btn btn-danger" onclick = "deleteUser(${userList[i].id})">Delete</button> </td></tr>`;
        }
        document.getElementById("userTable").innerHTML = list;
        
    }
    function editUserWindow(id){
        document.getElementById("editDiv").style.display = 'block';
        document.getElementById("userTable").style.display = 'none';
        document.getElementById("id").value=id;
    }
    function editUser(){
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
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
    	method: 'DELETE'   
        })
        EmpDetails.shift();
        window.alert("Record Deleted Successfully")
        Listitr(EmpDetails);
    }
    function reload(){
        document.getElementById("editDiv").style.display = 'none';
        document.getElementById("userTable").style.display = 'block';
        Listitr(EmpDetails);
    }
    
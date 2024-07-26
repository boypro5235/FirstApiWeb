function display() {
    const requestOptions = {
    method: "GET",
    redirect: "follow"
    };

    fetch("http:localhost:7292/NhomHangHoa/GetList", requestOptions)
        .then((response) => response.json()) 
        .then((data) => {
            var tbody = document.querySelector("#itemList");
            tbody.innerHTML = displayitemList(data);
        })
        .catch((error) => console.error(error));

    const displayitemList = (items) => {
        var html = "";  
        items.forEach(function (item) {
            html += `
            <tr>
                <td>${item.nhhId}</td>
                <td>${item.nhhMa}</td>
                <td>${item.nhhTen}</td>
            </tr>`;
        });
        return html;
    };
}

const displayitemList = (items) => {
    var html = "";  
    items.forEach(function (item) {
        html += `
        <tr>
            <td>${item.nhhId}</td>
            <td>${item.nhhMa}</td>
            <td>${item.nhhTen}</td>
        </tr>`;
    });
    return html;
}

window.onload = () => {
    display()
}

//them
function additem() {
    
    var nhhId= document.getElementById('Nhhid').value;
    var nhhMa = document.getElementById('NhhMa').value;
    var nhhTen = document.getElementById('Nhhten').value;
   
    var data = {
        NhhId: nhhId,
        NhhMa: nhhMa,
        NhhTen: nhhTen
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
      
    fetch("url", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); 
        display(); 
    })
    .catch(error => console.error(error));

   
    document.getElementById('Nhhid').value = '';
    document.getElementById('NhhMa').value = '';
    document.getElementById('Nhhten').value = '';
    
}

//sua
function edititem() {
    var NhhId= document.getElementById('Nhhid').value;
    var Nhhma = document.getElementById('NhhMa').value;
    var NhhTen = document.getElementById('Nhhten').value;

    var data = {
        nhhId: NhhId,
        nhhMa: Nhhma,
        nhhTen: NhhTen
    }
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      
      fetch(`url`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(result => {
            console.log(result); 
            
            display();
        })
        .catch(error => console.error("Error updating item:", error));
    
    
}

//xoa
function deleteitem() {
    var id = document.getElementById("Nhhid").value;

    var data = {
        nhhId: id
    }
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    };
      
    fetch(`url`, requestOptions) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
        .then((result) => {
            console.log(result)
            display();
        })
        .catch((error) => console.error(error));
    
    document.getElementById('Nhhid').value = '';
    document.getElementById('NhhMa').value = '';
    document.getElementById('Nhhten').value = '';
}

// tim kiem 
function search() {
    var keyword = document.getElementById('textSearch').value;

    const requestOptions = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    };
      
    fetch(`url`, requestOptions) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then((result) => {
        console.log(result);
        var tbody = document.querySelector("#itemList1");
        tbody.innerHTML = displayitemList(result); 
    })
        .catch((error) => console.error(error));
}

function cancelitem(code) {
   
    document.getElementById('Nhhid').value = '';
    document.getElementById('NhhMa').value = '';
    document.getElementById('Nhhten').value = '';
}



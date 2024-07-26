var itemList;

function displayitemList(items) {
    var html = "";  
    items.forEach(function (item) {
        html += `
        <tr>
            <td>${item.hhId}</td>
            <td>${item.hhNhhId}</td>
            <td>${item.hhMa}</td>
            <td>${item.hhTen}</td>
            <td>${item.hhGianhap}</td>
            <td>${item.hhGiaban}</td>
        </tr>`;
    });
    return html;
}

function display() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://boypro5235-001-site1.ktempurl.com/HangHoa/GetList", requestOptions)
        .then((response) => response.json())
        .then((data) => {
            var tbody = document.querySelector("#itemList");
            tbody.innerHTML = displayitemList(data);
            populateNhhIdOptions();
        })
        .catch((error) => console.error(error));
}

window.onload = () => {
    populateNhhIdOptions()
    display()
}

//them
function additem() {
    
    var hhid= document.getElementById('hhId').value;
    var nhhid = document.getElementById('NhhId').value;
    var hhma = document.getElementById('Hhma').value;
    var hhten= document.getElementById('Hhten').value;
    var hhgianhap = document.getElementById('hhgiapnhap').value;
    var hhgiaban = document.getElementById('Hhgiaban').value;
   
    var data = {
        hhId: hhid,
        hhNhhId: nhhid,
        hhMa: hhma,
        hhTen: hhten,
        hhGianhap: hhgianhap,
        hhGiaban: hhgiaban
    };

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
      
    fetch("http://boypro5235-001-site1.ktempurl.com/HangHoa/Create", requestOptions)
    .then(response => response.json())
    .then(result => {
        console.log(result); 
        // populateNhhIdOptions();
        display(); 
    })
    .catch(error => console.error(error));

   
    document.getElementById('hhId').value = '';
    document.getElementById('NhhId').value = '';
    document.getElementById('Hhma').value = '';
    document.getElementById('Hhten').value = '';
    document.getElementById('hhgiapnhap').value = '';
    document.getElementById('Hhgiaban').value = '';
    
}

//sua
function edititem() {
    var hhid= document.getElementById('hhId').value;
    var nhhid = document.getElementById('NhhId').value;
    var hhma = document.getElementById('Hhma').value;
    var hhten= document.getElementById('Hhten').value;
    var hhgianhap = document.getElementById('hhgiapnhap').value;
    var hhgiaban = document.getElementById('Hhgiaban').value;

    var data = {
        hhId: hhid,
        hhNhhId: nhhid,
        hhMa: hhma,
        hhTen: hhten,
        hhGianhap: hhgianhap,
        hhGiaban: hhgiaban
    };

    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      };
      
      fetch(`http://boypro5235-001-site1.ktempurl.com/HangHoa/Update`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(result => {
            console.log(result); 
            // populateNhhIdOptions();
            display();
        })
        .catch(error => console.error("Error updating item:", error));
    
    
}

//xoa
function deleteitem() {
    var id = document.getElementById('hhId').value;

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
    };
      
    fetch(`http://boypro5235-001-site1.ktempurl.com/HangHoa/Delete?id=${id}`, requestOptions) 
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
        .then((result) => {
            console.log(result)
            display();
            // populateNhhIdOptions();
        })
        .catch((error) => console.error(error));
    
        document.getElementById('hhId').value = '';
        document.getElementById('NhhId').value = '';
        document.getElementById('Hhma').value = '';
        document.getElementById('Hhten').value = '';
        document.getElementById('hhgiapnhap').value = '';
        document.getElementById('Hhgiaban').value = '';
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
      
    fetch(`http://boypro5235-001-site1.ktempurl.com/HangHoa/Search?keyword=${keyword}`, requestOptions) 
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
   
    document.getElementById('hhId').value = '';
    document.getElementById('NhhId').value = '';
    document.getElementById('Hhma').value = '';
    document.getElementById('Hhten').value = '';
    document.getElementById('hhgiapnhap').value = "";
    document.getElementById('Hhgiaban').value = "";
}

function populateNhhIdOptions() {
    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch("http://boypro5235-001-site1.ktempurl.com/NhomHangHoa/GetList", requestOptions)
        .then((response) => response.json()) 
        .then((data) => {
            itemList = data;
            console.log(itemList)

            var nhhIdSelect = document.getElementById("NhhId");
            nhhIdSelect.innerHTML = "";

            var defaultOption = document.createElement("option");
            defaultOption.text = "Chọn Nhh Id";
            nhhIdSelect.add(defaultOption);

            for (var i = 0; i < itemList.length; i++) {
                var option = document.createElement("option");
                option.value = itemList[i].nhhId;
                option.text = itemList[i].nhhTen;
                nhhIdSelect.add(option);
            }
        })
        .catch((error) => console.error(error));
}




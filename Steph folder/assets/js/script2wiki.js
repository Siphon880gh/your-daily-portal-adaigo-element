var xhr = new XMLHttpRequest();

var url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'";

xhr.open('GET', url, true);

xhr.onload = function() {

    var data = JSON.parse(this.response);

    
    console.log(data);

  
    console.log(data.query.pages)

    
    for (var i in data.query.pages) {
        console.log(data.query.pages[i].title);
    }
}

xhr.send();
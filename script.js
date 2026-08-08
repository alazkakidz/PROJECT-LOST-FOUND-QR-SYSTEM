// ========================================
// SCHOOLFIND JAVASCRIPT
// ========================================


// ----------------------------------------
// SAMPLE LOST & FOUND DATA
// ----------------------------------------

const items = [

    {
        name: "Black Backpack",
        location: "School Library",
        date: "Today",
        icon: "🎒",
        description: "Black backpack found near the library entrance.",
        status: "FOUND"
    },

    {
        name: "Wireless Headphones",
        location: "Classroom 10A",
        date: "Yesterday",
        icon: "🎧",
        description: "Wireless headphones found under a classroom desk.",
        status: "FOUND"
    },

    {
        name: "Set of Keys",
        location: "School Parking",
        date: "2 days ago",
        icon: "🔑",
        description: "A set of keys found near the school parking area.",
        status: "FOUND"
    }

];


// ----------------------------------------
// SEARCH FUNCTION
// ----------------------------------------

function searchItems() {

    const searchInput =
        document.querySelector(".search-box input");

    const searchText =
        searchInput.value.toLowerCase().trim();


    if (searchText === "") {

        alert("Please type something to search.");

        return;
    }


    const results = items.filter(item =>

        item.name.toLowerCase().includes(searchText) ||

        item.location.toLowerCase().includes(searchText)

    );


    if (results.length === 0) {

        alert(
            "Sorry, we couldn't find that item."
        );

        return;
    }


    showItem(results[0]);

}


// ----------------------------------------
// SHOW ITEM DETAILS
// ----------------------------------------

function showItem(item) {

    document.getElementById("modalTitle").textContent =
        item.name;

    document.getElementById("modalIcon").textContent =
        item.icon;

    document.getElementById("modalDescription").textContent =
        item.description;

    document.getElementById("modalLocation").textContent =
        "📍 " + item.location;

    document.getElementById("modalDate").textContent =
        "🕐 Found " + item.date;


    document.getElementById("itemModal").classList.add("active");

}


// ----------------------------------------
// CLOSE MODAL
// ----------------------------------------

function closeModal() {

    document
        .getElementById("itemModal")
        .classList.remove("active");

}


// ----------------------------------------
// REPORT ITEM
// ----------------------------------------

function openReport(type) {

    document
        .getElementById("reportModal")
        .classList.add("active");


    document
        .getElementById("reportTitle")
        .textContent =
            type === "lost"
                ? "Report a Lost Item"
                : "Report a Found Item";


    document
        .getElementById("reportType")
        .value = type;

}


// ----------------------------------------
// CLOSE REPORT
// ----------------------------------------

function closeReport() {

    document
        .getElementById("reportModal")
        .classList.remove("active");

}


// ----------------------------------------
// SUBMIT REPORT
// ----------------------------------------

function submitReport(event) {

    event.preventDefault();


    const type =
        document.getElementById("reportType").value;

    const itemName =
        document.getElementById("itemName").value;


    alert(
        "Thank you! Your " +
        type +
        " item report for \"" +
        itemName +
        "\" has been received."
    );


    closeReport();


    document
        .getElementById("reportForm")
        .reset();

}

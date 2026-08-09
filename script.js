<script>

// ========================================
// DEFAULT ITEMS
// ========================================

const defaultItems = [

    {
        name: "Tas Hitam",
        location: "Perpustakaan",
        date: "8 Agustus 2026",
        description: "Tas hitam ditemukan di perpustakaan.",
        type: "lost",
        icon: "🎒"
    },

    {
        name: "Botol Minum",
        location: "Lapangan Sekolah",
        date: "8 Agustus 2026",
        description: "Botol minum ditemukan di lapangan.",
        type: "found",
        icon: "🥤"
    },

    {
        name: "Kacamata",
        location: "Ruang Kelas 9A",
        date: "7 Agustus 2026",
        description: "Kacamata ditemukan di kelas 9A.",
        type: "lost",
        icon: "👓"
    }

];


// ========================================
// GET ITEMS FROM LOCAL STORAGE
// ========================================

function getItems() {

    const savedItems =
        localStorage.getItem("schoolFindItems");


    if (savedItems) {

        return JSON.parse(savedItems);

    }


    localStorage.setItem(
        "schoolFindItems",
        JSON.stringify(defaultItems)
    );


    return defaultItems;

}


// ========================================
// DISPLAY ITEMS
// ========================================

function displayItems(items) {

    const itemList =
        document.getElementById("itemList");


    itemList.innerHTML = "";


    if (items.length === 0) {

        itemList.innerHTML = `
            <div style="
                text-align:center;
                padding:30px;
                color:#777;
            ">
                <div style="font-size:40px;">
                    🔍
                </div>

                <p>
                    Barang tidak ditemukan.
                </p>
            </div>
        `;

        return;

    }


    items.forEach(function(item, index) {

        const statusText =
            item.type === "lost"
            ? "Barang Hilang"
            : "Barang Ditemukan";


        const statusClass =
            item.type === "lost"
            ? "status-lost"
            : "status-found";


        const html = `

            <div class="item"
                 data-type="${item.type}">

                <div class="item-image">

                    ${item.icon}

                </div>


                <div class="item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        📍 ${item.location}
                    </p>

                    <p>
                        📅 ${item.date}
                    </p>

                    <span class="status ${statusClass}">
                        ${statusText}
                    </span>

                </div>

            </div>

        `;


        itemList.innerHTML += html;

    });

}


// ========================================
// INITIAL DISPLAY
// ========================================

displayItems(getItems());


// ========================================
// SEARCH
// ========================================

function searchItems() {

    const searchInput =
        document.getElementById("searchInput");


    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    const items = getItems();


    const results =
        items.filter(function(item) {

            return (

                item.name
                    .toLowerCase()
                    .includes(searchText)

                ||

                item.location
                    .toLowerCase()
                    .includes(searchText)

            );

        });


    displayItems(results);

}


// ========================================
// FILTER
// ========================================

function filterItems(type) {

    const items = getItems();


    const results =
        items.filter(function(item) {

            return item.type === type;

        });


    displayItems(results);

}


// ========================================
// OPEN REPORT
// ========================================

function reportItem() {

    document
        .getElementById("reportOverlay")
        .classList.add("active");

}


// ========================================
// CLOSE REPORT
// ========================================

function closeReport() {

    document
        .getElementById("reportOverlay")
        .classList.remove("active");

}


// ========================================
// SELECT REPORT TYPE
// ========================================

function selectReportType(type, button) {

    document
        .getElementById("reportType")
        .value = type;


    const buttons =
        document.querySelectorAll(".report-type");


    buttons.forEach(function(btn) {

        btn.classList.remove("active");

    });


    button.classList.add("active");

}


// ========================================
// SUBMIT REPORT
// ========================================

function submitReport(event) {

    event.preventDefault();


    const type =
        document.getElementById("reportType").value;


    const name =
        document.getElementById("itemName").value;


    const location =
        document.getElementById("itemLocation").value;


    const date =
        document.getElementById("itemDate").value;


    const description =
        document.getElementById("itemDescription").value;


    // Convert date

    const formattedDate =
        new Date(date).toLocaleDateString(
            "id-ID",
            {
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );


    // Choose icon

    const icon =
        type === "lost"
        ? "❓"
        : "📦";


    // Create new item

    const newItem = {

        name: name,

        location: location,

        date: formattedDate,

        description: description,

        type: type,

        icon: icon

    };


    // Get existing items

    const items = getItems();


    // Add new item to beginning

    items.unshift(newItem);


    // Save

    localStorage.setItem(
        "schoolFindItems",
        JSON.stringify(items)
    );


    // Update website

    displayItems(items);


    // Close form

    closeReport();


    // Reset form

    document
        .getElementById("reportForm")
        .reset();


    // Reset report type

    document
        .getElementById("reportType")
        .value = "lost";


    alert(
        "Laporan berhasil disimpan! 🎉"
    );

}

</script>

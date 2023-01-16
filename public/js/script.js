const searchName = document.getElementById('searchName')
const searchSurname = document.getElementById('searchSurname')
const searchPatronymic = document.getElementById('searchPatronymic')
const searchButton = document.getElementById('searchButton')
    
let CRName = document.querySelectorAll('.searchCRFirstName')
let CRSurname = document.querySelectorAll('.searchCRLastName')
let CRPatronymic = document.querySelectorAll('.searchCRPatronymicName')

if (searchButton != null) {
    searchButton.addEventListener('click', () => {
        clearNoneClasses()
    
        CRName.forEach((item) => {
            if (searchName.value !== '') {
                if ((item.innerHTML === searchName.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        CRSurname.forEach((item) => {
            if (searchSurname.value !== '') {
                if ((item.innerHTML === searchSurname.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        CRPatronymic.forEach((item) => {
            if (searchPatronymic.value !== '') {
                if ((item.innerHTML === searchPatronymic.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    })
    
    function clearNoneClasses(){
        CRName.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        CRSurname.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        CRPatronymic.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    }
}

const estateSelect = document.getElementById('EstateDropdown')
const estateFlat = document.getElementById('estate_flat')
const estateHouse = document.getElementById('estate_house')
const estateTerritory = document.getElementById('estate_territory')

if (estateSelect != null) {
    estateFlat.classList.add('activeB')
    
    estateSelect.addEventListener('change', () => {
        switch(estateSelect.value) {
            case 'flat':
                estateTerritory.classList.remove('activeB')
                estateHouse.classList.remove('activeB')
                estateFlat.classList.add('activeB')
                break
    
            case 'territory':
                estateFlat.classList.remove('activeB')
                estateHouse.classList.remove('activeB')
                estateTerritory.classList.add('activeB')
                break
    
            case 'house':
                estateTerritory.classList.remove('activeB')
                estateFlat.classList.remove('activeB')
                estateHouse.classList.add('activeB')
                break
        }
    })
}

const searchCity = document.getElementById('searchCity')
const searchStreet = document.getElementById('searchStreet')
const searchEntranceNumber = document.getElementById('searchEntranceNumber')
const searchEstateButton = document.getElementById('searchEstateButton')
    
let EstateCity = document.querySelectorAll('.searchEstateCity')
let EstateStreet = document.querySelectorAll('.searchEstateStreet')
let EstateEntranceNumber = document.querySelectorAll('.searchEstateEntranceNumber')

if (searchEstateButton != null) {
    searchEstateButton.addEventListener('click', () => {
        clearNoneClasses()
    
        EstateCity.forEach((item) => {
            if (searchCity.value !== '') {
                if ((item.innerHTML === searchCity.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        EstateStreet.forEach((item) => {
            if (searchStreet.value !== '') {
                if ((item.innerHTML === searchStreet.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        EstateEntranceNumber.forEach((item) => {
            if (searchEntranceNumber.value !== '') {
                if ((item.innerHTML === searchEntranceNumber.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    })
    
    function clearNoneClasses(){
        EstateCity.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        EstateStreet.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        EstateEntranceNumber.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    }
}
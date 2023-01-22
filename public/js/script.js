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
const searchFlatNumber = document.getElementById('searchFlatNumber')
const searchLatitude = document.getElementById('searchLatitude')
const searchLongitude = document.getElementById('searchLongitude')

const searchEstateButton = document.getElementById('searchEstateButton')
    
let EstateCity = document.querySelectorAll('.searchEstateCity')
let EstateStreet = document.querySelectorAll('.searchEstateStreet')
let EstateEntranceNumber = document.querySelectorAll('.searchEstateEntranceNumber')
let EstateFlatNumber = document.querySelectorAll('.searchFlatNumber')
let EstateLatitude = document.querySelectorAll('.searchLatitude')
let EstateLongitude = document.querySelectorAll('.searchLongitude')

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

        EstateFlatNumber.forEach((item) => {
            if (searchFlatNumber.value !== '') {
                if ((item.innerHTML === searchFlatNumber.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })

        EstateLatitude.forEach((item) => {
            if (searchLatitude.value !== '') {
                if ((item.innerHTML === searchLatitude.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })

        EstateLongitude.forEach((item) => {
            if (searchLongitude.value !== '') {
                if ((item.innerHTML === searchLongitude.value) && (item.parentElement.classList !== ('none'))) {
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

        EstateFlatNumber.forEach((item) => {
            item.parentElement.classList.remove('none')
        })

        EstateLatitude.forEach((item) => {
            item.parentElement.classList.remove('none')
        })

        EstateLongitude.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    }
}

const searchDealCity = document.getElementById('searchCityDeal')
const searchDealStreet = document.getElementById('searchStreetDeal')
const searchDealEntranceNumber = document.getElementById('searchEntranceNumberDeal')
const searchDealFlatNumber = document.getElementById('searchFlatNumberDeal')

const searchDealButton = document.getElementById('searchDealButton')
    
let DealCity = document.querySelectorAll('.searchDealCity')
let DealStreet = document.querySelectorAll('.searchDealStreet')
let DealEntranceNumber = document.querySelectorAll('.searchDealEntranceNumber')
let DealFlatNumber = document.querySelectorAll('.searchDealFlatNumber')

if (searchDealButton != null) {
    searchDealButton.addEventListener('click', () => {
        clearNoneClasses()
    
        DealCity.forEach((item) => {
            if (searchDealCity.value !== '') {
                if ((item.innerHTML === searchDealCity.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        DealStreet.forEach((item) => {
            if (searchDealStreet.value !== '') {
                if ((item.innerHTML === searchDealStreet.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    
        DealEntranceNumber.forEach((item) => {
            if (searchDealEntranceNumber.value !== '') {
                if ((item.innerHTML === searchDealEntranceNumber.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })

        DealFlatNumber.forEach((item) => {
            if (searchDealFlatNumber.value !== '') {
                if ((item.innerHTML === searchDealFlatNumber.value) && (item.parentElement.classList !== ('none'))) {
                    item.parentElement.style.display = "table-row"
                } else {
                    item.parentElement.classList.add('none')
                }
            }
        })
    })
    
    function clearNoneClasses(){
        DealCity.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        DealStreet.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    
        DealEntranceNumber.forEach((item) => {
            item.parentElement.classList.remove('none')
        })

        DealFlatNumber.forEach((item) => {
            item.parentElement.classList.remove('none')
        })
    }
}

const OfferDropdownPrice = document.getElementById('OfferDropdownPrice')
if (OfferDropdownPrice != null) {
    const OfferDropdownRequirement = document.getElementById('OfferDropdownRequirement')
    
    const priceCompanySell = document.getElementById('priceCompanySell')
    const priceCompanyBuy = document.getElementById('priceCompanyBuy')
    const priceCompanyRieltor = document.getElementById('priceCompanyRieltor')
    
    let companyPrice
    
    OfferDropdownPrice.addEventListener('change', () => {
        let index = OfferDropdownPrice.selectedIndex 
        let OfferDropdownPriceArr = OfferDropdownPrice.innerHTML.split('</option>')[index].split(' ')
    
        companyPrice = OfferDropdownPriceArr[OfferDropdownPriceArr.length - 1]
        companyPrice = companyPrice.replace(/\D+/g, "")
        priceCompanyBuy.innerHTML = companyPrice * 0.03 + ' ₽'
        priceCompanyRieltor.innerHTML = companyPrice * 0.45 + ' ₽'
    })
    
    OfferDropdownRequirement.addEventListener('change', () => {
        let whatType = OfferDropdownRequirement.value.replace(/[0-9]/g, '')
        if (companyPrice != null) {
            switch(whatType) {
                case 'flat':
                    priceCompanySell.innerHTML = 36000 + (companyPrice * 0.01) + ' ₽' 
                    break
    
                case 'house':
                    priceCompanySell.innerHTML = 30000 + (companyPrice * 0.01) + ' ₽' 
                    break
    
                case 'territory':
                    priceCompanySell.innerHTML = 30000 + (companyPrice * 0.02) + ' ₽' 
                    break
            }
        }
    })
}
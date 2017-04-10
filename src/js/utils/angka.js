
const angkaUtils = {

  sortByNumber(arr) {
    const newArray = JSON.parse(JSON.stringify(arr))
    const sorted = newArray.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
    return sorted
  },

  pisahByDash(value) {
    const dash = value.indexOf("-")
    const xmin = parseFloat(value.substr(0, dash))
    const xmax = parseFloat(value.substr(dash + 1, value.length))
    return { xmin, xmax }
  },

  sigmaArray(arr) {
    const jumlah = arr.reduce((accumulator, val) => {
      return accumulator + val
    })
    return jumlah
  },

  hitungRataRata(arr) {
    const jumlahData = arr.length
    const jumlahHitunganData = angkaUtils.sigmaArray(arr)
    // X Bar
    let rataRata = jumlahHitunganData / jumlahData
    rataRata = parseFloat(rataRata.toFixed(2))
    return rataRata
  },

  nilaiMutlak(num) {
    const stringOfNum = num.toString()
    const isNegativeNum = stringOfNum.indexOf("-") > -1
    return isNegativeNum ? num * -1 : num
  },

  bulatkan(num) {
    return parseFloat(num.toFixed(2))
  }

};

export default angkaUtils

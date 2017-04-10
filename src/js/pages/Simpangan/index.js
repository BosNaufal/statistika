
import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';
class Simpangan extends React.Component {

  constructor() {
    super();
    this.state = {
      // 12, 3, 11, 3, 4, 7, 5, 11
      deret: []
    }
  }

  handleChange(e) {
    const { value } = e.target
    const arrAngka = value.split(',')
    const removeNullMember = arrAngka.filter((angka) => {
      angka = parseFloat(angka)
      return angka
    })
    const realAngka = removeNullMember.map((item) => {
      item = parseFloat(item)
      return item
    })
    this.setState({ deret: realAngka })
  }

  hitungSimpanganRataRata() {
    const { deret } = this.state
    const deretUrut = angkaUtils.sortByNumber(this.state.deret)
    const jumlahData = deretUrut.length
    const xbar = deretUrut.length ? angkaUtils.hitungRataRata(deretUrut) : 0
    const arrayToSum = []
    deretUrut.forEach((item) => {
      const jumlah = item - xbar
      const jumlahMutlak = angkaUtils.nilaiMutlak(jumlah).toFixed(2)
      arrayToSum.push(parseFloat(jumlahMutlak))
    })
    const sigmaArray = angkaUtils.sigmaArray(arrayToSum)
    let simpanganRataRata = sigmaArray / jumlahData
    simpanganRataRata = parseFloat(simpanganRataRata.toFixed(2))
    return [simpanganRataRata, arrayToSum, sigmaArray]
  }

  render() {
    const { deret } = this.state
    const deretUrut = angkaUtils.sortByNumber(this.state.deret)
    const jumlahData = deretUrut.length
    const xbar = deretUrut.length ? angkaUtils.hitungRataRata(deretUrut) : 0
    const [simpanganRataRata, arrayToSum, sigmaArray] = deretUrut.length ? this.hitungSimpanganRataRata() : [0, [], 0]

    return (
      <div className="container">
        <h1>Simpangan Rata-Rata Tunggal</h1>

        <h3>Do It!</h3>
        <textarea className="form-control" onChange={this.handleChange.bind(this)} placeholder="dipisah dengan tanda koma" />

        <div>
          <br />
          <b>Soal: </b>
          <span>{deret.join(", ")}</span>
          <br />

          <br />
          <b>Angka Urut: </b>
          <span>{deretUrut.join(", ")}</span>
          {jumlahData &&
            <div>
              <br />
              <b>Jumlah Data: </b>
              <span>{jumlahData}</span>

              <br />
              <b>xbar: </b>
              <br />
              <span>
                = ({ deretUrut.map((item,i) => {
                  return i < jumlahData - 1 ? item + " + " : item
                }) }) / {jumlahData}
              </span>
              <br />
              <span>= {angkaUtils.sigmaArray(deretUrut)} / {jumlahData}</span>
              <br />
              <span>= {xbar}</span>


              <br />
              <b>Simpangan Rata-Rata: </b>
              <br />
              <span>
                = ({ deretUrut.map((item,i) => {
                  return `|${item} - ${xbar}| ${(i < jumlahData - 1 ? " + " : "")}`
                }) }) / {jumlahData}
              </span>
              <br />
              <span>
                = ({ arrayToSum.map((item,i) => {
                  return `${item} ${(i < jumlahData - 1 ? " + " : "")}`
                }) }) / {jumlahData}
              </span>
              <br />
              <span>= {sigmaArray} / {jumlahData}</span>
              <br />
              <span>= {simpanganRataRata}</span>


              <br />
            </div>
          }
        </div>
      </div>
    )
  }

}

export default Simpangan;


import React, { PropTypes } from 'react'

import angkaUtils from '../../utils/angka';
class KuartilTunggal extends React.Component {

  constructor() {
    super();
    this.state = {
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

  hitungKuartil(i, banyakData) {
    return (banyakData + 1) * i / 4
  }

  render() {
    const { deret } = this.state
    const deretUrut = angkaUtils.sortByNumber(this.state.deret)
    const jumlahData = deretUrut.length
    const indexKuartil1 = this.hitungKuartil(1, jumlahData)
    const kuartil1 = deretUrut[indexKuartil1 - 1]
    const indexKuartil2 = this.hitungKuartil(2, jumlahData)
    const kuartil2 = deretUrut[indexKuartil2 - 1]
    const indexKuartil3 = this.hitungKuartil(3, jumlahData)
    const kuartil3 = deretUrut[indexKuartil3 - 1]
    const dataTerbesar = deretUrut[deretUrut.length - 1]
    const dataTerkecil = deretUrut[0]

    // QR
    const jangkauan = dataTerbesar - dataTerkecil
    const jangkauanInterKuartil = kuartil3 - kuartil1
    const jangkauanSemiInterKuartil = (jangkauanInterKuartil) / 2

    return (
      <div className="container">
        <h1>Kuartil Tunggal</h1>

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
          {jumlahData ?
            <div>
              <br />
              <b>Jumlah Data: </b>
              <span>{jumlahData}</span>

              <br />
              <b>Kuartil 1: </b>
              <span>({jumlahData} + 1) / 4 = data ke-{indexKuartil1} ({kuartil1})</span>

              <br />
              <b>Kuartil 2: </b>
              <span>({jumlahData} + 1) / 2 = data ke-{indexKuartil2} ({kuartil2})</span>

              <br />
              <b>Kuartil 3: </b>
              <span>({jumlahData} + 1) * 3 / 4 = data ke-{indexKuartil3} ({kuartil3})</span>


              <br />
              <b>Data Terbesar: </b>
              <span>{dataTerbesar}</span>
              <br />

              <b>Data Terkecil: </b>
              <span>{dataTerkecil}</span>
              <br />

              <b>Jangkauan: </b>
              <span>{dataTerbesar} - {dataTerkecil} = {jangkauan}</span>

              <br />
              <b>Jangkauan Inter Kuartil: </b>
              <span>{kuartil3} - {kuartil1} = {jangkauanInterKuartil}</span>

              <br />
              <b>Jangkauan Semi Inter Kuartil: </b>
              <span>{jangkauanInterKuartil} / 2 = {jangkauanSemiInterKuartil}</span>

              <br />
            </div>
          : null }
        </div>
      </div>
    )
  }

}

export default KuartilTunggal;
